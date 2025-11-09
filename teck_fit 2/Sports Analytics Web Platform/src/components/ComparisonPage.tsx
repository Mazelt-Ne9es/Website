import { useState } from 'react';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

interface ComparisonEntity {
  id: string;
  name: string;
  type: 'player' | 'team';
  stats: {
    goals: number;
    assists: number;
    tackles: number;
    passes: number;
    shots: number;
    rating: number;
  };
}

export function ComparisonPage() {
  const [entity1, setEntity1] = useState<string>('player1');
  const [entity2, setEntity2] = useState<string>('player2');

  const players: ComparisonEntity[] = [
    {
      id: 'player1',
      name: 'Merih Demiral',
      type: 'player',
      stats: { goals: 18, assists: 7, tackles: 12, passes: 456, shots: 89, rating: 8.5 },
    },
    {
      id: 'player2',
      name: 'Awadh Khamis',
      type: 'player',
      stats: { goals: 12, assists: 15, tackles: 45, passes: 1243, shots: 67, rating: 8.2 },
    },
    {
      id: 'player3',
      name: 'Awadh Al-Saadi',
      type: 'player',
      stats: { goals: 8, assists: 12, tackles: 52, passes: 1456, shots: 54, rating: 7.9 },
    },
    {
      id: 'player4',
      name: 'Awad Dahal',
      type: 'player',
      stats: { goals: 14, assists: 9, tackles: 18, passes: 534, shots: 76, rating: 8.1 },
    },
  ];

  const selectedEntity1 = players.find(p => p.id === entity1);
  const selectedEntity2 = players.find(p => p.id === entity2);

  const barChartData = selectedEntity1 && selectedEntity2 ? [
    { stat: 'Goals', [selectedEntity1.name]: selectedEntity1.stats.goals, [selectedEntity2.name]: selectedEntity2.stats.goals },
    { stat: 'Assists', [selectedEntity1.name]: selectedEntity1.stats.assists, [selectedEntity2.name]: selectedEntity2.stats.assists },
    { stat: 'Tackles', [selectedEntity1.name]: selectedEntity1.stats.tackles, [selectedEntity2.name]: selectedEntity2.stats.tackles },
    { stat: 'Shots', [selectedEntity1.name]: selectedEntity1.stats.shots, [selectedEntity2.name]: selectedEntity2.stats.shots },
  ] : [];

  const radarChartData = selectedEntity1 && selectedEntity2 ? [
    { metric: 'Goals', [selectedEntity1.name]: (selectedEntity1.stats.goals / 20) * 100, [selectedEntity2.name]: (selectedEntity2.stats.goals / 20) * 100 },
    { metric: 'Assists', [selectedEntity1.name]: (selectedEntity1.stats.assists / 20) * 100, [selectedEntity2.name]: (selectedEntity2.stats.assists / 20) * 100 },
    { metric: 'Tackles', [selectedEntity1.name]: (selectedEntity1.stats.tackles / 100) * 100, [selectedEntity2.name]: (selectedEntity2.stats.tackles / 100) * 100 },
    { metric: 'Passes', [selectedEntity1.name]: (selectedEntity1.stats.passes / 1500) * 100, [selectedEntity2.name]: (selectedEntity2.stats.passes / 1500) * 100 },
    { metric: 'Shots', [selectedEntity1.name]: (selectedEntity1.stats.shots / 100) * 100, [selectedEntity2.name]: (selectedEntity2.stats.shots / 100) * 100 },
    { metric: 'Rating', [selectedEntity1.name]: selectedEntity1.stats.rating * 10, [selectedEntity2.name]: selectedEntity2.stats.rating * 10 },
  ] : [];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-6">Player Comparison</h2>
      </div>

      {/* Selection Controls */}
      <Card className="bg-gray-800 border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Select First Player</label>
            <Select value={entity1} onValueChange={setEntity1}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {players.map((player) => (
                  <SelectItem key={player.id} value={player.id} disabled={player.id === entity2}>
                    {player.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Select Second Player</label>
            <Select value={entity2} onValueChange={setEntity2}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {players.map((player) => (
                  <SelectItem key={player.id} value={player.id} disabled={player.id === entity1}>
                    {player.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Comparison Views */}
      {selectedEntity1 && selectedEntity2 && (
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="table" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-blue-600">
              Table Comparison
            </TabsTrigger>
            <TabsTrigger value="bar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-blue-600">
              Bar Chart
            </TabsTrigger>
            <TabsTrigger value="radar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-blue-600">
              Radar Chart
            </TabsTrigger>
          </TabsList>

          {/* Table Comparison */}
          <TabsContent value="table">
            <Card className="bg-gray-800 border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-400">Statistic</TableHead>
                    <TableHead className="text-green-500">{selectedEntity1.name}</TableHead>
                    <TableHead className="text-blue-500">{selectedEntity2.name}</TableHead>
                    <TableHead className="text-gray-400">Difference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { label: 'Goals', key: 'goals' },
                    { label: 'Assists', key: 'assists' },
                    { label: 'Tackles', key: 'tackles' },
                    { label: 'Passes', key: 'passes' },
                    { label: 'Shots', key: 'shots' },
                    { label: 'Rating', key: 'rating' },
                  ].map((stat) => {
                    const key = stat.key as keyof typeof selectedEntity1.stats;
                    const val1 = selectedEntity1.stats[key];
                    const val2 = selectedEntity2.stats[key];
                    const diff = val1 - val2;
                    
                    return (
                      <TableRow key={stat.key} className="border-gray-700">
                        <TableCell className="text-gray-300">{stat.label}</TableCell>
                        <TableCell className="text-green-500">{val1}</TableCell>
                        <TableCell className="text-blue-500">{val2}</TableCell>
                        <TableCell className={diff > 0 ? 'text-green-500' : diff < 0 ? 'text-red-500' : 'text-gray-400'}>
                          {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Bar Chart */}
          <TabsContent value="bar">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="stat" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                  <Legend />
                  <Bar dataKey={selectedEntity1.name} fill="#10B981" />
                  <Bar dataKey={selectedEntity2.name} fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Radar Chart */}
          <TabsContent value="radar">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <ResponsiveContainer width="100%" height={500}>
                <RadarChart data={radarChartData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" />
                  <PolarRadiusAxis stroke="#9CA3AF" />
                  <Radar name={selectedEntity1.name} dataKey={selectedEntity1.name} stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Radar name={selectedEntity2.name} dataKey={selectedEntity2.name} stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
