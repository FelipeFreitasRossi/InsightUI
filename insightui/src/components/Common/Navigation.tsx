import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Badge,
  InputBase,
  alpha,
  useScrollTrigger,
  Slide,
  Chip,
} from '@mui/material';
import {
  Dashboard,
  Search,
  Notifications,
  AccountCircle,
  ExpandMore,
  Menu as MenuIcon,
  Code,
  GitHub,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface NavigationProps {
  mode?: 'landing' | 'dashboard';
  onThemeToggle?: () => void;
  darkMode?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  mode = 'landing', 
  onThemeToggle, 
  darkMode = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  
  const trigger = useScrollTrigger();

  const isLanding = mode === 'landing';
  const isDashboard = mode === 'dashboard';

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate('/');
  };

  const menuItems = [
    { text: 'Início', path: '/', active: location.pathname === '/' },
    { text: 'Dashboard', path: '/dashboard', active: location.pathname === '/dashboard' },
    { text: 'Recursos', path: '/features' },
    { text: 'Preços', path: '/pricing' },
    { text: 'Documentação', path: '/docs' },
  ];

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar 
        position="sticky" 
        elevation={isLanding ? 0 : 1}
        sx={{
          backgroundColor: isLanding 
            ? 'transparent' 
            : darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
              <Dashboard sx={{ mr: 1, color: '#2196f3' }} />
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  fontWeight: 800,
                  color: 'inherit',
                  textDecoration: 'none',
                  letterSpacing: '-0.5px',
                }}
              >
                InsightUI
              </Typography>
              {isLanding && (
                <Chip
                  label="BETA"
                  size="small"
                  color="primary"
                  sx={{ ml: 1, height: 20, fontSize: '0.65rem' }}
                />
              )}
            </Box>

            {/* Desktop Menu Items */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    mx: 1,
                    color: item.active ? 'primary.main' : 'inherit',
                    fontWeight: item.active ? 600 : 400,
                    position: 'relative',
                    '&::after': item.active ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20px',
                      height: '3px',
                      backgroundColor: 'primary.main',
                      borderRadius: '3px',
                    } : {},
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            {/* Search Bar (Dashboard only) */}
            {isDashboard && (
              <SearchBar>
                <SearchIconWrapper>
                  <Search />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Buscar servidores, métricas..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </SearchBar>
            )}

            {/* Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Theme Toggle */}
              {onThemeToggle && (
                <Tooltip title={`Modo ${darkMode ? 'claro' : 'escuro'}`}>
                  <IconButton onClick={onThemeToggle} color="inherit">
                    {darkMode ? <LightMode /> : <DarkMode />}
                  </IconButton>
                </Tooltip>
              )}

              {/* GitHub Link */}
              {isLanding && (
                <Tooltip title="Ver código no GitHub">
                  <IconButton
                    href="https://github.com"
                    target="_blank"
                    color="inherit"
                  >
                    <GitHub />
                  </IconButton>
                </Tooltip>
              )}

              {/* Notifications (Dashboard only) */}
              {isDashboard && (
                <Tooltip title="Notificações">
                  <IconButton color="inherit">
                    <Badge badgeContent={3} color="error">
                      <Notifications />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              {/* Profile Menu */}
              <Tooltip title="Perfil">
                <IconButton
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  size="small"
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    <AccountCircle />
                  </Avatar>
                  <ExpandMore sx={{ ml: 0.5 }} />
                </IconButton>
              </Tooltip>

              {/* CTA Button */}
              {isLanding && (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/dashboard"
                  startIcon={<Dashboard />}
                  sx={{
                    ml: 2,
                    px: 3,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Acessar Dashboard
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls="mobile-menu"
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleMenuClose}>Meu Perfil</MenuItem>
          <MenuItem onClick={handleMenuClose}>Configurações</MenuItem>
          <MenuItem onClick={handleMenuClose}>Assinatura</MenuItem>
          <MenuItem onClick={handleMenuClose}>Documentação</MenuItem>
          <MenuItem onClick={handleMenuClose}>Suporte</MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            Sair
          </MenuItem>
        </Menu>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleMenuClose}
              selected={item.active}
            >
              {item.text}
            </MenuItem>
          ))}
          <MenuItem onClick={handleMenuClose}>
            <GitHub sx={{ mr: 1 }} />
            GitHub
          </MenuItem>
          {onThemeToggle && (
            <MenuItem onClick={onThemeToggle}>
              {darkMode ? <LightMode sx={{ mr: 1 }} /> : <DarkMode sx={{ mr: 1 }} />}
              Modo {darkMode ? 'Claro' : 'Escuro'}
            </MenuItem>
          )}
        </Menu>
      </AppBar>
    </Slide>
  );
};

export default Navigation;