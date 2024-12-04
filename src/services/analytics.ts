import { format } from 'date-fns';

interface AnalyticsEvent {
  eventName: string;
  timestamp: Date;
  userId?: string;
  metadata?: Record<string, any>;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];

  trackEvent(eventName: string, metadata?: Record<string, any>) {
    const event: AnalyticsEvent = {
      eventName,
      timestamp: new Date(),
      userId: this.getCurrentUserId(),
      metadata
    };

    this.events.push(event);
    this.persistEvent(event);
  }

  private getCurrentUserId(): string | undefined {
    // Get current user ID from auth context
    return undefined;
  }

  private persistEvent(event: AnalyticsEvent) {
    // In a real app, send to analytics service
    console.log('Analytics event:', event);
  }

  generateReport(startDate: Date, endDate: Date) {
    return this.events.filter(event => 
      event.timestamp >= startDate && event.timestamp <= endDate
    );
  }
}

export const analytics = new AnalyticsService();