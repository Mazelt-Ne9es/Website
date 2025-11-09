const statsResolvers = {
  Query: {
    stats: () => ({
      team: {
        matches: 15,
        wins: 9,
        draws: 3,
        losses: 3,
        goalsFor: 28,
        goalsAgainst: 14,
        cleanSheets: 7,
      },
      topScorers: [
        { id: 1, name: 'Marcus Rodriguez', goals: 18 },
        { id: 2, name: 'David Chen', goals: 12 }
      ],
      topAssists: [
        { id: 2, name: 'David Chen', assists: 15 },
        { id: 1, name: 'Marcus Rodriguez', assists: 7 }
      ],
      form: ['W', 'W', 'D', 'L', 'W']
    })
  }
};

export default statsResolvers;