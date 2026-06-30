import { LucideIcon } from 'lucide-react';

export interface RecommendedItem {
  title: string;
  year: number;
  genre: string[];
  cast?: string[];
  author?: string;
  artist?: string;
  developer?: string;
  platforms?: string[];
  reason: string;
  rating: number;
}

export interface RecommendationsResponse {
  movies?: RecommendedItem[];
  books?: RecommendedItem[];
  music?: RecommendedItem[];
  games?: RecommendedItem[];
}

export interface TimelineStep {
  id: string;
  label: string;
  status: 'idle' | 'active' | 'completed' |'failed';
  time?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  defaultPrompt: string;
}
