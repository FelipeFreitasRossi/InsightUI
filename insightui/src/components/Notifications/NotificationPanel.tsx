// src/components/Notifications/NotificationPanel.tsx
import React, { useState, useEffect } from 'react';
import {
  Drawer,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Typography,
  Box,
  Button,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Notifications,
  Close,
  CheckCircle,
  Error,
  Warning,
  Info,
  Circle,
  Delete,
  NotificationsOff,
  FilterList,
} from '@mui/icons-material';
import { notificationService, Notification, NotificationType } from '../../services/NotificationService';

export const NotificationPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<NotificationType | 'all' | 'unread'>('all');
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const updateNotifications = () => {
      setNotifications(notificationService.getNotifications());
    };

    updateNotifications();
    notificationService.on('notifications:updated', updateNotifications);
    
    return () => {
      notificationService.off('notifications:updated', updateNotifications);
    };
  }, []);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success': return <CheckCircle color="success" />;
      case 'error': return <Error color="error" />;
      case 'critical': return <Error color="error" />;
      case 'warning': return <Warning color="warning" />;
      default: return <Info color="info" />;
    }
  };

  const getFilteredNotifications = () => {
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === filter);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const handleFilterSelect = (newFilter: NotificationType | 'all' | 'unread') => {
    setFilter(newFilter);
    handleFilterClose();
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => setOpen(true)}
        sx={{ position: 'relative' }}
      >
        <Badge
          badgeContent={notificationService.getUnreadCount()}
          color="error"
          max={99}
        >
          <Notifications />
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 400,
            maxWidth: '90vw',
            bgcolor: 'background.paper',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Notificações
            <Chip
              label={notificationService.getUnreadCount()}
              color="error"
              size="small"
              sx={{ ml: 1 }}
            />
          </Typography>
          <Box>
            <IconButton onClick={handleFilterClick}>
              <FilterList />
            </IconButton>
            <Menu
              anchorEl={filterAnchor}
              open={Boolean(filterAnchor)}
              onClose={handleFilterClose}
            >
              <MenuItem onClick={() => handleFilterSelect('all')}>Todas</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('unread')}>Não lidas</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleFilterSelect('critical')}>Críticas</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('error')}>Erros</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('warning')}>Alertas</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('info')}>Informações</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('success')}>Sucessos</MenuItem>
            </Menu>
            <IconButton onClick={() => notificationService.markAllAsRead()}>
              <CheckCircle />
            </IconButton>
            <IconButton onClick={() => notificationService.clearAll()}>
              <Delete />
            </IconButton>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        <Divider />

        <List sx={{ flex: 1, overflow: 'auto' }}>
          {getFilteredNotifications().length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
              <NotificationsOff sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
              <Typography>Nenhuma notificação</Typography>
            </Box>
          ) : (
            getFilteredNotifications().map((notification) => (
              <ListItem
                key={notification.id}
                sx={{
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                  borderLeft: 4,
                  borderLeftColor: `notification.${notification.type}`,
                }}
                button
                onClick={() => notificationService.markAsRead(notification.id)}
              >
                <ListItemIcon>
                  {notification.read ? (
                    <Circle sx={{ fontSize: 12, opacity: 0.5 }} />
                  ) : (
                    getIcon(notification.type)
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {notification.message}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                      >
                        {new Date(notification.timestamp).toLocaleString()}
                      </Typography>
                    </>
                  }
                  primaryTypographyProps={{
                    fontWeight: notification.read ? 'normal' : 'bold',
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      notificationService.removeNotification(notification.id);
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>

        <Divider />
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            size="small"
            onClick={() => notificationService.markAllAsRead()}
          >
            Marcar todas como lidas
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => notificationService.clearAll()}
          >
            Limpar todas
          </Button>
        </Box>
      </Drawer>
    </>
  );
};