import express from 'express';
import { players } from '../models/data.js';
import type { Player } from 'sports-analytics-types';

const router = express.Router();

// Get all players
router.get('/', (_req: express.Request, res: express.Response) => {
  res.json(players);
});

// Get player by ID
router.get('/:id', (req: express.Request, res: express.Response) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }
  res.json(player);
});

export default router;