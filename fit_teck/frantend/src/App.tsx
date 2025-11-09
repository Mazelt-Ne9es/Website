import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardPage } from './components/DashboardPage';
import { MatchesPage } from './components/MatchesPage';
import { PlayersPage } from './components/PlayersPage';
import { ComparisonPage } from './components/ComparisonPage';
import { ReportsPage } from './components/ReportsPage';
import { LoginPage } from './components/LoginPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  const pageTitles: Record<string, string> = {
    dashboard: 'Dashboard',
    matches: 'Matches',
    players: 'Players',
    comparisons: 'Comparisons',
    reports: 'Reports',
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={pageTitles[currentPage] || 'Dashboard'} />
        
        <main className="flex-1 overflow-y-auto">
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'matches' && <MatchesPage />}
          {currentPage === 'players' && <PlayersPage />}
          {currentPage === 'comparisons' && <ComparisonPage />}
          {currentPage === 'reports' && <ReportsPage />}
        </main>
      </div>
    </div>
  );
}
