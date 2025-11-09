import { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { playersApi } from '../lib/api';
import type { Player } from '../types/api';

export function PlayersPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await playersApi.getAll();
        setPlayers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load players. Please try again later.');
        console.error('Error fetching players:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-white">Loading players...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-900/50 border border-red-500 text-white p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const players_data: Player[] = [
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
    },
    {
      id: 3,
      name: 'Alex Thompson',
      position: 'Midfielder',
      number: 8,
      photo: 'https://images.unsplash.com/photo-1662013606299-b8ff0a34efc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBhdGhsZXRlJTIwbWFsZXxlbnwxfHx8fDE3NjI2Mzk0OTF8MA&ixlib=rb-4.1.0&q=80&w=400',
      height: '5\'11"',
      weight: '170 lbs',
      age: 28,
      nationality: 'England',
      goals: 8,
      assists: 12,
      tackles: 52,
      passes: 1456,
      rating: 7.9,
      matchHistory: [
        { id: 1, date: '2025-11-06', opponent: 'Arsenal FC', goals: 0, assists: 2, rating: 7.8 },
        { id: 2, date: '2025-11-02', opponent: 'Chelsea FC', goals: 1, assists: 1, rating: 8.1 },
        { id: 3, date: '2025-10-28', opponent: 'Liverpool FC', goals: 0, assists: 0, rating: 7.3 },
      ],
    },
    {
      id: 4,
      name: 'James Wilson',
      position: 'Defender',
      number: 4,
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
      height: '6\'1"',
      weight: '180 lbs',
      age: 29,
      nationality: 'Scotland',
      goals: 3,
      assists: 5,
      tackles: 78,
      passes: 987,
      rating: 7.6,
      matchHistory: [
        { id: 1, date: '2025-11-06', opponent: 'Arsenal FC', goals: 0, assists: 0, rating: 7.5 },
        { id: 2, date: '2025-11-02', opponent: 'Chelsea FC', goals: 0, assists: 1, rating: 7.8 },
        { id: 3, date: '2025-10-28', opponent: 'Liverpool FC', goals: 0, assists: 0, rating: 7.2 },
      ],
    },
    {
      id: 5,
      name: 'Lucas Silva',
      position: 'Forward',
      number: 11,
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucas',
      height: '5\'9"',
      weight: '160 lbs',
      age: 22,
      nationality: 'Brazil',
      goals: 14,
      assists: 9,
      tackles: 18,
      passes: 534,
      rating: 8.1,
      matchHistory: [
        { id: 1, date: '2025-11-06', opponent: 'Arsenal FC', goals: 0, assists: 0, rating: 7.2 },
        { id: 2, date: '2025-11-02', opponent: 'Chelsea FC', goals: 1, assists: 1, rating: 8.3 },
        { id: 3, date: '2025-10-28', opponent: 'Liverpool FC', goals: 1, assists: 1, rating: 8.5 },
      ],
    },
    {
      id: 6,
      name: 'Tom Anderson',
      position: 'Defender',
      number: 5,
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tom',
      height: '6\'3"',
      weight: '190 lbs',
      age: 31,
      nationality: 'England',
      goals: 2,
      assists: 3,
      tackles: 85,
      passes: 1123,
      rating: 7.7,
      matchHistory: [
        { id: 1, date: '2025-11-06', opponent: 'Arsenal FC', goals: 1, assists: 0, rating: 7.9 },
        { id: 2, date: '2025-11-02', opponent: 'Chelsea FC', goals: 0, assists: 0, rating: 7.5 },
        { id: 3, date: '2025-10-28', opponent: 'Liverpool FC', goals: 0, assists: 0, rating: 7.4 },
      ],
    },
  ];

  const trainingCycle = [
    { day: 'J-5', activity: 'Recovery', intensity: 'Low' },
    { day: 'J-4', activity: 'Tactical Training', intensity: 'Medium' },
    { day: 'J-3', activity: 'Technical Drills', intensity: 'High' },
    { day: 'J-2', activity: 'Team Practice', intensity: 'High' },
    { day: 'J-1', activity: 'Light Training', intensity: 'Low' },
    { day: 'J', activity: 'Match Day', intensity: 'Match' },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header with View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-green-500" />
          <h2 className="text-white text-2xl">Squad Overview</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'}`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg ${viewMode === 'table' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'}`}
          >
            Table View
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <Card
              key={player.id}
              className="bg-gray-800 border-gray-700 p-6 cursor-pointer hover:border-green-500 transition-colors"
              onClick={() => setSelectedPlayer(player)}
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <ImageWithFallback
                    src={player.photo}
                    alt={player.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                    {player.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1">{player.name}</h3>
                  <Badge variant="secondary" className="mb-3">{player.position}</Badge>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <div className="text-green-500 text-sm">{player.goals}</div>
                      <div className="text-gray-500 text-xs">G</div>
                    </div>
                    <div>
                      <div className="text-blue-500 text-sm">{player.assists}</div>
                      <div className="text-gray-500 text-xs">A</div>
                    </div>
                    <div>
                      <div className="text-yellow-500 text-sm">{player.tackles}</div>
                      <div className="text-gray-500 text-xs">T</div>
                    </div>
                    <div>
                      <div className="text-purple-500 text-sm">{player.rating}</div>
                      <div className="text-gray-500 text-xs">★</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <Card className="bg-gray-800 border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="text-gray-400">#</TableHead>
                <TableHead className="text-gray-400">Player</TableHead>
                <TableHead className="text-gray-400">Position</TableHead>
                <TableHead className="text-gray-400">Goals</TableHead>
                <TableHead className="text-gray-400">Assists</TableHead>
                <TableHead className="text-gray-400">Tackles</TableHead>
                <TableHead className="text-gray-400">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow
                  key={player.id}
                  className="border-gray-700 cursor-pointer hover:bg-gray-700"
                  onClick={() => setSelectedPlayer(player)}
                >
                  <TableCell className="text-gray-300">{player.number}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={player.photo} />
                        <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-white">{player.name}</div>
                        <div className="text-gray-500 text-xs">{player.nationality}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{player.position}</TableCell>
                  <TableCell className="text-green-500">{player.goals}</TableCell>
                  <TableCell className="text-blue-500">{player.assists}</TableCell>
                  <TableCell className="text-yellow-500">{player.tackles}</TableCell>
                  <TableCell className="text-purple-500">{player.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Player Profile Modal */}
      <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
        <DialogContent className="max-w-4xl bg-gray-900 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Player Profile</DialogTitle>
          </DialogHeader>

          {selectedPlayer && (
            <div className="space-y-6">
              {/* Player Info */}
              <div className="flex items-start gap-6 p-6 bg-gray-800 rounded-lg">
                <ImageWithFallback
                  src={selectedPlayer.photo}
                  alt={selectedPlayer.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl text-white mb-2">{selectedPlayer.name}</h2>
                      <Badge className="bg-gradient-to-r from-green-600 to-blue-600">{selectedPlayer.position}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl text-white mb-1">#{selectedPlayer.number}</div>
                      <div className="text-yellow-500 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {selectedPlayer.rating}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Age</div>
                      <div className="text-white">{selectedPlayer.age} years</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Height</div>
                      <div className="text-white">{selectedPlayer.height}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Weight</div>
                      <div className="text-white">{selectedPlayer.weight}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Nationality</div>
                      <div className="text-white">{selectedPlayer.nationality}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Season Stats */}
              <div>
                <h3 className="text-lg mb-4">Season Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-gray-800 border-gray-700 p-4">
                    <div className="text-gray-400 text-sm mb-1">Goals</div>
                    <div className="text-green-500 text-3xl">{selectedPlayer.goals}</div>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700 p-4">
                    <div className="text-gray-400 text-sm mb-1">Assists</div>
                    <div className="text-blue-500 text-3xl">{selectedPlayer.assists}</div>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700 p-4">
                    <div className="text-gray-400 text-sm mb-1">Tackles</div>
                    <div className="text-yellow-500 text-3xl">{selectedPlayer.tackles}</div>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700 p-4">
                    <div className="text-gray-400 text-sm mb-1">Passes</div>
                    <div className="text-purple-500 text-3xl">{selectedPlayer.passes}</div>
                  </Card>
                </div>
              </div>

              {/* Match History */}
              <div>
                <h3 className="text-lg mb-4">Recent Match History</h3>
                <Card className="bg-gray-800 border-gray-700">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 hover:bg-gray-800">
                        <TableHead className="text-gray-400">Date</TableHead>
                        <TableHead className="text-gray-400">Opponent</TableHead>
                        <TableHead className="text-gray-400">Goals</TableHead>
                        <TableHead className="text-gray-400">Assists</TableHead>
                        <TableHead className="text-gray-400">Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPlayer.matchHistory.map((match) => (
                        <TableRow key={match.id} className="border-gray-700">
                          <TableCell className="text-gray-300">{new Date(match.date).toLocaleDateString()}</TableCell>
                          <TableCell className="text-white">{match.opponent}</TableCell>
                          <TableCell className="text-green-500">{match.goals}</TableCell>
                          <TableCell className="text-blue-500">{match.assists}</TableCell>
                          <TableCell className="text-yellow-500">{match.rating}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>

              {/* Training Cycle */}
              <div>
                <h3 className="text-lg mb-4">Training Cycle</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {trainingCycle.map((day, index) => (
                    <Card
                      key={index}
                      className={`border-gray-700 p-4 text-center ${
                        day.intensity === 'Match' ? 'bg-gradient-to-br from-green-600 to-blue-600' :
                        day.intensity === 'High' ? 'bg-orange-900/50' :
                        day.intensity === 'Medium' ? 'bg-yellow-900/50' :
                        'bg-gray-800'
                      }`}
                    >
                      <div className="text-white mb-2">{day.day}</div>
                      <div className="text-gray-300 text-xs mb-1">{day.activity}</div>
                      <Badge variant="secondary" className="text-xs">{day.intensity}</Badge>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
