@echo off
title INSIGHTUI Setup - Criando Estrutura do Projeto
color 0A
echo ============================================
echo         INSIGHTUI SETUP SCRIPT
echo ============================================
echo.

REM Verificar se está no diretório correto
if not exist "package.json" (
    echo ERRO: Execute este script na raiz do projeto!
    echo Diretório atual: %cd%
    pause
    exit /b 1
)

echo [1/8] Verificando estrutura de pastas...
if not exist "src" mkdir src
if not exist "public" mkdir public
if not exist "backend" mkdir backend

echo [2/8] Criando arquivos essenciais do React...

REM Criar src/index.tsx
echo import React from 'react';
echo import ReactDOM from 'react-dom/client';
echo import './index.css';
echo import App from './App';
echo.
echo const root = ReactDOM.createRoot(
echo   document.getElementById('root') as HTMLElement
echo );
echo root.render(
echo   ^<React.StrictMode^>
echo     ^<App /^>
echo   ^</React.StrictMode^>
echo );
) > src\index.tsx
echo ✓ Criado src/index.tsx

REM Criar src/App.tsx
echo import React from 'react';
echo import './App.css';
echo.
echo function App() {
echo   return (
echo     ^<div className="App"^>
echo       ^<header className="App-header"^>
echo         ^<h1^>🚀 INSIGHT UI Dashboard^</h1^>
echo         ^<p^>Sistema de Monitoramento IT em Tempo Real^</p^>
echo       ^</header^>
echo       ^<main^>
echo         ^<div className="dashboard-preview"^>
echo           ^<div className="metric-card"^>
echo             ^<h3^>CPU Usage^</h3^>
echo             ^<div className="value"^>45%%^</div^>
echo             ^<div className="progress-bar"^>
echo               ^<div className="progress" style={{width: '45%%'}}^>^</div^>
echo             ^</div^>
echo           ^</div^>
echo           ^<div className="metric-card"^>
echo             ^<h3^>Memory^</h3^>
echo             ^<div className="value"^>67%%^</div^>
echo             ^<div className="progress-bar"^>
echo               ^<div className="progress" style={{width: '67%%'}}^>^</div^>
echo             ^</div^>
echo           ^</div^>
echo           ^<div className="metric-card"^>
echo             ^<h3^>Servers Online^</h3^>
echo             ^<div className="value"^>8/10^</div^>
echo             ^<div className="status online"^>Operational^</div^>
echo           ^</div^>
echo         ^</div^>
echo         ^<button onClick={() => alert('Sistema funcionando!')} className="test-button"^>
echo           Testar Sistema
echo         ^</button^>
echo         ^<p className="hint"^>Backend: http://localhost:4000^</p^>
echo       ^</main^>
echo     ^</div^>
echo   );
echo }
echo.
echo export default App;
) > src\App.tsx
echo ✓ Criado src/App.tsx

REM Criar src/App.css
echo /* Main App Styles */
echo .App {
echo   text-align: center;
echo   min-height: 100vh;
echo   background: linear-gradient(135deg, #0f2027 0%%, #203a43 50%%, #2c5364 100%%);
echo   color: white;
echo   padding: 20px;
echo   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
echo }
echo.
echo .App-header {
echo   padding: 40px 20px;
echo   margin-bottom: 40px;
echo }
echo.
echo .App-header h1 {
echo   font-size: 2.8rem;
echo   margin-bottom: 10px;
echo   background: linear-gradient(45deg, #00dbde, #fc00ff);
echo   -webkit-background-clip: text;
echo   -webkit-text-fill-color: transparent;
echo   background-clip: text;
echo }
echo.
echo .App-header p {
echo   font-size: 1.2rem;
echo   opacity: 0.8;
echo   max-width: 600px;
echo   margin: 0 auto;
echo }
echo.
echo main {
echo   max-width: 1200px;
echo   margin: 0 auto;
echo   padding: 20px;
echo }
echo.
echo .dashboard-preview {
echo   display: grid;
echo   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
echo   gap: 25px;
echo   margin-bottom: 40px;
echo }
echo.
echo .metric-card {
echo   background: rgba(255, 255, 255, 0.08);
echo   backdrop-filter: blur(10px);
echo   border-radius: 15px;
echo   padding: 25px;
echo   border: 1px solid rgba(255, 255, 255, 0.1);
echo   transition: transform 0.3s, box-shadow 0.3s;
echo }
echo.
echo .metric-card:hover {
echo   transform: translateY(-5px);
echo   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
echo   background: rgba(255, 255, 255, 0.12);
echo }
echo.
echo .metric-card h3 {
echo   margin-top: 0;
echo   color: #a0a0ff;
echo   font-size: 1.2rem;
echo }
echo.
echo .value {
echo   font-size: 2.5rem;
echo   font-weight: bold;
echo   margin: 15px 0;
echo }
echo.
echo .progress-bar {
echo   height: 8px;
echo   background: rgba(255, 255, 255, 0.1);
echo   border-radius: 4px;
echo   overflow: hidden;
echo   margin-top: 15px;
echo }
echo.
echo .progress {
echo   height: 100%%;
echo   background: linear-gradient(90deg, #00dbde, #0093E9);
echo   border-radius: 4px;
echo   transition: width 0.5s ease;
echo }
echo.
echo .status {
echo   display: inline-block;
echo   padding: 5px 15px;
echo   border-radius: 20px;
echo   font-size: 0.9rem;
echo   font-weight: bold;
echo   margin-top: 10px;
echo }
echo.
echo .status.online {
echo   background: rgba(46, 204, 113, 0.2);
echo   color: #2ecc71;
echo   border: 1px solid #2ecc71;
echo }
echo.
echo .test-button {
echo   background: linear-gradient(45deg, #00dbde, #fc00ff);
echo   color: white;
echo   border: none;
echo   padding: 15px 30px;
echo   border-radius: 50px;
echo   font-size: 1.1rem;
echo   font-weight: bold;
echo   cursor: pointer;
echo   margin: 20px 0;
echo   transition: transform 0.2s, box-shadow 0.2s;
echo }
echo.
echo .test-button:hover {
echo   transform: scale(1.05);
echo   box-shadow: 0 5px 20px rgba(252, 0, 255, 0.3);
echo }
echo.
echo .hint {
echo   color: rgba(255, 255, 255, 0.5);
echo   font-size: 0.9rem;
echo   margin-top: 30px;
echo }
) > src\App.css
echo ✓ Criado src/App.css

REM Criar src/index.css
echo /* Global Styles */
echo * {
echo   box-sizing: border-box;
echo }
echo.
echo body {
echo   margin: 0;
echo   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
echo     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
echo     sans-serif;
echo   -webkit-font-smoothing: antialiased;
echo   -moz-osx-font-smoothing: grayscale;
echo   overflow-x: hidden;
echo }
echo.
echo code {
echo   font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
echo     monospace;
echo }
echo.
echo ::selection {
echo   background: rgba(0, 219, 222, 0.3);
echo   color: white;
echo }
) > src\index.css
echo ✓ Criado src/index.css

REM Criar src/react-app-env.d.ts
echo /// ^<reference types="react-scripts" /^>
) > src\react-app-env.d.ts
echo ✓ Criado src/react-app-env.d.ts

REM Criar src/reportWebVitals.ts
echo import { ReportHandler } from 'web-vitals';
echo.
echo const reportWebVitals = (onPerfEntry?: ReportHandler) => {
echo   if (onPerfEntry &&^& onPerfEntry instanceof Function) {
echo     import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
echo       getCLS(onPerfEntry);
echo       getFID(onPerfEntry);
echo       getFCP(onPerfEntry);
echo       getLCP(onPerfEntry);
echo       getTTFB(onPerfEntry);
echo     });
echo   }
echo };
echo.
echo export default reportWebVitals;
) > src\reportWebVitals.ts
echo ✓ Criado src/reportWebVitals.ts

echo [3/8] Criando public/index.html...
if not exist "public\index.html" (
echo ^<!DOCTYPE html^>
echo ^<html lang="pt-br"^>
echo ^<head^>
echo   ^<meta charset="utf-8" /^>
echo   ^<link rel="icon" href="%%PUBLIC_URL%%/favicon.ico" /^>
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1" /^>
echo   ^<meta name="theme-color" content="#000000" /^>
echo   ^<meta name="description" content="Dashboard de Monitoramento IT" /^>
echo   ^<title^>INSIGHT UI - Dashboard de Monitoramento^</title^>
echo ^</head^>
echo ^<body^>
echo   ^<noscript^>Você precisa habilitar JavaScript para usar este aplicativo.^</noscript^>
echo   ^<div id="root"^>^</div^>
echo ^</body^>
echo ^</html^>
) > public\index.html
echo ✓ Criado public/index.html

echo [4/8] Criando arquivos do backend...
if not exist "backend\server.js" (
echo const express = require('express');
echo const http = require('http');
echo const socketIo = require('socket.io');
echo const cors = require('cors');
echo.
echo const app = express();
echo app.use(cors());
echo.
echo // Middleware
echo app.use(express.json());
echo.
echo // Rota de saúde da API
echo app.get('/api/health', (req, res) => {
echo   res.json({
echo     status: 'OK',
echo     service: 'INSIGHT UI Backend',
echo     timestamp: new Date().toISOString(),
echo     version: '1.0.0'
echo   });
echo });
echo.
echo // Simulação de dados do servidor
echo app.get('/api/servers', (req, res) => {
echo   const servers = [
echo     { id: 1, name: 'Web-01', ip: '192.168.1.10', status: 'online', cpu: 45, memory: 67 },
echo     { id: 2, name: 'DB-01', ip: '192.168.1.20', status: 'warning', cpu: 85, memory: 90 },
echo     { id: 3, name: 'Cache-01', ip: '192.168.1.30', status: 'online', cpu: 30, memory: 40 },
echo     { id: 4, name: 'LoadBalancer-01', ip: '192.168.1.40', status: 'online', cpu: 25, memory: 60 }
echo   ];
echo   res.json(servers);
echo });
echo.
echo // Dados históricos para gráficos
echo app.get('/api/metrics/history', (req, res) => {
echo   const history = [];
echo   const now = new Date();
echo.
echo   for (let i = 23; i ^>= 0; i--) {
echo     const time = new Date(now);
echo     time.setHours(now.getHours() - i);
echo.
echo     history.push({
echo       time: time.toISOString(),
echo       cpu: 40 + Math.random() * 30,
echo       memory: 50 + Math.random() * 30,
echo       networkIn: Math.random() * 1000,
echo       networkOut: Math.random() * 500
echo     });
echo   }
echo.
echo   res.json(history);
echo });
echo.
echo const server = http.createServer(app);
echo const io = socketIo(server, {
echo   cors: {
echo     origin: "http://localhost:3000",
echo     methods: ["GET", "POST"]
echo   }
echo });
echo.
echo // Simulação de métricas em tempo real
echo const generateMetrics = () => {
echo   return {
echo     timestamp: new Date().toISOString(),
echo     cpu: Math.random() * 100,
echo     memory: 30 + Math.random() * 50,
echo     disk: 20 + Math.random() * 40,
echo     networkIn: Math.random() * 1000,
echo     networkOut: Math.random() * 500,
echo     activeConnections: Math.floor(Math.random() * 1000)
echo   };
echo };
echo.
echo io.on('connection', (socket) => {
echo   console.log('✅ Novo cliente conectado ao WebSocket');
echo.
echo   // Enviar métricas a cada 2 segundos
echo   const interval = setInterval(() => {
echo     socket.emit('metrics', generateMetrics());
echo.
echo     // Simular alertas ocasionais
echo     if (Math.random() ^< 0.1) {
echo       const alerts = [
echo         'Alta utilização de CPU detectada',
echo         'Memória chegando ao limite',
echo         'Latência aumentando na rede',
echo         'Novo usuário conectado',
echo         'Backup automático concluído'
echo       ];
echo       const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
echo.
echo       socket.emit('alert', {
echo         id: Date.now(),
echo         type: Math.random() ^< 0.3 ? 'critical' : 'warning',
echo         message: randomAlert,
echo         server: 'Web-01',
echo         timestamp: new Date().toISOString()
echo       });
echo     }
echo   }, 2000);
echo.
echo   socket.on('disconnect', () => {
echo     clearInterval(interval);
echo     console.log('❌ Cliente desconectado');
echo   });
echo });
echo.
echo const PORT = 4000;
echo server.listen(PORT, () => {
echo   console.log('===================================');
echo   console.log('🚀 BACKEND INSIGHT UI INICIADO');
echo   console.log('📡 Porta: ' + PORT);
echo   console.log('🌐 URL: http://localhost:' + PORT);
echo   console.log('📊 API Health: http://localhost:' + PORT + '/api/health');
echo   console.log('===================================');
echo });
) > backend\server.js
echo ✓ Criado backend/server.js

if not exist "backend\package.json" (
echo {
echo   "name": "insightui-backend",
echo   "version": "1.0.0",
echo   "description": "Backend para o Dashboard INSIGHT UI",
echo   "main": "server.js",
echo   "scripts": {
echo     "start": "node server.js",
echo     "dev": "nodemon server.js"
echo   },
echo   "dependencies": {
echo     "express": "^4.18.2",
echo     "socket.io": "^4.7.0",
echo     "cors": "^2.8.5"
echo   },
echo   "devDependencies": {
echo     "nodemon": "^3.0.1"
echo   }
echo }
) > backend\package.json
echo ✓ Criado backend/package.json

echo [5/8] Verificando package.json principal...
if not exist "package.json" (
echo {
echo   "name": "insightui",
echo   "version": "1.0.0",
echo   "private": true,
echo   "dependencies": {
echo     "@testing-library/jest-dom": "^5.17.0",
echo     "@testing-library/react": "^13.4.0",
echo     "@testing-library/user-event": "^13.5.0",
echo     "@types/jest": "^27.5.2",
echo     "@types/node": "^16.18.63",
echo     "@types/react": "^18.2.37",
echo     "@types/react-dom": "^18.2.15",
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0",
echo     "react-scripts": "5.0.1",
echo     "typescript": "^4.9.5",
echo     "web-vitals": "^2.1.4"
echo   },
echo   "scripts": {
echo     "start": "react-scripts start",
echo     "build": "react-scripts build",
echo     "test": "react-scripts test",
echo     "eject": "react-scripts eject"
echo   },
echo   "proxy": "http://localhost:4000",
echo   "eslintConfig": {
echo     "extends": [
echo       "react-app",
echo       "react-app/jest"
echo     ]
echo   },
echo   "browserslist": {
echo     "production": [
echo       ">0.2%%",
echo       "not dead",
echo       "not op_mini all"
echo     ],
echo     "development": [
echo       "last 1 chrome version",
echo       "last 1 firefox version",
echo       "last 1 safari version"
echo     ]
echo   }
echo }
) > package.json
echo ✓ Verificado package.json

echo [6/8] Criando README.md...
echo # INSIGHT UI - Dashboard de Monitoramento IT
echo.
echo ## 🚀 Sobre o Projeto
echo Dashboard administrativo para monitoramento de sistemas em tempo real.
echo.
echo ## 📁 Estrutura do Projeto
echo.
echo ├── backend/           # API Node.js + WebSocket
echo ├── public/           # Arquivos estáticos
echo ├── src/             # Código fonte React/TypeScript
echo ├── package.json     # Dependências frontend
echo └── setup.bat        # Script de configuração
echo.
echo ## ⚡ Início Rápido
echo.
echo ### 1. Instalar dependências
echo ```bash
echo # Frontend
echo npm install
echo.
echo # Backend
echo cd backend
echo npm install
echo cd ..
echo ```
echo.
echo ### 2. Iniciar servidores
echo ```bash
echo # Terminal 1 - Backend
echo cd backend
echo npm start
echo.
echo # Terminal 2 - Frontend
echo npm start
echo ```
echo.
echo ### 3. Acessar
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:4000/api/health
echo.
echo ## 🛠️ Tecnologias
echo - **Frontend**: React 18, TypeScript, Material-UI
echo - **Backend**: Node.js, Express, Socket.io
echo - **Gráficos**: Recharts
echo - **Estilo**: CSS Modules, Styled Components
echo.
echo ## 📊 Funcionalidades
echo - [x] Monitoramento em tempo real
echo - [x] Gráficos interativos
echo - [x] Sistema de alertas
echo - [x] WebSocket para dados ao vivo
echo - [ ] Dark/Light mode
echo - [ ] Exportação de relatórios
echo - [ ] Responsividade mobile
echo.
echo ## 🤝 Contribuição
echo 1. Fork o projeto
echo 2. Crie sua branch: `git checkout -b feature/nova-funcionalidade`
echo 3. Commit: `git commit -m 'Add nova funcionalidade'`
echo 4. Push: `git push origin feature/nova-funcionalidade`
echo 5. Abra um Pull Request
echo.
echo ## 📝 Licença
echo Este projeto está sob a licença MIT.
) > README.md
echo ✓ Criado README.md

echo [7/8] Criando .gitignore...
if not exist ".gitignore" (
echo # Dependências
echo /node_modules
echo /.pnp
echo .pnp.js
echo.
echo # Testing
echo /coverage
echo.
echo # Production
echo /build
echo /dist
echo.
echo # Misc
echo .DS_Store
echo .env.local
echo .env.development.local
echo .env.test.local
echo .env.production.local
echo.
echo npm-debug.log*
echo yarn-debug.log*
echo yarn-error.log*
echo.
echo # IDE
echo .vscode
echo .idea
echo *.suo
echo *.ntvs*
echo *.njsproj
echo *.sln
echo *.sw?
) > .gitignore
echo ✓ Criado .gitignore

echo [8/8] Criando tsconfig.json...
if not exist "tsconfig.json" (
echo {
echo   "compilerOptions": {
echo     "target": "es5",
echo     "lib": [
echo       "dom",
echo       "dom.iterable",
echo       "es6"
echo     ],
echo     "allowJs": true,
echo     "skipLibCheck": true,
echo     "esModuleInterop": true,
echo     "allowSyntheticDefaultImports": true,
echo     "strict": true,
echo     "forceConsistentCasingInFileNames": true,
echo     "noFallthroughCasesInSwitch": true,
echo     "module": "esnext",
echo     "moduleResolution": "node",
echo     "resolveJsonModule": true,
echo     "isolatedModules": true,
echo     "noEmit": true,
echo     "jsx": "react-jsx"
echo   },
echo   "include": [
echo     "src"
echo   ]
echo }
) > tsconfig.json
echo ✓ Criado tsconfig.json

echo.
echo ============================================
echo          SETUP COMPLETADO COM SUCESSO!
echo ============================================
echo.
echo ✅ Estrutura do projeto criada com sucesso!
echo.
echo 📋 PRÓXIMOS PASSOS:
echo.
echo 1. 📂 Abra DUAS janelas do terminal
echo.
echo 2. 🖥️ Terminal 1 - Backend:
echo    cd backend
echo    npm install
echo    npm start
echo.
echo 3. 🌐 Terminal 2 - Frontend:
echo    npm install
echo    npm start
echo.
echo 4. 🔗 Acesse:
echo    - Frontend: http://localhost:3000
echo    - Backend: http://localhost:4000/api/health
echo.
echo ============================================
echo Pressione qualquer tecla para instalar dependências e iniciar...
pause

echo.
echo 📦 Instalando dependências do frontend...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências do frontend!
    pause
    exit /b 1
)

echo.
echo 📦 Instalando dependências do backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências do backend!
    pause
    exit /b 1
)
cd ..

echo.
echo 🚀 Iniciando backend em segundo plano...
start "INSIGHTUI Backend" cmd /k "cd backend && npm start"

echo Aguardando 5 segundos para o backend iniciar...
timeout /t 5 /nobreak >nul

echo.
echo 🌐 Iniciando frontend...
echo ============================================
echo          INSIGHT UI INICIANDO...
echo ============================================
echo.

start "INSIGHTUI Frontend" cmd /k "npm start"

echo.
echo ✅ Tudo configurado! Ambos os servidores estão sendo iniciados.
echo.
echo 📍 Verifique as janelas do terminal que abriram.
echo 📍 Frontend: http://localhost:3000
echo 📍 Backend: http://localhost:4000/api/health
echo.
echo Pressione qualquer tecla para fechar este script...
pause >nul