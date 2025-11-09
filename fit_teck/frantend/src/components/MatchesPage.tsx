import { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface Match {
  id: number;
  date: string;
  opponent: string;
  competition: string;
  result: 'W' | 'L' | 'D';
  score: string;
  possession: number;
  shots: number;
  passes: number;
}

export function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [filter, setFilter] = useState({
    competition: 'all',
    result: 'all',
    homeAway: 'all',
  });

  const matches: Match[] = [
    { id: 1, date: '2025-11-06', opponent: 'Arsenal FC', competition: 'Premier League', result: 'W', score: '3-1', possession: 58, shots: 18, passes: 542 },
    { id: 2, date: '2025-11-02', opponent: 'Chelsea FC', competition: 'Premier League', result: 'D', score: '2-2', possession: 52, shots: 14, passes: 498 },
    { id: 3, date: '2025-10-28', opponent: 'Liverpool FC', competition: 'Premier League', result: 'L', score: '1-2', possession: 45, shots: 12, passes: 456 },
    { id: 4, date: '2025-10-24', opponent: 'Man City', competition: 'League Cup', result: 'W', score: '2-1', possession: 48, shots: 15, passes: 478 },
    { id: 5, date: '2025-10-20', opponent: 'Tottenham', competition: 'Premier League', result: 'W', score: '3-0', possession: 62, shots: 20, passes: 612 },
    { id: 6, date: '2025-10-16', opponent: 'Newcastle', competition: 'Premier League', result: 'W', score: '2-1', possession: 55, shots: 16, passes: 523 },
  ];

  const playerStats = [
    { name: 'Marcus Rodriguez', position: 'FW', goals: 2, assists: 1, shots: 6, passes: 42, rating: 8.9 },
    { name: 'David Chen', position: 'MF', goals: 1, assists: 1, shots: 3, passes: 68, rating: 8.2 },
    { name: 'Alex Thompson', position: 'MF', goals: 0, assists: 2, shots: 2, passes: 71, rating: 7.8 },
    { name: 'James Wilson', position: 'DF', goals: 0, assists: 0, shots: 1, passes: 54, rating: 7.5 },
  ];

  const teamStatsData = [
    { name: 'Possession', us: 58, them: 42 },
    { name: 'Shots', us: 18, them: 12 },
    { name: 'Shots on Target', us: 9, them: 5 },
    { name: 'Passes', us: 542, them: 389 },
    { name: 'Tackles', us: 22, them: 28 },
  ];

  const radarData = [
    { metric: 'Attack', value: 85 },
    { metric: 'Defense', value: 72 },
    { metric: 'Possession', value: 78 },
    { metric: 'Passing', value: 81 },
    { metric: 'Physical', value: 68 },
  ];

  const getResultBadge = (result: string) => {
    const variants = {
      W: 'bg-green-600',
      L: 'bg-red-600',
      D: 'bg-yellow-600',
    };
    return variants[result as keyof typeof variants] || 'bg-gray-600';
  };

  return (
    <div className="p-8 space-y-6">
      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700 p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <Filter className="w-5 h-5 text-gray-400" />
          <Select value={filter.competition} onValueChange={(v: string) => setFilter({ ...filter, competition: v })}>
            <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Competition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Competitions</SelectItem>
              <SelectItem value="premier">Premier League</SelectItem>
              <SelectItem value="cup">League Cup</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filter.result} onValueChange={(v: string) => setFilter({ ...filter, result: v })}>
            <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Results</SelectItem>
              <SelectItem value="W">Won</SelectItem>
              <SelectItem value="D">Draw</SelectItem>
              <SelectItem value="L">Lost</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filter.homeAway} onValueChange={(v: string) => setFilter({ ...filter, homeAway: v })}>
            <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Home & Away</SelectItem>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="away">Away</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Matches Table */}
      <Card className="bg-gray-800 border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-gray-800">
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Opponent</TableHead>
              <TableHead className="text-gray-400">Competition</TableHead>
              <TableHead className="text-gray-400">Result</TableHead>
              <TableHead className="text-gray-400">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match) => (
              <TableRow
                key={match.id}
                className="border-gray-700 cursor-pointer hover:bg-gray-700"
                onClick={() => setSelectedMatch(match)}
              >
                <TableCell className="text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {new Date(match.date).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="text-white">{match.opponent}</TableCell>
                <TableCell className="text-gray-400">{match.competition}</TableCell>
                <TableCell>
                  <Badge className={`${getResultBadge(match.result)} text-white`}>
                    {match.result}
                  </Badge>
                </TableCell>
                <TableCell className="text-white">{match.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Match Details Modal */}
      <Dialog open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
        <DialogContent className="max-w-4xl bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">Match Details</DialogTitle>
          </DialogHeader>
          
          {selectedMatch && (
            <div className="space-y-6">
              {/* Match Summary */}
              <div className="text-center p-6 bg-gray-800 rounded-lg">
                <div className="text-gray-400 mb-2">{selectedMatch.competition}</div>
                <div className="text-4xl mb-2">{selectedMatch.score}</div>
                <div className="text-xl text-gray-300">vs {selectedMatch.opponent}</div>
                <div className="text-gray-500 text-sm mt-2">{new Date(selectedMatch.date).toLocaleDateString()}</div>
              </div>

              {/* Team Stats */}
              <div>
                <h3 className="text-lg mb-4">Team Statistics</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={teamStatsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                    <Bar dataKey="us" fill="#10B981" name="Our Team" />
                    <Bar dataKey="them" fill="#3B82F6" name={selectedMatch.opponent} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Radar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg mb-4">Performance Analysis</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" />
                      <PolarRadiusAxis stroke="#9CA3AF" />
                      <Radar name="Team" dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Player Stats */}
                <div>
                  <h3 className="text-lg mb-4">Top Performers</h3>
                  <div className="space-y-3">
                    {playerStats.slice(0, 4).map((player) => (
                      <div key={player.name} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div>
                          <div className="text-white text-sm">{player.name}</div>
                          <div className="text-gray-500 text-xs">{player.position}</div>
                        </div>
                        <div className="flex gap-4 text-xs">
                          <div className="text-center">
                            <div className="text-green-500">{player.goals}</div>
                            <div className="text-gray-500">G</div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-500">{player.assists}</div>
                            <div className="text-gray-500">A</div>
                          </div>
                          <div className="text-center">
                            <div className="text-yellow-500">{player.rating}</div>
                            <div className="text-gray-500">★</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
