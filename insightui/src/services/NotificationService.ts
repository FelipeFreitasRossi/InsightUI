// src/services/NotificationService.ts
import { EventEmitter } from 'events';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'critical';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  metadata?: Record<string, any>;
  expiresAt?: Date;
}

export interface NotificationOptions {
  duration?: number; // Auto-close em ms
  persist?: boolean; // Salvar no localStorage
  priority?: number; // 1-10
}

class NotificationService extends EventEmitter {
  private notifications: Notification[] = [];
  private readonly STORAGE_KEY = 'dashboard_notifications';
  private maxNotifications = 100;

  constructor() {
    super();
    this.loadFromStorage();
  }

  addNotification(
    type: NotificationType,
    title: string,
    message: string,
    options: NotificationOptions = {}
  ): string {
    const id = this.generateId();
    const notification: Notification = {
      id,
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
    };

    // Configurar expiração
    if (options.duration) {
      notification.expiresAt = new Date(Date.now() + options.duration);
    }

    this.notifications.unshift(notification);
    
    // Limitar número de notificações
    if (this.notifications.length > this.maxNotifications) {
      this.notifications = this.notifications.slice(0, this.maxNotifications);
    }

    // Persistir se necessário
    if (options.persist) {
      this.saveToStorage();
    }

    // Emitir evento
    this.emit('notification:new', notification);
    this.emit('notifications:updated', this.notifications);

    // Auto-remover se tiver duração
    if (options.duration) {
      setTimeout(() => {
        this.removeNotification(id);
      }, options.duration);
    }

    return id;
  }

  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.saveToStorage();
    this.emit('notifications:updated', this.notifications);
  }

  markAsRead(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      notification.read = true;
      this.saveToStorage();
      this.emit('notification:read', notification);
      this.emit('notifications:updated', this.notifications);
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => {
      if (!n.read) n.read = true;
    });
    this.saveToStorage();
    this.emit('notifications:updated', this.notifications);
  }

  clearAll(): void {
    this.notifications = [];
    this.saveToStorage();
    this.emit('notifications:updated', this.notifications);
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  // Integração com WebSocket
  setupWebSocketIntegration(socket: WebSocket): void {
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'alert' || data.type === 'notification') {
        this.addNotification(
          this.mapServerAlertToType(data.severity),
          data.title || 'Alerta do Sistema',
          data.message,
          {
            duration: data.duration || 10000,
            persist: true,
          }
        );
      }
    });
  }

  private mapServerAlertToType(severity: string): NotificationType {
    const map: Record<string, NotificationType> = {
      'critical': 'critical',
      'error': 'error',
      'warning': 'warning',
      'info': 'info',
      'success': 'success',
    };
    return map[severity] || 'info';
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(this.notifications.map(n => ({
          ...n,
          timestamp: n.timestamp.toISOString(),
          expiresAt: n.expiresAt?.toISOString(),
        })))
      );
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.notifications = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
          expiresAt: n.expiresAt ? new Date(n.expiresAt) : undefined,
        }));
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }
}

// Singleton
export const notificationService = new NotificationService();