import { DonorRecord } from '../../types/donor';

export interface CommunicationAnalysis {
  sentiment: {
    score: number;
    positive: boolean;
  };
  keywords: string[];
  readabilityScore: number;
  suggestions: string[];
}

export class DonorCommunication {
  private stopwords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'were', 'will', 'with'
  ]);

  private positiveWords = new Set([
    'thank', 'thanks', 'grateful', 'appreciate', 'good', 'great', 'excellent',
    'amazing', 'wonderful', 'fantastic', 'helpful', 'support', 'generous',
    'dedication', 'commitment', 'outstanding', 'exceptional', 'remarkable'
  ]);

  private negativeWords = new Set([
    'unfortunately', 'sorry', 'regret', 'issue', 'problem', 'concern',
    'difficult', 'unable', 'fail', 'missed', 'delay', 'error'
  ]);

  analyzeCommunication(text: string): CommunicationAnalysis {
    const words = this.tokenize(text);
    const sentiment = this.analyzeSentiment(words);
    const keywords = this.extractKeywords(words);
    const readabilityScore = this.calculateReadability(text);
    const suggestions = this.generateSuggestions(text, sentiment, readabilityScore);

    return {
      sentiment,
      keywords,
      readabilityScore,
      suggestions
    };
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);
  }

  private analyzeSentiment(words: string[]): { score: number; positive: boolean } {
    let score = 0;
    const totalWords = words.length;

    words.forEach(word => {
      if (this.positiveWords.has(word)) score += 1;
      if (this.negativeWords.has(word)) score -= 1;
    });

    const normalizedScore = totalWords > 0 ? score / totalWords : 0;
    return {
      score: normalizedScore,
      positive: normalizedScore >= 0
    };
  }

  private extractKeywords(words: string[]): string[] {
    return words
      .filter(word => 
        word.length > 3 && 
        !this.stopwords.has(word)
      )
      .slice(0, 10);
  }

  private calculateReadability(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = this.tokenize(text);
    
    if (sentences.length === 0 || words.length === 0) return 0;

    const avgWordsPerSentence = words.length / sentences.length;
    const avgSyllablesPerWord = words.reduce((sum, word) => 
      sum + this.countSyllables(word), 0) / words.length;

    return Math.max(0, Math.min(100,
      206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)
    ));
  }

  private countSyllables(word: string): number {
    const syllableRegex = /[aiouy]+e*|e(?!d$|ly).|[td]ed|le$/gi;
    const matches = word.match(syllableRegex);
    return matches ? matches.length : 1;
  }

  private generateSuggestions(
    text: string, 
    sentiment: { score: number; positive: boolean },
    readabilityScore: number
  ): string[] {
    const suggestions: string[] = [];

    if (text.length < 50) {
      suggestions.push('Consider adding more detail to your message');
    }

    if (!sentiment.positive) {
      suggestions.push('Consider using more positive language');
    }

    if (readabilityScore < 60) {
      suggestions.push('Consider simplifying the language for better readability');
    }

    return suggestions;
  }

  generateResponse(donorName: string, donationAmount: number): string {
    const templates = [
      `Dear ${donorName}, thank you for your generous donation of $${donationAmount}. Your support makes a real difference in helping our Scouts develop leadership skills and character.`,
      `${donorName}, we are truly grateful for your contribution of $${donationAmount}. Your generosity helps us provide meaningful experiences for young Scouts.`,
      `Thank you, ${donorName}! Your donation of $${donationAmount} will help create lasting memories and valuable learning opportunities for our Scouts.`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }
}