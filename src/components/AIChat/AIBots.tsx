import React, { useState } from 'react';
import { Chatbot } from './Chatbot';
import { Voicebot } from './Voicebot';
import { MessageSquare, Mic } from 'lucide-react';

interface AIBotsProps {
  onLeadCaptured?: (leadData: {
    name: string;
    email: string;
    phone: string;
    source: 'website' | 'chatbot' | 'voicebot' | 'referral' | 'other';
    preferences?: {
      propertyType?: string[];
      priceRange?: [number, number];
      locations?: string[];
      beds?: number;
      baths?: number;
    };
    interactionDetails?: string;
  }) => Promise<void>;
}

export const AIBots: React.FC<AIBotsProps> = ({ onLeadCaptured }) => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showVoicebot, setShowVoicebot] = useState(false);

  const handleClose = () => {
    setShowChatbot(false);
    setShowVoicebot(false);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
      {!showChatbot && !showVoicebot && (
        <div className="flex space-x-4">
          <button
            onClick={() => setShowChatbot(true)}
            className="p-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-lg"
            aria-label="Open chat"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
          <button
            onClick={() => setShowVoicebot(true)}
            className="p-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-lg"
            aria-label="Open voice assistant"
          >
            <Mic className="w-6 h-6" />
          </button>
        </div>
      )}

      {showChatbot && (
        <Chatbot onLeadCaptured={onLeadCaptured} onClose={handleClose} />
      )}

      {showVoicebot && (
        <Voicebot onClose={handleClose} />
      )}
    </div>
  );
}; 