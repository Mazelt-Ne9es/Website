import type { Player } from 'sports-analytics-types';

export const players: Player[] = [
  {
    id: 1,
    name: 'Marcus Rodriguez',
    position: 'Forward',
    number: 9,
    photo: 'https://images.unsplash.com/photo-1604651684549-962bd68d7c5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBwbGF5ZXIlMjBhdGhsZXRlfGVufDF8fHx8MTc2MjYzOTQ5MHww&ixlib=rb-4.1.0&q=80&w=400',
    height: '6\'2"',
    weight: '185 lbs',
    age: 26,
    nationality: 'Spain',
    goals: 18,
    assists: 7,
    tackles: 12,
    passes: 456,
    rating: 8.5,
    matchHistory: [
      { id: 1, date: '2025-11-06', opponent: 'Arsenal FC', goals: 2, assists: 1, rating: 8.9 },
      { id: 2, date: '2025-11-02', opponent: 'Chelsea FC', goals: 1, assists: 0, rating: 7.8 },
      { id: 3, date: '2025-10-28', opponent: 'Liverpool FC', goals: 0, assists: 1, rating: 7.2 },
    ],
  },
  {
    id: 2,
    name: 'David Chen',
    position: 'Midfielder',
    number: 10,
    photo: 'https://images.unsplash.com/photo-1746333253387-5aac26260c96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHBsYXllciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjYzOTQ5MHww&ixlib=rb-4.1.0&q=80&w=400',
    height: '5\'10"',
    weight: '165 lbs',
    age: 24,
    nationality: 'China',
    goals: 12,
    assists: 15,
    tackles: 45,
    passes: 1243,
    rating: 8.2,
    matchHistory: [
      { id: 1, date: '2025-11-06', opponent: 'Arsenal FC', goals: 1, assists: 1, rating: 8.2 },
      { id: 2, date: '2025-11-02', opponent: 'Chelsea FC', goals: 0, assists: 2, rating: 8.5 },
      { id: 3, date: '2025-10-28', opponent: 'Liverpool FC', goals: 1, assists: 0, rating: 7.9 },
    ],
  }
];