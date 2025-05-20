interface LeadMetrics {
  totalLeads: number;
  leadsBySource: Record<string, number>;
  leadsByStatus: Record<string, number>;
  conversionRate: number;
  averageResponseTime: number;
  topLocations: { location: string; count: number }[];
  leadQuality: {
    hot: number;
    warm: number;
    cold: number;
  };
}

export class AnalyticsService {
  private static instance: AnalyticsService;

  private constructor() {
  }

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  async getLeadMetrics(): Promise<LeadMetrics> {
    try {
      // In production, make actual API call
      return {
        totalLeads: 100,
        leadsBySource: {
          website: 40,
          chatbot: 25,
          voicebot: 20,
          referral: 10,
          other: 5
        },
        leadsByStatus: {
          new: 30,
          contacted: 25,
          qualified: 20,
          converted: 15,
          lost: 10
        },
        conversionRate: 15,
        averageResponseTime: 2.5,
        topLocations: [
          { location: 'San Francisco', count: 30 },
          { location: 'Oakland', count: 20 },
          { location: 'San Jose', count: 15 }
        ],
        leadQuality: {
          hot: 25,
          warm: 45,
          cold: 30
        }
      };
    } catch (error) {
      console.error('Error getting lead metrics:', error);
      throw new Error('Failed to get lead metrics');
    }
  }

  async getLeadTrends(): Promise<{
    dailyLeads: { date: string; count: number }[];
    conversionTrend: { date: string; rate: number }[];
    qualityTrend: { date: string; hot: number; warm: number; cold: number }[];
  }> {
    try {
      // In production, make actual API call
      return {
        dailyLeads: [
          { date: '2024-03-01', count: 5 },
          { date: '2024-03-02', count: 8 },
          { date: '2024-03-03', count: 12 }
        ],
        conversionTrend: [
          { date: '2024-03-01', rate: 12 },
          { date: '2024-03-02', rate: 15 },
          { date: '2024-03-03', rate: 18 }
        ],
        qualityTrend: [
          { date: '2024-03-01', hot: 20, warm: 45, cold: 35 },
          { date: '2024-03-02', hot: 25, warm: 40, cold: 35 },
          { date: '2024-03-03', hot: 30, warm: 45, cold: 25 }
        ]
      };
    } catch (error) {
      console.error('Error getting lead trends:', error);
      throw new Error('Failed to get lead trends');
    }
  }

  async getSourcePerformance(): Promise<{
    source: string;
    totalLeads: number;
    conversionRate: number;
    averageResponseTime: number;
    costPerLead: number;
  }[]> {
    try {
      // In production, make actual API call
      return [
        {
          source: 'website',
          totalLeads: 40,
          conversionRate: 15,
          averageResponseTime: 2.0,
          costPerLead: 50
        },
        {
          source: 'chatbot',
          totalLeads: 25,
          conversionRate: 20,
          averageResponseTime: 1.5,
          costPerLead: 30
        },
        {
          source: 'voicebot',
          totalLeads: 20,
          conversionRate: 25,
          averageResponseTime: 1.0,
          costPerLead: 40
        }
      ];
    } catch (error) {
      console.error('Error getting source performance:', error);
      throw new Error('Failed to get source performance');
    }
  }

  async getAgentPerformance(): Promise<{
    agentId: string;
    agentName: string;
    totalLeads: number;
    conversionRate: number;
    averageResponseTime: number;
    customerSatisfaction: number;
  }[]> {
    try {
      // In production, make actual API call
      return [
        {
          agentId: 'agent1',
          agentName: 'John Smith',
          totalLeads: 30,
          conversionRate: 25,
          averageResponseTime: 1.5,
          customerSatisfaction: 4.8
        },
        {
          agentId: 'agent2',
          agentName: 'Sarah Johnson',
          totalLeads: 25,
          conversionRate: 20,
          averageResponseTime: 2.0,
          customerSatisfaction: 4.5
        }
      ];
    } catch (error) {
      console.error('Error getting agent performance:', error);
      throw new Error('Failed to get agent performance');
    }
  }

  async generateReport(): Promise<{
    summary: LeadMetrics;
    trends: any;
    sourcePerformance: any;
    agentPerformance: any;
    recommendations: string[];
  }> {
    try {
      const [summary, trends, sourcePerformance, agentPerformance] = await Promise.all([
        this.getLeadMetrics(),
        this.getLeadTrends(),
        this.getSourcePerformance(),
        this.getAgentPerformance()
      ]);

      // Generate recommendations based on the data
      const recommendations = this.generateRecommendations(
        summary,
        sourcePerformance
      );

      return {
        summary,
        trends,
        sourcePerformance,
        agentPerformance,
        recommendations
      };
    } catch (error) {
      console.error('Error generating report:', error);
      throw new Error('Failed to generate report');
    }
  }

  private generateRecommendations(
    summary: LeadMetrics,
    sourcePerformance: any
  ): string[] {
    const recommendations: string[] = [];

    // Analyze conversion rates
    if (summary.conversionRate < 15) {
      recommendations.push('Focus on improving lead qualification process');
    }

    // Analyze source performance
    if (sourcePerformance && sourcePerformance.length) {
      const bestSource = sourcePerformance.reduce((a: any, b: any) => 
        a.conversionRate > b.conversionRate ? a : b
      );
      recommendations.push(`Increase investment in ${bestSource.source} channel`);
    }

    // Analyze response times
    if (summary.averageResponseTime > 2) {
      recommendations.push('Implement automated responses for faster lead engagement');
    }

    // Analyze lead quality
    if (summary.leadQuality.cold > summary.leadQuality.hot) {
      recommendations.push('Review and improve lead scoring criteria');
    }

    return recommendations;
  }
} 