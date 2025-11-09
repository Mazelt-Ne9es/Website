import { useState, useEffect } from 'react';
import { FileText, Download, User, Calendar, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { reportsApi } from '../lib/api';
import type { Report } from '../types/api';

export function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingReport, setGeneratingReport] = useState<number | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await reportsApi.getAll();
        setReports(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load reports. Please try again later.');
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleGenerateReport = async (reportId: number) => {
    try {
      setGeneratingReport(reportId);
      const response = await reportsApi.generate(reportId);
      
      if (response.data.status === 'generated') {
        alert('Report generated successfully! Ready to download.');
      } else {
        throw new Error('Failed to generate report');
      }
    } catch (err) {
      alert('Failed to generate report. Please try again.');
      console.error('Error generating report:', err);
    } finally {
      setGeneratingReport(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-white">Loading reports...</div>
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

  const reportIcons = {
    player: User,
    match: Calendar,
    comparison: BarChart3,
  } as const;

  const demoReports = [
    {
      id: 1,
      title: 'Player Performance Report',
      description: 'Comprehensive analysis of individual player statistics, performance metrics, and development trends.',
      icon: User,
      color: 'from-green-600 to-emerald-600',
    },
    {
      id: 2,
      title: 'Match Report',
      description: 'Detailed match analysis including team statistics, player ratings, tactical insights, and key moments.',
      icon: Calendar,
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 3,
      title: 'Team Comparison Report',
      description: 'Comparative analysis between players or teams with visual charts and statistical breakdowns.',
      icon: BarChart3,
      color: 'from-purple-600 to-pink-600',
    },
  ];

  // Removed old handleGenerateReport

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-2">Reports</h2>
        <p className="text-gray-400">Generate comprehensive PDF reports for analysis and documentation</p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = reportIcons[report.type];
          return (
            <Card key={report.id} className="bg-gray-800 border-gray-700 p-6 hover:border-green-500 transition-colors">
              <div className={`w-12 h-12 bg-gradient-to-br ${report.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white text-lg mb-2">{report.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{report.description}</p>
              <Button
                onClick={() => handleGenerateReport(report.id)}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                disabled={generatingReport === report.id}
              >
                <Download className="w-4 h-4 mr-2" />
                Generate PDF
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Preview Area */}
      <Card className="bg-gray-800 border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-green-500" />
          <h3 className="text-white text-lg">Report Preview</h3>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Mock Report Header */}
            <div className="border-b border-gray-700 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-white text-2xl mb-2">Player Performance Report</h2>
                  <p className="text-gray-400">Season 2024/2025</p>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Generated on</div>
                  <div className="text-white">November 8, 2025</div>
                </div>
              </div>
            </div>

            {/* Mock Report Content */}
            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm mb-2">Player Name</div>
                <div className="text-white text-lg">Marcus Rodriguez</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-sm mb-2">Position</div>
                  <div className="text-white">Forward</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-2">Squad Number</div>
                  <div className="text-white">#9</div>
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-sm mb-3">Key Statistics</div>
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-gray-800 p-3 rounded">
                    <div className="text-green-500 text-xl">18</div>
                    <div className="text-gray-500 text-xs">Goals</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <div className="text-blue-500 text-xl">7</div>
                    <div className="text-gray-500 text-xs">Assists</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <div className="text-yellow-500 text-xl">89</div>
                    <div className="text-gray-500 text-xs">Shots</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <div className="text-purple-500 text-xl">8.5</div>
                    <div className="text-gray-500 text-xs">Rating</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm italic">
                  This is a preview of the report layout. The generated PDF will include detailed charts, 
                  graphs, and comprehensive analysis of all performance metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
