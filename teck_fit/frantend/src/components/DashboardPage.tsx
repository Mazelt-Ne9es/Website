import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trophy, TrendingUp, Target, AlertCircle, Activity } from 'lucide-react';
import { StatCard } from './StatCard';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

export function DashboardPage() {
  type Stat = {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: string;
    trend?: string;
  };

  type Activity = {
    id: string | number;
    text: string;
    time: string;
    positive?: boolean;
  };

  type Alert = {
    id: string | number;
    text: string;
    severity: 'warning' | 'info' | string;
  };

  type Player = {
    image: string;
    initials: string;
    name: string;
    position: string;
    goals: number;
    assists: number;
    rating: number;
  };

  const [stats, setStats] = useState<Stat[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, activitiesRes, alertsRes, playerRes] = await Promise.all([
          axios.get<Stat[]>(`${API_URL}/stats`),
          axios.get<Activity[]>(`${API_URL}/activities`),
          axios.get<Alert[]>(`${API_URL}/alerts`),
          axios.get<Player>(`${API_URL}/playerOfTheWeek`)
        ]);

        setStats(statsRes.data ?? []);
        setRecentActivities(activitiesRes.data ?? []);
        setAlerts(alertsRes.data ?? []);
        setPlayer(playerRes.data ?? null);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="text-white p-8">Chargement des données...</div>;

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-white text-2xl mb-6">Team Performance Overview</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <StatCard
            key={i}
            title={s.title}
            value={s.value}
            subtitle={s.subtitle}
            icon={s.icon === "trophy" ? Trophy : s.icon === "trend" ? TrendingUp : Target}
            trend={s.trend ? { value: s.trend, positive: s.trend.startsWith('+') } : undefined}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player of the Week */}
        <Card className="bg-gray-800 border-gray-700 p-6 lg:col-span-1">
          <h3 className="text-white mb-4">Player of the Week</h3>
          {player && (
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={player.image} />
                <AvatarFallback>{player.initials}</AvatarFallback>
              </Avatar>
              <div className="text-white mb-1">{player.name}</div>
              <div className="text-gray-400 text-sm mb-4">{player.position}</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-green-500 text-xl">{player.goals}</div>
                  <div className="text-gray-500 text-xs">Goals</div>
                </div>
                <div>
                  <div className="text-blue-500 text-xl">{player.assists}</div>
                  <div className="text-gray-500 text-xs">Assists</div>
                </div>
                <div>
                  <div className="text-yellow-500 text-xl">{player.rating}</div>
                  <div className="text-gray-500 text-xs">Rating</div>
                </div>
              </div>
            </div>
          )}
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
