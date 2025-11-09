// Types for the application
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

export interface Team {
  id: number;
  name: string;
  logo: string;
  founded: number;
  stadium: string;
  coach: string;
  players: Player[];
}

export interface Match {
  id: number;
  date: Date;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  stats?: {
    possession: number;
    shots: number;
    shotsOnTarget: number;
    corners: number;
    fouls: number;
  };
  events?: {
    type: string;
    minute: number;
    player: number;
    team: number;
  }[];
}

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