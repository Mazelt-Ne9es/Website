import { databaseService } from '../../services/database.service';
import { Player } from '../../types/models';

interface PlayerArgs {
  id: string;
}

const playerResolvers = {
  Query: {
    players: async (): Promise<Player[]> => {
      return await databaseService.getAllPlayers();
    },
    player: async (_: any, { id }: PlayerArgs): Promise<Player | null> => {
      return await databaseService.getPlayerById(parseInt(id));
    }
  }
};

export default playerResolvers;