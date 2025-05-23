import { ConversationContext } from '../types.js';
import { config } from '../config.js';

interface AIResponse {
  content: string;
  metadata: {
    intent?: string;
    entities?: {
      name?: string;
      email?: string;
      phone?: string;
      source?: string;
      preferences?: {
        propertyType?: string[];
        priceRange?: [number, number];
        locations?: string[];
        beds?: number;
        baths?: number;
      };
    };
    sentiment?: 'positive' | 'negative' | 'neutral';
    confidence?: number;
    followUpQuestions?: string[];
    suggestedActions?: string[];
  };
  updatedContext: ConversationContext;
}

interface VoiceStream {
  ws: WebSocket | null;
  isConnected: boolean;
  onMessage: (message: string) => void;
  onError: (error: string) => void;
}

interface VoiceflowResponse {
  success: boolean;
  data: {
    text: string;
    metadata: {
      entities: {
        name?: string;
        email?: string;
        phone?: string;
        source?: string;
        preferences?: {
          propertyType?: string[];
          priceRange?: [number, number];
          locations?: string[];
          beds?: number;
          baths?: number;
        };
      };
      intent?: string;
    };
  };
}

// Helper function to call the local OpenAI proxy
async function fetchOpenAI(messages: any[], model = 'gpt-3.5-turbo') {
  const response = await fetch('http://localhost:5001/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model }),
  });
  if (!response.ok) throw new Error('OpenAI proxy error');
  return response.json();
}

// Helper function to call Voiceflow for chat interactions
async function fetchVoiceflow(message: string, userId: string) {
  try {
    console.log('Sending message to Voiceflow:', { message, userId });
    const response = await fetch('http://localhost:5001/api/voiceflow', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ message, userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Voiceflow API error:', errorData);
      throw new Error(errorData.error || 'Voiceflow proxy error');
    }

    const data = await response.json();
    console.log('Voiceflow response:', data);
    return {
      response: data.response || '',
      metadata: data.metadata || {},
      history: data.history || []
    };
  } catch (error) {
    console.error('Voiceflow API error:', error);
    throw error;
  }
}

export class AIService {
  private static instance: AIService;
  private conversationMemory: Map<string, ConversationContext>;
  private readonly MAX_MEMORY_ITEMS = 100;
  private currentUserId: string;
  private voiceStream: VoiceStream | null = null;
  private baseUrl: string;
  private apiKey: string;

  private constructor() {
    this.conversationMemory = new Map();
    this.currentUserId = 'default-user';
    this.baseUrl = config.api.url;
    this.apiKey = config.vapi.key;
  }

  setUserId(userId: string) {
    this.currentUserId = userId;
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async initializeVoiceStream(
    onMessage: (message: string) => void,
    onError: (error: string) => void
  ): Promise<void> {
    try {
      console.log('Initializing voice stream...');
      const response = await fetch('http://localhost:5001/api/vapi/voice');
      if (!response.ok) {
        throw new Error('Failed to initialize voice stream');
      }
      const { wsUrl } = await response.json();
      console.log('Got WebSocket URL:', wsUrl);

      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('Connected to voice stream');
        this.voiceStream = {
          ws,
          isConnected: true,
          onMessage,
          onError
        };
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received WebSocket message:', data);
          if (data.error) {
            onError(data.error);
          } else {
            onMessage(data.text || '');
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          onError('Invalid message format');
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        onError('Connection error');
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
        this.voiceStream = null;
        onError('Connection closed');
      };
    } catch (error) {
      console.error('Error initializing voice stream:', error);
      onError('Failed to initialize voice stream');
    }
  }

  sendVoiceMessage(audio: Blob): void {
    if (this.voiceStream?.ws?.readyState === WebSocket.OPEN) {
      this.voiceStream.ws.send(audio);
    } else {
      this.voiceStream?.onError('Voice stream not connected');
    }
  }

  closeVoiceStream(): void {
    if (this.voiceStream?.ws) {
      this.voiceStream.ws.close();
      this.voiceStream = null;
    }
  }

  async generateResponse(
    input: string,
    context: ConversationContext,
    mode: 'chat' | 'voice',
    sessionId: string
  ): Promise<any> {
    try {
      console.log('Generating response:', { input, mode, sessionId });
      this.updateConversationMemory(sessionId, context);
      
      if (mode === 'voice') {
        return {
          content: '',
          metadata: {},
          updatedContext: context
        };
      }

      const voiceflowResponse = await fetchVoiceflow(input, this.currentUserId);
      console.log('Voiceflow response:', voiceflowResponse);
      
      const updatedContext = {
        ...context,
        conversationHistory: voiceflowResponse.history
      };

      return {
        content: voiceflowResponse.response,
        metadata: voiceflowResponse.metadata,
        updatedContext
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return this.generateFallbackResponse(input, context);
    }
  }

  private updateConversationMemory(sessionId: string, context: ConversationContext) {
    this.conversationMemory.set(sessionId, context);
    
    // Implement LRU cache
    if (this.conversationMemory.size > this.MAX_MEMORY_ITEMS) {
      const firstKey = this.conversationMemory.keys().next().value;
      if (firstKey !== undefined) {
        this.conversationMemory.delete(firstKey);
      }
    }
  }

  private generateFallbackResponse(
    input: string,
    context: ConversationContext
  ): AIResponse {
    // Basic fallback response generation
    const response = this.generateMockResponse(input);
    return {
      content: response,
      metadata: this.extractMetadata(input),
      updatedContext: context
    };
  }

  private generateMockResponse(input: string): string {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello! I'm your AI real estate assistant. How can I help you today?";
    }
    
    if (lowerInput.includes('property') || lowerInput.includes('house') || lowerInput.includes('home')) {
      return "I can help you find properties. What type of property are you looking for? (e.g., single-family, condo, apartment)";
    }
    
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return "I can help you understand property prices in different areas. Which location are you interested in?";
    }
    
    if (lowerInput.includes('schedule') || input.includes('tour') || input.includes('visit')) {
      return "I can help you schedule a property tour. What's your preferred date and time?";
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('agent')) {
      return "I can connect you with a real estate agent. Would you like to provide your contact information?";
    }
    
    return "I'm here to help with your real estate needs. Could you please provide more details about what you're looking for?";
  }

  private extractMetadata(input: string): AIResponse['metadata'] {
    const lowerInput = input.toLowerCase();
    const metadata: AIResponse['metadata'] = {
      intent: this.detectIntent(lowerInput),
      entities: this.extractEntities(lowerInput),
      sentiment: this.analyzeSentiment(lowerInput),
      confidence: 0.9
    };
    return metadata;
  }

  private detectIntent(input: string): string {
    if (input.includes('property') || input.includes('house') || input.includes('home')) {
      return 'property_search';
    }
    if (input.includes('price') || input.includes('cost')) {
      return 'price_inquiry';
    }
    if (input.includes('schedule') || input.includes('tour')) {
      return 'schedule_tour';
    }
    if (input.includes('contact') || input.includes('agent')) {
      return 'contact_agent';
    }
    return 'general_inquiry';
  }

  private extractEntities(input: string): AIResponse['metadata']['entities'] {
    const entities: AIResponse['metadata']['entities'] = {};
    
    // Extract email
    const emailMatch = input.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      entities.email = emailMatch[0];
    }
    
    // Extract phone
    const phoneMatch = input.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/);
    if (phoneMatch) {
      entities.phone = phoneMatch[0];
    }
    
    // Extract name (basic implementation)
    const nameMatch = input.match(/my name is (\w+)/i);
    if (nameMatch) {
      entities.name = nameMatch[1];
    }
    
    // Extract preferences
    if (input.includes('single family') || input.includes('house')) {
      entities.preferences = {
        ...entities.preferences,
        propertyType: ['single-family']
      };
    }
    
    if (input.includes('condo') || input.includes('apartment')) {
      entities.preferences = {
        ...entities.preferences,
        propertyType: ['condo']
      };
    }
    
    return entities;
  }

  private analyzeSentiment(input: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['good', 'great', 'excellent', 'love', 'like', 'perfect'];
    const negativeWords = ['bad', 'terrible', 'hate', 'dislike', 'expensive', 'high'];
    
    const words = input.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
    });
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  async calculateMortgage(
    propertyPrice: number,
    downPayment: number,
    interestRate: number,
    termYears: number
  ): Promise<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  }> {
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = termYears * 12;

    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest
    };
  }

  async analyzeMarketData(location: string): Promise<any> {
    try {
      // Call OpenAI API for market analysis
      const completion = await fetchOpenAI([
        {
          role: 'system',
          content: 'Analyze real estate market data for the given location.'
        },
        {
          role: 'user',
          content: `Location: ${location}`
        }
      ], 'gpt-3.5-turbo');

      const analysis = JSON.parse(completion.choices[0].message?.content || '{}');

      return {
        averagePrice: analysis.averagePrice || 750000,
        priceTrend: analysis.priceTrend || 'increasing',
        daysOnMarket: analysis.daysOnMarket || 45,
        marketType: analysis.marketType || 'seller',
        inventory: analysis.inventory || 120,
        salesVolume: analysis.salesVolume || 85,
        pricePerSqFt: analysis.pricePerSqFt || 850,
        yearOverYearChange: analysis.yearOverYearChange || 5.2
      };
    } catch (error) {
      console.error('Error analyzing market data:', error);
      throw new Error('Failed to analyze market data');
    }
  }

  async qualifyLead(lead: any): Promise<{
    score: number;
    status: 'hot' | 'warm' | 'cold';
    recommendations: string[];
  }> {
    try {
      // Use GPT to analyze lead quality
      const completion = await fetchOpenAI([
        {
          role: 'system',
          content: 'Analyze lead quality and provide recommendations.'
        },
        {
          role: 'user',
          content: `Lead data: ${JSON.stringify(lead)}`
        }
      ], 'gpt-3.5-turbo');

      const analysis = JSON.parse(completion.choices[0].message?.content || '{}');

      return {
        score: analysis.score || 0,
        status: analysis.status || 'cold',
        recommendations: analysis.recommendations || []
      };
    } catch (error) {
      console.error('Error qualifying lead:', error);
      throw new Error('Failed to qualify lead');
    }
  }

  // Add method to get conversation history
  async getConversationHistory(): Promise<any> {
    try {
      const response = await fetch(`http://localhost:5001/api/voiceflow/history/${this.currentUserId}`);
      if (!response.ok) throw new Error('Failed to fetch conversation history');
      return response.json();
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      return { history: [] };
    }
  }

  // Add method to clear conversation history
  async clearConversationHistory(): Promise<void> {
    try {
      await fetch(`http://localhost:5001/api/voiceflow/history/${this.currentUserId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error clearing conversation history:', error);
    }
  }

  public async processMessage(input: string, context: ConversationContext): Promise<VoiceflowResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          input,
          context
        })
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI service error:', error);
      return {
        success: true,
        data: {
          text: this.generateMockResponse(input),
          metadata: {
            entities: {},
            intent: undefined
          }
        }
      };
    }
  }
} 