export interface MeritBadge {
  id: string;
  name: string;
  description: string;
  category: string;
  requirements: BadgeRequirement[];
  prerequisites?: string[];
  timeToComplete?: string;
  image?: string;
}

export interface BadgeRequirement {
  id: string;
  description: string;
  completed: boolean;
  verificationMethod?: 'counselor' | 'documentation' | 'demonstration';
  completedAt?: string;
  verifiedBy?: string;
}

export interface BadgeProgress {
  badgeId: string;
  userId: string;
  progress: number;
  startedAt: string;
  lastUpdated: string;
  completedAt?: string;
  completedRequirements: string[];
}

export type BadgeCategory = 
  | 'Citizenship'
  | 'Health and Safety'
  | 'Nature'
  | 'Outdoor Skills'
  | 'Personal Development'
  | 'Science and Technology';