// backend/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Dados mockados de servidores
const servers = [
  { id: 1, name: 'Web-01', ip: '192.168.1.10', status: 'online' },
  { id: 2, name: 'DB-01', ip: '192.168.1.20', status: 'warning' },
  { id: 3, name: 'Cache-01', ip: '192.168.1.30', status: 'online' }
];

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

// Rotas API
app.get('/api/servers', (req, res) => {
  res.json(servers);
});

app.get('/api/metrics/history', (req, res) => {
  // Gerar 24 horas de dados históricos
  const history = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);
    
    history.push({
      time: time.toISOString(),
      cpu: 40 + Math.random() * 30,
      memory: 50 + Math.random() * 30
    });
  }
  
  res.json(history);
});

// WebSocket para dados em tempo real
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');
  
  // Enviar métricas a cada 2 segundos
  const interval = setInterval(() => {
    socket.emit('metrics', generateMetrics());
    
    // Simular alertas ocasionais
    if (Math.random() < 0.1) {
      socket.emit('alert', {
        id: Date.now(),
        type: Math.random() < 0.5 ? 'warning' : 'critical',
        message: 'Alta utilização de CPU detectada',
        server: 'Web-01',
        timestamp: new Date().toISOString()
      });
    }
  }, 2000);
  
  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('Cliente desconectado');
  });
});

server.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});