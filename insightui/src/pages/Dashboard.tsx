import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  IconButton,
  Avatar,
  Tooltip,
  Fab,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  Alert,
  AlertTitle,
  Switch,
  FormControlLabel,
  Drawer,
  ListItemButton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Memory,
  Storage,
  Speed,
  Cloud,
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  Refresh,
  Notifications,
  Settings,
  Person,
  ArrowUpward,
  ArrowDownward,
  Computer,
  NetworkCheck,
  Timeline,
  MoreVert,
  TrendingUp,
  TrendingDown,
  AccessTime,
  Web,
  Security,
  DataUsage,
  ExpandMore,
  Menu as MenuIcon,
  DarkMode,
  LightMode,
  Logout,
  Help
} from '@mui/icons-material';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend, ResponsiveContainer, AreaChart, Area, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import '../Dashboard.css';

// Dados mockados
const cpuUsageData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  usage: 40 + Math.sin(i / 2) * 30 + Math.random() * 10
}));

const memoryData = [
  { name: 'Usado', value: 67 },
  { name: 'Cache', value: 18 },
  { name: 'Buffer', value: 8 },
  { name: 'Livre', value: 7 }
];

const networkData = Array.from({ length: 12 }, (_, i) => ({
  hour: i * 2,
  incoming: Math.random() * 1000 + 500,
  outgoing: Math.random() * 600 + 300
}));

const serverStatusData = [
  { id: 1, name: 'Web Server 01', status: 'online', cpu: 45, memory: 67, disk: 40, latency: '12ms' },
  { id: 2, name: 'Database 01', status: 'warning', cpu: 85, memory: 90, disk: 60, latency: '5ms' },
  { id: 3, name: 'Cache Server', status: 'online', cpu: 30, memory: 40, disk: 25, latency: '8ms' },
  { id: 4, name: 'Load Balancer', status: 'online', cpu: 25, memory: 60, disk: 35, latency: '3ms' },
  { id: 5, name: 'File Server', status: 'error', cpu: 95, memory: 92, disk: 85, latency: '45ms' },
  { id: 6, name: 'API Gateway', status: 'online', cpu: 40, memory: 55, disk: 30, latency: '15ms' }
];

const alertsData = [
  { id: 1, type: 'critical', message: 'CPU usage above 90% on DB-01', time: '2 min ago' },
  { id: 2, type: 'warning', message: 'High memory usage detected', time: '15 min ago' },
  { id: 3, type: 'info', message: 'Backup completed successfully', time: '1 hour ago' },
  { id: 4, type: 'warning', message: 'Network latency increasing', time: '2 hours ago' }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Componentes
const MetricCard = ({ title, value, icon, color, progress, trend, subtitle }: any) => (
  <Card className="metric-card">
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box>
          <Typography color="textSecondary" variant="body2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="textSecondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Avatar sx={{ bgcolor: `${color}20`, color: color }}>
          {icon}
        </Avatar>
      </Box>
      {progress !== undefined && (
        <>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: `${color}20`,
              '& .MuiLinearProgress-bar': {
                bgcolor: color,
                borderRadius: 4
              }
            }}
          />
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="caption" color="textSecondary">
              0%
            </Typography>
            <Typography variant="caption" color="textSecondary">
              100%
            </Typography>
          </Box>
        </>
      )}
      {trend && (
        <Box display="flex" alignItems="center" mt={1}>
          {trend === 'up' ? (
            <ArrowUpward sx={{ color: '#4caf50', fontSize: 16 }} />
          ) : (
            <ArrowDownward sx={{ color: '#f44336', fontSize: 16 }} />
          )}
          <Typography variant="caption" sx={{ color: trend === 'up' ? '#4caf50' : '#f44336', ml: 0.5 }}>
            {trend === 'up' ? '+5.2%' : '-2.1%'}
          </Typography>
          <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
            vs last hour
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

const ServerStatus = ({ server }: any) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return '#4caf50';
      case 'warning': return '#ff9800';
      case 'error': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'online': return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'warning': return <Warning sx={{ color: '#ff9800' }} />;
      case 'error': return <ErrorIcon sx={{ color: '#f44336' }} />;
      default: return <CheckCircle />;
    }
  };

  return (
    <Card className="server-card">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center">
            {getStatusIcon(server.status)}
            <Typography variant="h6" sx={{ ml: 1, fontSize: '0.9rem' }}>
              {server.name}
            </Typography>
          </Box>
          <Chip 
            label={server.status.toUpperCase()} 
            size="small"
            sx={{ 
              bgcolor: `${getStatusColor(server.status)}20`,
              color: getStatusColor(server.status),
              fontWeight: 'bold'
            }}
          />
        </Box>
        
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">
              CPU
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={server.cpu} 
              sx={{ 
                height: 6,
                bgcolor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  bgcolor: server.cpu > 80 ? '#f44336' : '#2196f3'
                }
              }}
            />
            <Typography variant="body2" fontSize="0.8rem">
              {server.cpu}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">
              Memory
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={server.memory} 
              sx={{ 
                height: 6,
                bgcolor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  bgcolor: server.memory > 80 ? '#f44336' : '#4caf50'
                }
              }}
            />
            <Typography variant="body2" fontSize="0.8rem">
              {server.memory}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">
              Disk
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={server.disk} 
              sx={{ 
                height: 6,
                bgcolor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  bgcolor: server.disk > 80 ? '#f44336' : '#ff9800'
                }
              }}
            />
            <Typography variant="body2" fontSize="0.8rem">
              {server.disk}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">
              Latency
            </Typography>
            <Typography variant="body2" fontSize="0.8rem" sx={{ color: server.latency === '45ms' ? '#f44336' : 'inherit' }}>
              {server.latency}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [activeUsers, setActiveUsers] = useState(156);
  const [uptime, setUptime] = useState('99.9%');
  const [darkMode, setDarkMode] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [alerts, setAlerts] = useState(alertsData);

  // Socket.io connection
  useEffect(() => {
    const socket = io('http://localhost:4000');
    
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('metrics', (data) => {
      setRealTimeData(data);
    });

    socket.on('alert', (alert) => {
      setAlerts(prev => [alert, ...prev.slice(0, 9)]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const metrics = [
    {
      title: 'CPU USAGE',
      value: realTimeData ? `${realTimeData.cpu.toFixed(1)}%` : '45.2%',
      icon: <Speed />,
      color: '#2196f3',
      progress: realTimeData ? realTimeData.cpu : 45.2,
      trend: 'up',
      subtitle: '8 cores @ 3.2GHz'
    },
    {
      title: 'MEMORY',
      value: realTimeData ? `${realTimeData.memory.toFixed(1)}%` : '67.8%',
      icon: <Memory />,
      color: '#4caf50',
      progress: realTimeData ? realTimeData.memory : 67.8,
      trend: 'down',
      subtitle: '32GB total'
    },
    {
      title: 'DISK I/O',
      value: realTimeData ? `${(realTimeData.disk / 10).toFixed(1)} GB/s` : '2.4 GB/s',
      icon: <Storage />,
      color: '#ff9800',
      trend: 'up',
      subtitle: 'SSD NVMe'
    },
    {
      title: 'NETWORK',
      value: realTimeData ? `${((realTimeData.networkIn + realTimeData.networkOut) / 1000).toFixed(1)} Gbps` : '1.2 Gbps',
      icon: <Cloud />,
      color: '#9c27b0',
      trend: 'up',
      subtitle: '10G Ethernet'
    },
    {
      title: 'ACTIVE USERS',
      value: realTimeData ? realTimeData.activeConnections.toString() : activeUsers.toString(),
      icon: <Person />,
      color: '#e91e63',
      subtitle: 'Real-time connections'
    },
    {
      title: 'SYSTEM UPTIME',
      value: uptime,
      icon: <CheckCircle />,
      color: '#00bcd4',
      subtitle: 'Last 30 days'
    }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const drawerItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, active: true },
    { text: 'Servers', icon: <Computer /> },
    { text: 'Network', icon: <NetworkCheck /> },
    { text: 'Security', icon: <Security /> },
    { text: 'Analytics', icon: <Timeline /> },
    { text: 'Settings', icon: <Settings /> },
  ];

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header */}
      <Paper elevation={0} className="header">
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Box display="flex" alignItems="center">
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}
            <DashboardIcon sx={{ fontSize: 32, color: '#2196f3', mr: 2 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                INSIGHT DASHBOARD
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Real-time IT Monitoring System
              </Typography>
            </Box>
          </Box>
          
          <Box display="flex" alignItems="center" gap={2}>
            <Tooltip title="Current Time">
              <Chip 
                icon={<AccessTime />} 
                label={time.toLocaleTimeString()} 
                variant="outlined"
                size="small"
              />
            </Tooltip>
            
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={alerts.length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Toggle Theme">
              <IconButton onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Settings">
              <IconButton>
                <Settings />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Logout">
              <IconButton onClick={handleLogout}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            InsightUI
          </Typography>
          <Divider />
          <List>
            {drawerItems.map((item) => (
              <ListItemButton key={item.text} selected={item.active}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* Welcome Banner */}
        <Alert 
          severity="info" 
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <Button color="inherit" size="small" component={Link} to="/">
              Back to Home
            </Button>
          }
        >
          <AlertTitle>Welcome to InsightUI Dashboard</AlertTitle>
          Monitoring {serverStatusData.length} servers in real-time
        </Alert>

        {/* Metrics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <MetricCard {...metric} />
            </Grid>
          ))}
        </Grid>

        {/* Charts and Tables */}
        <Grid container spacing={3}>
          {/* CPU Usage Chart */}
          <Grid item xs={12} lg={8}>
            <Paper className="chart-paper">
              <Box p={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box display="flex" alignItems="center">
                    <Timeline sx={{ mr: 1, color: '#2196f3' }} />
                    <Typography variant="h6">CPU Usage (24h)</Typography>
                  </Box>
                  <Chip label="Real-time" size="small" color="primary" variant="outlined" />
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={cpuUsageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="time" stroke="#888" />
                    <YAxis stroke="#888" />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(30, 30, 30, 0.9)',
                        border: '1px solid #444',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="usage" 
                      stroke="#2196f3" 
                      fill="url(#colorCpu)" 
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2196f3" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Memory Distribution */}
          <Grid item xs={12} lg={4}>
            <Paper className="chart-paper">
              <Box p={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box display="flex" alignItems="center">
                    <Memory sx={{ mr: 1, color: '#4caf50' }} />
                    <Typography variant="h6">Memory Distribution</Typography>
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    32GB Total
                  </Typography>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={memoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {memoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Network Traffic */}
          <Grid item xs={12} lg={6}>
            <Paper className="chart-paper">
              <Box p={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box display="flex" alignItems="center">
                    <NetworkCheck sx={{ mr: 1, color: '#9c27b0' }} />
                    <Typography variant="h6">Network Traffic</Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Chip size="small" label="Incoming" sx={{ bgcolor: '#9c27b020', color: '#9c27b0' }} />
                    <Chip size="small" label="Outgoing" sx={{ bgcolor: '#4caf5020', color: '#4caf50' }} />
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={networkData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="hour" stroke="#888" />
                    <YAxis stroke="#888" />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="incoming" fill="#9c27b0" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="outgoing" fill="#4caf50" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* System Alerts */}
          <Grid item xs={12} lg={6}>
            <Paper className="chart-paper">
              <Box p={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box display="flex" alignItems="center">
                    <Warning sx={{ mr: 1, color: '#ff9800' }} />
                    <Typography variant="h6">System Alerts</Typography>
                  </Box>
                  <Chip label={`${alerts.length} Active`} color="warning" size="small" />
                </Box>
                <List sx={{ maxHeight: 250, overflow: 'auto' }}>
                  {alerts.map((alert) => (
                    <React.Fragment key={alert.id}>
                      <ListItem
                        sx={{
                          borderLeft: `4px solid ${
                            alert.type === 'critical' ? '#f44336' :
                            alert.type === 'warning' ? '#ff9800' : '#2196f3'
                          }`,
                          mb: 1,
                          bgcolor: 'rgba(0,0,0,0.02)',
                          borderRadius: 1
                        }}
                      >
                        <ListItemIcon>
                          {alert.type === 'critical' ? <ErrorIcon color="error" /> :
                           alert.type === 'warning' ? <Warning color="warning" /> :
                           <CheckCircle color="info" />}
                        </ListItemIcon>
                        <ListItemText
                          primary={alert.message}
                          secondary={alert.time}
                          primaryTypographyProps={{
                            fontSize: '0.9rem',
                            fontWeight: alert.type === 'critical' ? 'bold' : 'normal'
                          }}
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>

          {/* Server Status Grid */}
          <Grid item xs={12}>
            <Paper className="chart-paper">
              <Box p={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box display="flex" alignItems="center">
                    <Computer sx={{ mr: 1, color: '#2196f3' }} />
                    <Typography variant="h6">Server Status</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip 
                      icon={<CheckCircle />} 
                      label="4 Online" 
                      size="small" 
                      sx={{ bgcolor: '#4caf5020', color: '#4caf50' }}
                    />
                    <Chip 
                      icon={<Warning />} 
                      label="1 Warning" 
                      size="small"
                      sx={{ bgcolor: '#ff980020', color: '#ff9800' }}
                    />
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="1 Error" 
                      size="small"
                      sx={{ bgcolor: '#f4433620', color: '#f44336' }}
                    />
                  </Box>
                </Box>
                <Grid container spacing={3}>
                  {serverStatusData.map((server) => (
                    <Grid item xs={12} sm={6} md={4} lg={2} key={server.id}>
                      <ServerStatus server={server} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12}>
            <Paper className="chart-paper">
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  <Web sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Recent Activity
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Event</TableCell>
                        <TableCell>Server</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[
                        { time: '10:23:45', event: 'User Authentication', server: 'Web-01', status: 'Success', details: 'User: admin' },
                        { time: '10:23:42', event: 'Database Query', server: 'DB-01', status: 'Slow', details: 'Query time: 2.4s' },
                        { time: '10:23:40', event: 'File Upload', server: 'File-01', status: 'Success', details: 'Size: 45MB' },
                        { time: '10:23:35', event: 'API Request', server: 'API Gateway', status: 'Failed', details: 'Error 500' },
                        { time: '10:23:30', event: 'Backup Started', server: 'Backup-01', status: 'In Progress', details: 'ETA: 15min' }
                      ].map((row, index) => (
                        <TableRow key={index} hover>
                          <TableCell>{row.time}</TableCell>
                          <TableCell>{row.event}</TableCell>
                          <TableCell>{row.server}</TableCell>
                          <TableCell>
                            <Chip 
                              label={row.status}
                              size="small"
                              sx={{
                                bgcolor: row.status === 'Success' ? '#4caf5020' :
                                         row.status === 'Failed' ? '#f4433620' :
                                         row.status === 'Slow' ? '#ff980020' : '#2196f320',
                                color: row.status === 'Success' ? '#4caf50' :
                                       row.status === 'Failed' ? '#f44336' :
                                       row.status === 'Slow' ? '#ff9800' : '#2196f3'
                              }}
                            />
                          </TableCell>
                          <TableCell>{row.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            InsightUI Dashboard v1.0.0 • Last updated: {new Date().toLocaleTimeString()} • 
            <Chip 
              icon={<CheckCircle />} 
              label="All Systems Operational" 
              size="small" 
              color="success"
              variant="outlined"
              sx={{ ml: 1 }}
            />
          </Typography>
          <Button 
            component={Link} 
            to="/" 
            variant="text" 
            size="small" 
            sx={{ mt: 1 }}
          >
            Back to Landing Page
          </Button>
        </Box>
      </Container>

      {/* Floating Action Buttons */}
      <Fab 
        color="primary" 
        aria-label="refresh" 
        className="fab-refresh"
        onClick={() => window.location.reload()}
      >
        <Refresh />
      </Fab>
      
      <Fab 
        color="secondary" 
        aria-label="help" 
        className="fab-help"
        href="https://github.com"
        target="_blank"
      >
        <Help />
      </Fab>
    </div>
  );
};

export default Dashboard;