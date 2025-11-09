import DataLoader from 'dataloader';
import { players } from '../models/data.js';
import type { Player } from '../types/models';

export class DataLoaderService {
  public playerLoader: DataLoader<number, Player>;

  constructor() {
    this.playerLoader = new DataLoader<number, Player>(async (ids) => {
      const playerMap = new Map(players.map(p => [p.id, p]));
      return ids.map(id => playerMap.get(id) || new Error(`Player ${id} not found`));
    });
  }
}

export const dataLoaderService = new DataLoaderService();