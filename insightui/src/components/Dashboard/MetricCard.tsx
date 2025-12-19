import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  LinearProgress,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
  MoreVert,
  Info,
  Refresh,
} from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  progress?: number;
  trend?: 'up' | 'down';
  trendValue?: string;
  subtitle?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  onRefresh?: () => void;
  onDetails?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color,
  progress,
  trend,
  trendValue,
  subtitle,
  status = 'info',
  onRefresh,
  onDetails,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success': return '#4caf50';
      case 'warning': return '#ff9800';
      case 'error': return '#f44336';
      default: return '#2196f3';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? (
      <ArrowUpward sx={{ color: '#4caf50', fontSize: 16 }} />
    ) : (
      <ArrowDownward sx={{ color: '#f44336', fontSize: 16 }} />
    );
  };

  return (
    <Card className="metric-card">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                {title}
              </Typography>
              <Tooltip title="Mais informações">
                <IconButton size="small" onClick={onDetails}>
                  <Info fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="h4" component="div" sx={{ mb: 0.5 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Avatar 
              sx={{ 
                bgcolor: `${color}15`,
                color: color,
                width: 44,
                height: 44,
                mb: 1,
              }}
            >
              {icon}
            </Avatar>
            <Box display="flex" alignItems="center" gap={0.5}>
              {getTrendIcon()}
              {trendValue && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: trend === 'up' ? '#4caf50' : '#f44336',
                    fontWeight: 600,
                  }}
                >
                  {trendValue}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        
        {progress !== undefined && (
          <>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
              <Typography variant="caption" color="textSecondary">
                Progresso
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                {progress}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: `${color}15`,
                '& .MuiLinearProgress-bar': {
                  bgcolor: color,
                  borderRadius: 4,
                }
              }}
            />
          </>
        )}
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: getStatusColor(),
                animation: status === 'warning' ? 'pulse 2s infinite' : 'none',
              }}
            />
            <Typography variant="caption" color="textSecondary">
              {status === 'success' && 'Normal'}
              {status === 'warning' && 'Atenção'}
              {status === 'error' && 'Crítico'}
              {status === 'info' && 'Estável'}
            </Typography>
          </Box>
          
          <Box>
            <IconButton size="small" onClick={onRefresh}>
              <Refresh fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleClick}>
              <MoreVert fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>Ver detalhes</MenuItem>
              <MenuItem onClick={handleClose}>Configurar alerta</MenuItem>
              <MenuItem onClick={handleClose}>Exportar dados</MenuItem>
              <MenuItem onClick={handleClose}>Histórico</MenuItem>
            </Menu>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard;