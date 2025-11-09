import { Trophy, TrendingUp, Target, AlertCircle, Activity } from 'lucide-react';
import { StatCard } from './StatCard';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

export function DashboardPage() {
  const recentActivities = [
    { id: 1, type: 'match', text: 'Match won vs Nasr FC', time: '2 hours ago', positive: true },
    { id: 2, type: 'player', text: 'Merih Demiral scored 2 goals', time: '2 hours ago', positive: true },
    { id: 3, type: 'training', text: 'Team training session completed', time: '5 hours ago', positive: true },
    { id: 4, type: 'injury', text: 'Awadh Khamis - minor ankle sprain', time: '1 day ago', positive: false },
    { id: 5, type: 'match', text: 'Next match: vs Al Hilal FC', time: '2 days', positive: true },
  ];

  const alerts = [
    { id: 1, text: 'Awadh Khamis recovering from ankle injury', severity: 'warning' },
    { id: 2, text: '3 players need fitness assessment', severity: 'info' },
    { id: 3, text: 'Match report pending approval', severity: 'info' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-white text-2xl mb-6">Team Performance Overview</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Last Match Result"
          value="3 - 1"
          subtitle="vs Arsenal FC"
          icon={Trophy}
          trend={{ value: '+2 Goal Diff', positive: true }}
        />
        <StatCard
          title="Win/Loss Ratio"
          value="75%"
          subtitle="12W - 2D - 2L"
          icon={TrendingUp}
          trend={{ value: '+5% this month', positive: true }}
        />
        <StatCard
          title="Goals For"
          value="42"
          subtitle="Goals Against: 18"
          icon={Target}
        />
        <StatCard
          title="League Position"
          value="2nd"
          subtitle="65 points"
          icon={Activity}
          trend={{ value: 'Up 1 position', positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player of the Week */}
        <Card className="bg-gray-800 border-gray-700 p-6 lg:col-span-1">
          <h3 className="text-white mb-4">Player of the Week</h3>
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=marcus" />
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <div className="text-white mb-1">Merih Demiral</div>
            <div className="text-gray-400 text-sm mb-4">Forward</div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-green-500 text-xl">4</div>
                <div className="text-gray-500 text-xs">Goals</div>
              </div>
              <div>
                <div className="text-blue-500 text-xl">2</div>
                <div className="text-gray-500 text-xs">Assists</div>
              </div>
              <div>
                <div className="text-yellow-500 text-xl">8.9</div>
                <div className="text-gray-500 text-xs">Rating</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-800 border-gray-700 p-6 lg:col-span-2">
          <h3 className="text-white mb-4">Recent Activity</h3>
          <ScrollArea className="h-64">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${activity.positive ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.text}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="bg-gray-800 border-gray-700 p-6">
        <h3 className="text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-500" />
          Alerts & Updates
        </h3>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
              <AlertCircle className={`w-4 h-4 ${alert.severity === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`} />
              <span className="text-gray-300 text-sm flex-1">{alert.text}</span>
              <Badge variant={alert.severity === 'warning' ? 'destructive' : 'secondary'}>
                {alert.severity}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
