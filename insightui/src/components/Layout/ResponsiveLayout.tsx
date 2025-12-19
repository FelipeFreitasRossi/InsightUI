// src/components/Layout/ResponsiveLayout.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Fab,
  Zoom,
  SwipeableDrawer,
} from '@mui/material';
import {
  Menu,
  Dashboard,
  Computer,
  Apps,
  Warning,
  Settings,
  Close,
  ChevronLeft,
  ChevronRight,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { useResponsive } from '../../hooks/useResponsive';
import { ThemeToggle } from '../Theme/ThemeToggle';
import { NotificationPanel } from '../Notifications/NotificationPanel';

const drawerWidth = 280;
const collapsedDrawerWidth = 70;

const ResponsiveLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detectar scroll para mostrar botão de voltar ao topo
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, active: true },
    { text: 'Servidores', icon: <Computer /> },
    { text: 'Aplicações', icon: <Apps /> },
    { text: 'Alertas', icon: <Warning /> },
    { text: 'Configurações', icon: <Settings /> },
  ];

  const drawer = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Cabeçalho do Drawer */}
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px !important' }}>
        {!collapsed && (
          <Typography variant="h6" noWrap>
            IT Monitor
          </Typography>
        )}
        <IconButton onClick={handleCollapseToggle}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Toolbar>
      <Divider />

      {/* Menu */}
      <List sx={{ flex: 1, p: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            selected={item.active}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 2 : 3,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '& .MuiListItemIcon-root': {
                  color: 'inherit',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40 }}>
              {item.icon}
            </ListItemIcon>
            {!collapsed && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>

      {/* Footer do Drawer */}
      <Box sx={{ p: 2 }}>
        {!collapsed && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="caption" color="text.secondary">
              v1.0.0 • Online
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${collapsed ? collapsedDrawerWidth : drawerWidth}px)` },
          ml: { sm: collapsed ? `${collapsedDrawerWidth}px` : `${drawerWidth}px` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}
          
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Sistema de Monitoramento
          </Typography>

          {/* Controles */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationPanel />
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para mobile */}
      {isMobile ? (
        <SwipeableDrawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onOpen={() => setMobileOpen(true)}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true, // Melhor performance no mobile
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </SwipeableDrawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: collapsed ? collapsedDrawerWidth : drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: collapsed ? collapsedDrawerWidth : drawerWidth,
              boxSizing: 'border-box',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${collapsed ? collapsedDrawerWidth : drawerWidth}px)` },
          ml: { sm: collapsed ? `${collapsedDrawerWidth}px` : `${drawerWidth}px` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          mt: '64px', // Altura do AppBar
        }}
      >
        {children}

        {/* Botão de voltar ao topo */}
        <Zoom in={showScrollTop}>
          <Fab
            color="primary"
            size="medium"
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <KeyboardArrowUp />
          </Fab>
        </Zoom>
      </Box>
    </Box>
  );
};