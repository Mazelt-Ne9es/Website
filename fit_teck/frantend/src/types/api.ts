// Player types
export interface MatchHistory {
  id: number;
  date: string;
  opponent: string;
  goals: number;
  assists: number;
  rating: number;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  photo: string;
  height: string;
  weight: string;
  age: number;
  nationality: string;
  goals: number;
  assists: number;
  tackles: number;
  passes: number;
  rating: number;
  matchHistory: MatchHistory[];
}

// Report types
export interface Report {
  id: number;
  title: string;
  description: string;
  type: 'player' | 'match' | 'comparison';
  color: string;
}

export interface ReportGenerateResponse {
  id: number;
  status: 'generated' | 'error';
  downloadUrl?: string;
  message: string;
}

// Stats types
export interface TeamStats {
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
}

export interface TopPlayer {
  id: number;
  name: string;
  goals?: number;
  assists?: number;
}

export interface Stats {
  team: TeamStats;
  topScorers: TopPlayer[];
  topAssists: TopPlayer[];
  form: string[];
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}