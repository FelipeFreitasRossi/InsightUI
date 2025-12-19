import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  Avatar,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import {
  Dashboard,
  Speed,
  Security,
  Analytics,
  NotificationsActive,
  Timeline,
  Cloud,
  Storage,
  Memory,
  ArrowForward,
  GitHub,
  Twitter,
  LinkedIn,
  Email,
  CheckCircle,
  TrendingUp,
  BarChart,
  People,
  Code
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import '../LandingPage.css';

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Monitoramento em Tempo Real',
      description: 'Acompanhe métricas do sistema instantaneamente com atualizações em tempo real.',
      color: '#2196f3'
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Segurança Avançada',
      description: 'Sistema de alertas e detecção de anomalias para proteger sua infraestrutura.',
      color: '#4caf50'
    },
    {
      icon: <Analytics sx={{ fontSize: 40 }} />,
      title: 'Analytics Poderosos',
      description: 'Gráficos interativos e relatórios detalhados para análise de performance.',
      color: '#ff9800'
    },
    {
      icon: <NotificationsActive sx={{ fontSize: 40 }} />,
      title: 'Sistema de Alertas',
      description: 'Notificações em tempo real para eventos críticos e manutenções.',
      color: '#f44336'
    },
    {
      icon: <Timeline sx={{ fontSize: 40 }} />,
      title: 'Histórico Completo',
      description: 'Armazenamento e visualização de dados históricos para tendências.',
      color: '#9c27b0'
    },
    {
      icon: <Cloud sx={{ fontSize: 40 }} />,
      title: 'Multi-Cloud',
      description: 'Monitoramento unificado para infraestruturas on-premise e cloud.',
      color: '#00bcd4'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime', icon: <TrendingUp /> },
    { value: '1.2K', label: 'Servidores', icon: <Storage /> },
    { value: '45K', label: 'Métricas', icon: <BarChart /> },
    { value: '5.2K', label: 'Usuários', icon: <People /> }
  ];

  const technologies = ['React', 'TypeScript', 'Node.js', 'Socket.io', 'Material-UI', 'Recharts', 'Express', 'WebSocket'];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', pt: 15, pb: 10 }}>
            <Chip 
              label="BETA" 
              color="primary" 
              sx={{ mb: 3, fontSize: '0.9rem', fontWeight: 600 }}
            />
            
            <Typography 
              variant="h1" 
              className="hero-title"
              sx={{ 
                fontSize: isMobile ? '2.5rem' : '4rem',
                mb: 3
              }}
            >
              Monitoramento <span className="gradient-text">Inteligente</span> para sua Infraestrutura
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)', 
                maxWidth: '800px', 
                mx: 'auto',
                mb: 5,
                fontSize: isMobile ? '1.1rem' : '1.5rem'
              }}
            >
              InsightUI é um dashboard de monitoramento em tempo real para infraestruturas IT, 
              com métricas avançadas, alertas inteligentes e visualizações poderosas.
            </Typography>
            
            <Stack 
              direction={isMobile ? "column" : "row"} 
              spacing={3} 
              justifyContent="center"
              sx={{ mb: 10 }}
            >
              <Button
                component={Link}
                to="./Dashboard"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                  borderRadius: '12px',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 20px rgba(33, 150, 243, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Acessar Dashboard
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                startIcon={<GitHub />}
                href="https://github.com/FelipeFreitasRossi/InsightUI"
                target="_blank"
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  borderRadius: '12px',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Ver no GitHub
              </Button>
            </Stack>
            
            {/* Dashboard Preview */}
            <Box 
              className="dashboard-preview"
              sx={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                transform: `perspective(1000px) rotateX(${5 + scrollY * 0.01}deg)`,
                transition: 'transform 0.3s ease'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Dashboard Preview" 
                style={{ width: '100%', display: 'block' }}
              />
              <Box className="preview-overlay" />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 10, backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card className="stat-card">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'rgba(33, 150, 243, 0.1)', 
                        color: '#2196f3',
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 15, backgroundColor: '#0f172a' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ mb: 3, fontSize: isMobile ? '2rem' : '3rem' }}>
              Recursos <span className="gradient-text">Poderosos</span>
            </Typography>
            <Typography variant="h5" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              Tudo que você precisa para monitorar e otimizar sua infraestrutura
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Fade in={true} timeout={index * 200}>
                  <Card className="feature-card">
                    <CardContent>
                      <Avatar 
                        sx={{ 
                          bgcolor: `${feature.color}20`,
                          color: feature.color,
                          width: 70,
                          height: 70,
                          mb: 3
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {feature.description}
                      </Typography>
                      <Box sx={{ mt: 3 }}>
                        <Chip 
                          icon={<CheckCircle />} 
                          label="Disponível" 
                          size="small"
                          sx={{ bgcolor: `${feature.color}20`, color: feature.color }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Tech Stack Section */}
      <Box sx={{ py: 10, backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Construído com as Melhores Tecnologias
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Stack moderna e robusta para performance excepcional
            </Typography>
          </Box>
          
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center" 
            flexWrap="wrap"
            sx={{ gap: 2 }}
          >
            {technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                variant="outlined"
                sx={{
                  px: 3,
                  py: 2,
                  fontSize: '1rem',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    borderColor: '#2196f3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)'
                  }
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 15, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 3 }}>
            Pronto para Começar?
          </Typography>
          <Typography variant="h5" color="textSecondary" sx={{ mb: 6 }}>
            Junte-se a milhares de empresas que confiam no InsightUI para monitoramento
          </Typography>
          
          <Stack direction={isMobile ? "column" : "row"} spacing={3} justifyContent="center">
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              size="large"
              startIcon={<Dashboard />}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.2rem',
                background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                borderRadius: '12px'
              }}
            >
              Experimentar Gratuitamente
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<Code />}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.2rem',
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                borderRadius: '12px'
              }}
            >
              Documentação
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box className="footer" sx={{ py: 6, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <Dashboard sx={{ fontSize: 32, mr: 2, color: '#2196f3' }} />
                <Typography variant="h5" fontWeight="bold">
                  InsightUI
                </Typography>
              </Box>
              <Typography color="textSecondary">
                Dashboard de monitoramento IT em tempo real. 
                Monitoramento inteligente para infraestruturas modernas.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent={isMobile ? "center" : "flex-end"} gap={2}>
                <IconButton href="https://github.com/FelipeFreitasRossi/InsightUI" target="_blank">
                  <GitHub />
                </IconButton>
                <IconButton>
                  <Twitter />
                </IconButton>
                <IconButton>
                  <LinkedIn />
                </IconButton>
                <IconButton>
                  <Email />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} InsightUI. Todos os direitos reservados. 
              Licença MIT. Versão 1.0.0
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default LandingPage;