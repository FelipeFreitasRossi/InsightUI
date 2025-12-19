const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rotas da API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'InsightUI Backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/servers', (req, res) => {
  const servers = [
    { id: 1, name: 'Web Server 01', ip: '192.168.1.10', status: 'online', cpu: 45, memory: 67, disk: 40, latency: '12ms' },
    { id: 2, name: 'Database 01', status: 'warning', cpu: 85, memory: 90, disk: 60, latency: '5ms' },
    { id: 3, name: 'Cache Server', status: 'online', cpu: 30, memory: 40, disk: 25, latency: '8ms' },
    { id: 4, name: 'Load Balancer', status: 'online', cpu: 25, memory: 60, disk: 35, latency: '3ms' },
    { id: 5, name: 'File Server', status: 'error', cpu: 95, memory: 92, disk: 85, latency: '45ms' },
    { id: 6, name: 'API Gateway', status: 'online', cpu: 40, memory: 55, disk: 30, latency: '15ms' }
  ];
  res.json(servers);
});

app.get('/api/metrics/history', (req, res) => {
  const history = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);
    
    history.push({
      time: time.toISOString(),
      cpu: 40 + Math.random() * 30,
      memory: 50 + Math.random() * 30,
      networkIn: Math.random() * 1000,
      networkOut: Math.random() * 500
    });
  }
  
  res.json(history);
});

// Dados para a landing page
app.get('/api/stats', (req, res) => {
  res.json({
    totalServers: 156,
    uptime: 99.9,
    activeUsers: 1245,
    alerts: 3,
    dataProcessed: '2.4TB'
  });
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Simulação de métricas em tempo real
const generateMetrics = () => {
  return {
    timestamp: new Date().toISOString(),
    cpu: Math.random() * 100,
    memory: 30 + Math.random() * 50,
    disk: 20 + Math.random() * 40,
    networkIn: Math.random() * 1000,
    networkOut: Math.random() * 500,
    activeConnections: Math.floor(Math.random() * 1000)
  };
};

io.on('connection', (socket) => {
  console.log('✅ Cliente conectado ao WebSocket');
  
  // Enviar métricas a cada 2 segundos
  const interval = setInterval(() => {
    socket.emit('metrics', generateMetrics());
    
    // Simular alertas ocasionais
    if (Math.random() < 0.1) {
      const alerts = [
        'CPU usage above 90% on DB-01',
        'High memory usage detected',
        'Network latency increasing',
        'New user connected',
        'Automatic backup completed',
        'Security scan in progress'
      ];
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      
      socket.emit('alert', {
        id: Date.now(),
        type: Math.random() < 0.3 ? 'critical' : 'warning',
        message: randomAlert,
        server: 'Web-01',
        timestamp: new Date().toISOString()
      });
    }
  }, 2000);
  
  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('❌ Cliente desconectado');
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log('===================================');
  console.log('🚀 INSIGHTUI BACKEND INICIADO');
  console.log('📡 Porta: ' + PORT);
  console.log('🌐 URL: http://localhost:' + PORT);
  console.log('📊 API Health: http://localhost:' + PORT + '/api/health');
  console.log('===================================');
});

module.exports = server;