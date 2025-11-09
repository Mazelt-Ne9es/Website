// src/types/models.d.ts
declare module 'sports-analytics-types' {
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

  export interface Report {
    id: number;
    title: string;
    description: string;
    type: 'player' | 'match' | 'comparison';
    color: string;
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
}