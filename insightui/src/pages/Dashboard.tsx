// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import {
  Memory,
  Storage,
  Speed,
  Cloud,
  Warning,
  CheckCircle
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import MetricCard from '../components/Dashboard/MetricCard';
import { useSocket } from '../services/socket';

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const { latestData } = useSocket();

  useEffect(() => {
    // Carregar dados históricos
    fetch('http://localhost:4000/api/metrics/history')
      .then(res => res.json())
      .then(data => setHistoryData(data));
  }, []);

  const metricsCards = [
    {
      title: 'Uso de CPU',
      value: latestData?.cpu ? `${latestData.cpu.toFixed(1)}%` : '0%',
      icon: <Speed />,
      color: '#1976d2',
      progress: latestData?.cpu || 0
    },
    {
      title: 'Uso de Memória',
      value: latestData?.memory ? `${latestData.memory.toFixed(1)}%` : '0%',
      icon: <Memory />,
      color: '#d32f2f',
      progress: latestData?.memory || 0
    },
    {
      title: 'Tráfego de Rede',
      value: latestData?.networkIn ? `${(latestData.networkIn / 1000).toFixed(2)} Mb/s` : '0 Mb/s',
      icon: <Cloud />,
      color: '#388e3c'
    },
    {
      title: 'Status',
      value: 'Operacional',
      icon: <CheckCircle />,
      color: '#2e7d32',
      subValue: '8/10 servidores'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Visão Geral do Sistema
      </Typography>
      
      <Grid container spacing={3}>
        {/* Cards de Métricas */}
        {metricsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MetricCard {...card} />
          </Grid>
        ))}
        
        {/* Gráfico de CPU */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Uso de CPU (24h)
            </Typography>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={historyData}>
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="cpu" stroke="#1976d2" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        {/* Gráfico de Memória */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Uso de Memória (24h)
            </Typography>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={historyData}>
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="memory" stroke="#d32f2f" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        {/* Lista de Servidores */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Status dos Servidores
            </Typography>
            <Grid container spacing={2}>
              {[
                { name: 'Web-01', status: 'online', cpu: 45, memory: 67 },
                { name: 'DB-01', status: 'warning', cpu: 85, memory: 90 },
                { name: 'Cache-01', status: 'online', cpu: 30, memory: 40 }
              ].map((server, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {server.name}
                        <Box 
                          component="span" 
                          sx={{ 
                            ml: 1,
                            color: server.status === 'online' ? 'success.main' : 'warning.main'
                          }}
                        >
                          ●
                        </Box>
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">CPU: {server.cpu}%</Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={server.cpu} 
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2">Memória: {server.memory}%</Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={server.memory} 
                          color={server.memory > 80 ? "warning" : "primary"}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;