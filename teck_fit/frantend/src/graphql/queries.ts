import { gql } from '@apollo/client';

export const GET_PLAYERS = gql`
  query GetPlayers {
    players {
      id
      name
      position
      number
      photo
      goals
      assists
      rating
    }
  }
`;

export const GET_PLAYER = gql`
  query GetPlayer($id: ID!) {
    player(id: $id) {
      id
      name
      position
      number
      photo
      height
      weight
      age
      nationality
      goals
      assists
      tackles
      passes
      rating
      matchHistory {
        id
        date
        opponent
        goals
        assists
        rating
      }
    }
  }
`;

export const GET_STATS = gql`
  query GetStats {
    stats {
      team {
        matches
        wins
        draws
        losses
        goalsFor
        goalsAgainst
        cleanSheets
      }
      topScorers {
        id
        name
        goals
      }
      topAssists {
        id
        name
        assists
      }
      form
    }
  }
`;