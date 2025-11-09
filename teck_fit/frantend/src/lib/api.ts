import axios from 'axios';
import type { Player, Report, Stats, ReportGenerateResponse } from '../types/api';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const playersApi = {
  getAll: () => api.get<Player[]>('/players'),
  getById: (id: number) => api.get<Player>(`/players/${id}`),
};

export const reportsApi = {
  getAll: () => api.get<Report[]>('/reports'),
  generate: (reportId: number, parameters?: any) => 
    api.post<ReportGenerateResponse>('/reports/generate', { reportId, parameters }),
};

export const statsApi = {
  getTeamStats: () => api.get<Stats>('/stats'),
};