// src/services/socket.ts
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4000';

export const useSocket = () => {
  const [socket, setSocket] = useState<any>(null);
  const [latestData, setLatestData] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('metrics', (data) => {
      setLatestData(data);
    });

    newSocket.on('alert', (alert) => {
      setAlerts(prev => [alert, ...prev.slice(0, 9)]); // Mantém apenas os 10 mais recentes
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return { socket, latestData, alerts };
};