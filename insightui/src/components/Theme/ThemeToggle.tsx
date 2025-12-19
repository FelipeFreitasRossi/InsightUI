// src/components/Theme/ThemeToggle.tsx
import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  SettingsBrightness,
  Computer,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { mode, theme, toggleTheme, setThemeMode } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    setThemeMode(newMode);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Alterar tema">
        <IconButton
          color="inherit"
          onClick={handleClick}
          sx={{
            position: 'relative',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'rotate(15deg)',
            },
          }}
        >
          {mode === 'system' ? (
            <SettingsBrightness />
          ) : mode === 'dark' ? (
            <DarkMode />
          ) : (
            <LightMode />
          )}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: theme === 'dark' ? 'warning.main' : 'primary.main',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(0.8)', opacity: 0.7 },
                '50%': { transform: 'scale(1.1)', opacity: 1 },
                '100%': { transform: 'scale(0.8)', opacity: 0.7 },
              },
            }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={() => handleThemeChange('light')} selected={mode === 'light'}>
          <ListItemIcon>
            <LightMode />
          </ListItemIcon>
          <ListItemText primary="Claro" />
          {mode === 'light' && '✓'}
        </MenuItem>
        
        <MenuItem onClick={() => handleThemeChange('dark')} selected={mode === 'dark'}>
          <ListItemIcon>
            <DarkMode />
          </ListItemIcon>
          <ListItemText primary="Escuro" />
          {mode === 'dark' && '✓'}
        </MenuItem>
        
        <MenuItem onClick={() => handleThemeChange('system')} selected={mode === 'system'}>
          <ListItemIcon>
            <Computer />
          </ListItemIcon>
          <ListItemText primary="Sistema" />
          {mode === 'system' && '✓'}
        </MenuItem>
        
        <Box sx={{ px: 2, py: 1, borderTop: 1, borderColor: 'divider' }}>
          <FormControlLabel
            control={
              <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                color="primary"
              />
            }
            label={`Modo ${theme === 'dark' ? 'Escuro' : 'Claro'}`}
          />
        </Box>
      </Menu>
    </>
  );
};