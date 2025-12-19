import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Avatar,
  Tooltip,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Notifications,
  Settings,
  Person,
  AccessTime,
  Refresh,
  Logout
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onRefresh?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'INSIGHT DASHBOARD',
  subtitle = 'Real-time IT Monitoring System',
  onRefresh 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <DashboardIcon sx={{ fontSize: 32, color: '#2196f3', mr: 2 }} />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
            {!isMobile && (
              <Typography variant="caption" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="Current Time">
            <Chip 
              icon={<AccessTime />} 
              label={time.toLocaleTimeString()} 
              variant="outlined"
              size="small"
            />
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton size="small">
              <Badge badgeContent={4} color="error">
                <Notifications fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          {onRefresh && (
            <Tooltip title="Refresh">
              <IconButton size="small" onClick={onRefresh}>
                <Refresh fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Settings">
            <IconButton size="small">
              <Settings fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton size="small">
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#2196f3' }}>
                <Person fontSize="small" />
              </Avatar>
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout">
            <IconButton size="small" onClick={handleLogout}>
              <Logout fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;