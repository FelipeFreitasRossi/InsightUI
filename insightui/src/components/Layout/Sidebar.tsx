import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
  IconButton,
  Collapse,
  Tooltip,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Dashboard,
  Computer,
  Apps,
  Warning,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  ExpandLess,
  Storage,
  Timeline,
  Security,
  Code,
  Cloud,
  BarChart,
  People,
  Notifications,
  AccountCircle,
  ExitToApp,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;
const collapsedDrawerWidth = 70;

interface SidebarProps {
  collapsed?: boolean;
  onCollapseToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onCollapseToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);

  const menuItems = [
    {
      id: 'dashboard',
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/dashboard',
      active: location.pathname === '/dashboard',
    },
    {
      id: 'servers',
      text: 'Servidores',
      icon: <Computer />,
      subItems: [
        { text: 'Todos os Servidores', path: '/servers' },
        { text: 'Grupos', path: '/server-groups' },
        { text: 'Monitoramento', path: '/server-monitoring' },
      ],
    },
    {
      id: 'applications',
      text: 'Aplicações',
      icon: <Apps />,
      subItems: [
        { text: 'Status dos Serviços', path: '/services' },
        { text: 'APIs', path: '/apis' },
        { text: 'Contêineres', path: '/containers' },
      ],
    },
    {
      id: 'infrastructure',
      text: 'Infraestrutura',
      icon: <Cloud />,
      subItems: [
        { text: 'Redes', path: '/networks' },
        { text: 'Armazenamento', path: '/storage' },
        { text: 'Banco de Dados', path: '/databases' },
      ],
    },
    {
      id: 'analytics',
      text: 'Analytics',
      icon: <BarChart />,
      subItems: [
        { text: 'Métricas', path: '/metrics' },
        { text: 'Logs', path: '/logs' },
        { text: 'Relatórios', path: '/reports' },
      ],
    },
    {
      id: 'alerts',
      text: 'Alertas',
      icon: <Warning />,
      path: '/alerts',
      badge: 3,
    },
    {
      id: 'security',
      text: 'Segurança',
      icon: <Security />,
      subItems: [
        { text: 'Auditoria', path: '/audit' },
        { text: 'Compliance', path: '/compliance' },
        { text: 'Firewall', path: '/firewall' },
      ],
    },
    {
      id: 'settings',
      text: 'Configurações',
      icon: <Settings />,
      path: '/settings',
    },
  ];

  const handleToggle = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const drawer = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Header do Sidebar */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '64px',
        }}
      >
        {!collapsed ? (
          <>
            <Box display="flex" alignItems="center">
              <Dashboard sx={{ mr: 1, color: '#2196f3' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                InsightUI
              </Typography>
            </Box>
            <Tooltip title="Recolher menu">
              <IconButton onClick={onCollapseToggle} size="small">
                <ChevronLeft />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <IconButton onClick={onCollapseToggle} size="small">
            <ChevronRight />
          </IconButton>
        )}
      </Box>

      {/* Perfil do Usuário */}
      {!collapsed && (
        <Box
          sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'primary.main',
              mr: 2,
            }}
          >
            <AccountCircle />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Admin User
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Administrador
            </Typography>
          </Box>
        </Box>
      )}

      {/* Menu Principal */}
      <List sx={{ flex: 1, p: 2, overflow: 'auto' }}>
        {menuItems.map((item) => {
          const isExpanded = expandedItems.includes(item.id);
          const isActive = item.active || item.subItems?.some(sub => sub.path === location.pathname);

          return (
            <React.Fragment key={item.id}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => {
                    if (item.path) {
                      handleNavigate(item.path);
                    } else if (item.subItems) {
                      handleToggle(item.id);
                    }
                  }}
                  sx={{
                    borderRadius: 2,
                    bgcolor: isActive ? 'primary.main' : 'transparent',
                    color: isActive ? 'primary.contrastText' : 'inherit',
                    '&:hover': {
                      bgcolor: isActive ? 'primary.dark' : 'rgba(255, 255, 255, 0.1)',
                    },
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    px: collapsed ? 2 : 3,
                    py: 1.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? 0 : 40,
                      color: isActive ? 'inherit' : 'text.secondary',
                    }}
                  >
                    {item.badge ? (
                      <Badge badgeContent={item.badge} color="error">
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                  
                  {!collapsed && (
                    <>
                      <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{
                          fontWeight: isActive ? 600 : 400,
                        }}
                      />
                      {item.subItems && (
                        <Box sx={{ ml: 1 }}>
                          {isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </Box>
                      )}
                    </>
                  )}
                </ListItemButton>
              </ListItem>

              {!collapsed && item.subItems && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItemButton
                        key={subItem.text}
                        onClick={() => handleNavigate(subItem.path)}
                        sx={{
                          pl: 6,
                          py: 1,
                          borderRadius: 2,
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                          },
                        }}
                      >
                        <ListItemText
                          primary={subItem.text}
                          primaryTypographyProps={{
                            fontSize: '0.875rem',
                            color: location.pathname === subItem.path ? 'primary.main' : 'text.secondary',
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>

      {/* Footer do Sidebar */}
      {!collapsed && (
        <>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          <Box sx={{ p: 2 }}>
            <Chip
              label="Sistema Operacional"
              size="small"
              sx={{
                bgcolor: 'rgba(33, 150, 243, 0.1)',
                color: 'primary.main',
                mb: 1,
                width: '100%',
              }}
            />
            <Typography variant="caption" color="textSecondary">
              Última atualização: agora
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedDrawerWidth : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? collapsedDrawerWidth : drawerWidth,
          boxSizing: 'border-box',
          borderRight: 'none',
          overflowX: 'hidden',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;