import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
    };
  }
  interface PaletteOptions {
    gradient?: {
      primary?: string;
      secondary?: string;
      success?: string;
      warning?: string;
      error?: string;
    };
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
    gradient: {
      primary: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
      secondary: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
      success: 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
      warning: 'linear-gradient(45deg, #ed6c02 30%, #ff9800 90%)',
      error: 'linear-gradient(45deg, #d32f2f 30%, #ef5350 90%)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
          },
          '&.MuiButton-containedSecondary': {
            background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
    },
    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#388e3c',
    },
    warning: {
      main: '#ffb74d',
      light: '#ffcc80',
      dark: '#f57c00',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    info: {
      main: '#29b6f6',
      light: '#4fc3f7',
      dark: '#0288d1',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
    },
    gradient: {
      primary: 'linear-gradient(45deg, #90caf9 30%, #42a5f5 90%)',
      secondary: 'linear-gradient(45deg, #ce93d8 30%, #ab47bc 90%)',
      success: 'linear-gradient(45deg, #66bb6a 30%, #388e3c 90%)',
      warning: 'linear-gradient(45deg, #ffb74d 30%, #f57c00 90%)',
      error: 'linear-gradient(45deg, #f44336 30%, #d32f2f 90%)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          },
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(45deg, #90caf9 30%, #42a5f5 90%)',
          },
          '&.MuiButton-containedSecondary': {
            background: 'linear-gradient(45deg, #ce93d8 30%, #ab47bc 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
            background: 'rgba(30, 41, 59, 0.7)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          background: 'rgba(30, 41, 59, 0.9)',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});