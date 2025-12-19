// src/components/Notifications/ToastNotification.tsx
import React, { useEffect, useState } from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  IconButton,
  Collapse,
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  Close,
  ExpandMore,
  ExpandLess,
  Notifications,
} from '@mui/icons-material';
import { notificationService, Notification } from '../../services/NotificationService';

const ToastNotification: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleNewNotification = (notification: Notification) => {
      setCurrentNotification(notification);
      setOpen(true);
      setExpanded(false);
    };

    notificationService.on('notification:new', handleNewNotification);
    return () => {
      notificationService.off('notification:new', handleNewNotification);
    };
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleAction = () => {
    if (currentNotification?.action) {
      currentNotification.action.onClick();
      setOpen(false);
    }
  };

  const getSeverity = (type: NotificationType) => {
    switch (type) {
      case 'critical': return 'error';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'success': return 'success';
      default: return 'info';
    }
  };

  if (!currentNotification) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={currentNotification.type === 'critical' ? null : 6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{
        '& .MuiAlert-root': {
          maxWidth: 450,
          minWidth: 350,
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        },
      }}
    >
      <Alert
        severity={getSeverity(currentNotification.type)}
        variant="filled"
        icon={false}
        onClose={handleClose}
        sx={{
          '& .MuiAlert-message': { width: '100%' },
          '& .MuiAlert-action': { paddingTop: 0 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Notifications sx={{ mt: 0.5, mr: 2 }} />
          <Box sx={{ flex: 1 }}>
            <AlertTitle sx={{ mb: 1 }}>
              {currentNotification.title}
              <Typography
                variant="caption"
                sx={{ ml: 1, opacity: 0.8 }}
              >
                {new Date(currentNotification.timestamp).toLocaleTimeString()}
              </Typography>
            </AlertTitle>
            
            <Typography variant="body2" sx={{ mb: expanded ? 2 : 0 }}>
              {currentNotification.message}
            </Typography>

            <Collapse in={expanded}>
              {currentNotification.metadata && (
                <Box
                  sx={{
                    mt: 2,
                    p: 1.5,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                  }}
                >
                  <pre style={{ margin: 0 }}>
                    {JSON.stringify(currentNotification.metadata, null, 2)}
                  </pre>
                </Box>
              )}
            </Collapse>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Box>
                {currentNotification.metadata && (
                  <Button
                    size="small"
                    onClick={() => setExpanded(!expanded)}
                    sx={{ minWidth: 0, mr: 1 }}
                  >
                    {expanded ? <ExpandLess /> : <ExpandMore />}
                    Detalhes
                  </Button>
                )}
                {currentNotification.action && (
                  <Button
                    size="small"
                    onClick={handleAction}
                    sx={{ minWidth: 0 }}
                  >
                    {currentNotification.action.label}
                  </Button>
                )}
              </Box>
              <IconButton
                size="small"
                onClick={() => notificationService.markAsRead(currentNotification.id)}
                sx={{ color: 'inherit' }}
              >
                Marcar como lida
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Alert>
    </Snackbar>
  );
};