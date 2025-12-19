import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  MoreVert,
  Storage,
  Memory,
  Speed,
  Cloud,
  Settings,
} from '@mui/icons-material';

interface ServerStatusProps {
  server: {
    id: number;
    name: string;
    type: 'web' | 'db' | 'cache' | 'load-balancer' | 'file' | 'api';
    status: 'online' | 'warning' | 'error' | 'maintenance';
    cpu: number;
    memory: number;
    disk: number;
    latency: string;
    uptime: string;
    ip: string;
    location?: string;
    lastUpdated: string;
  };
  onDetails?: (serverId: number) => void;
  onConfigure?: (serverId: number) => void;
}

const ServerStatus: React.FC<ServerStatusProps> = ({ server, onDetails, onConfigure }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return '#4caf50';
      case 'warning': return '#ff9800';
      case 'error': return '#f44336';
      case 'maintenance': return '#9c27b0';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'online': return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'warning': return <Warning sx={{ color: '#ff9800' }} />;
      case 'error': return <ErrorIcon sx={{ color: '#f44336' }} />;
      case 'maintenance': return <Settings sx={{ color: '#9c27b0' }} />;
      default: return <CheckCircle />;
    }
  };

  const getServerIcon = (type: string) => {
    switch(type) {
      case 'web': return <Cloud />;
      case 'db': return <Storage />;
      case 'cache': return <Memory />;
      case 'load-balancer': return <Speed />;
      case 'file': return <Storage />;
      case 'api': return <Cloud />;
      default: return <Computer />;
    }
  };

  const getServerColor = (type: string) => {
    switch(type) {
      case 'web': return '#2196f3';
      case 'db': return '#4caf50';
      case 'cache': return '#ff9800';
      case 'load-balancer': return '#9c27b0';
      case 'file': return '#607d8b';
      case 'api': return '#00bcd4';
      default: return '#9e9e9e';
    }
  };

  const getProgressColor = (value: number, type: 'cpu' | 'memory' | 'disk') => {
    if (value > 90) return '#f44336';
    if (value > 75) return '#ff9800';
    
    switch(type) {
      case 'cpu': return '#2196f3';
      case 'memory': return '#4caf50';
      case 'disk': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  return (
    <Card className="server-card">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar
              sx={{
                bgcolor: `${getServerColor(server.type)}20`,
                color: getServerColor(server.type),
                width: 40,
                height: 40,
              }}
            >
              {getServerIcon(server.type)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {server.name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {server.ip} {server.location && `• ${server.location}`}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip 
              label={server.status.toUpperCase()} 
              size="small"
              icon={getStatusIcon(server.status)}
              sx={{ 
                bgcolor: `${getStatusColor(server.status)}20`,
                color: getStatusColor(server.status),
                fontWeight: 600,
                fontSize: '0.7rem',
              }}
            />
            <Tooltip title="Configurações">
              <IconButton size="small" onClick={() => onConfigure?.(server.id)}>
                <Settings fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="caption" color="textSecondary" display="block">
              CPU
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={server.cpu} 
              sx={{ 
                height: 6,
                borderRadius: 3,
                bgcolor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  bgcolor: getProgressColor(server.cpu, 'cpu'),
                  borderRadius: 3,
                }
              }}
            />
            <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>
              {server.cpu}%
            </Typography>
          </Grid>
          
          <Grid item xs={4}>
            <Typography variant="caption" color="textSecondary" display="block">
              Memória
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={server.memory} 
              sx={{ 
                height: 6,
                borderRadius: 3,
                bgcolor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  bgcolor: getProgressColor(server.memory, 'memory'),
                  borderRadius: 3,
                }
              }}
            />
            <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>
              {server.memory}%
            </Typography>
          </Grid>
          
          <Grid item xs={4}>
            <Typography variant="caption" color="textSecondary" display="block">
              Disco
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={server.disk} 
              sx={{ 
                height: 6,
                borderRadius: 3,
                bgcolor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  bgcolor: getProgressColor(server.disk, 'disk'),
                  borderRadius: 3,
                }
              }}
            />
            <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>
              {server.disk}%
            </Typography>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box>
            <Typography variant="caption" color="textSecondary" display="block">
              Latência
            </Typography>
            <Typography 
              variant="body2" 
              fontWeight={600}
              sx={{ 
                color: server.latency === '45ms' ? '#f44336' : 
                       server.latency === '15ms' ? '#ff9800' : '#4caf50'
              }}
            >
              {server.latency}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="caption" color="textSecondary" display="block">
              Uptime
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {server.uptime}
            </Typography>
          </Box>
          
          <Tooltip title="Ver detalhes">
            <IconButton 
              size="small" 
              onClick={() => onDetails?.(server.id)}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ServerStatus;