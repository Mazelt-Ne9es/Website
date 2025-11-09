import express from 'express';
import { players } from '../models/data.js';

const router = express.Router();

// Get all players
router.get('/', (req, res) => {
  res.json(players);
});

// Get player by ID
router.get('/:id', (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }
  res.json(player);
});

export default router;