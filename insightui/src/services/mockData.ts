// src/services/mockData.ts
export const generateMockServers = () => {
  return [
    {
      id: 1,
      name: 'Web Server 01',
      ip: '192.168.1.101',
      status: 'online',
      cpu: 45,
      memory: 67,
      disk: 40,
      latency: 12,
      lastUpdate: new Date().toISOString()
    },
    // ... mais servidores
  ];
};

export const generateHistoricalData = (hours = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now);
    timestamp.setHours(now.getHours() - i);
    
    data.push({
      timestamp: timestamp.toISOString(),
      cpu: 30 + Math.random() * 50,
      memory: 40 + Math.random() * 40,
      requests: Math.floor(Math.random() * 10000),
      errors: Math.floor(Math.random() * 50)
    });
  }
  
  return data;
};