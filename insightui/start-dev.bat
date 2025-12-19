@echo off
title InsightUI - Development Server
color 0A

echo ================================================
echo           INSIGHTUI - DEVELOPMENT
echo ================================================
echo.

REM Verificar se Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado!
    echo Por favor, instale Node.js 16+ primeiro.
    echo Download: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detectado
node --version

echo.
echo [1/4] Iniciando backend...

start "InsightUI Backend" cmd /k "cd backend && npm start"

echo Aguardando backend iniciar...
timeout /t 5 /nobreak >nul

echo.
echo [2/4] Iniciando frontend...

start "InsightUI Frontend" cmd /k "npm start"

echo.
echo [3/4] Abrindo navegador...

timeout /t 3 /nobreak >nul
start http://localhost:3000
start http://localhost:4000/api/health

echo.
echo [4/4] Iniciando monitor de logs...

start "InsightUI Logs" cmd /k "npm run logs"

echo.
echo ================================================
echo          ✅ INSIGHTUI INICIADO!
echo ================================================
echo.
echo 🌐 Frontend: http://localhost:3000
echo 📡 Backend:  http://localhost:4000
echo 📊 API Health: http://localhost:4000/api/health
echo.
echo 📋 Serviços iniciados:
echo    - Frontend React (Porta 3000)
echo    - Backend Node.js (Porta 4000)
echo    - WebSocket Server (Porta 4000)
echo.
echo ⚠️  Mantenha estas janelas abertas
echo.
echo Pressione qualquer tecla para mostrar comandos úteis...
pause >nul

echo.
echo ================================================
echo           COMANDOS ÚTEIS
echo ================================================
echo.
echo 📦 Instalar dependências:
echo    npm install
echo    cd backend && npm install
echo.
echo 🧪 Executar testes:
echo    npm test
echo.
echo 🏗️  Build de produção:
echo    npm run build
echo.
echo 📊 Ver métricas:
echo    npm run analyze
echo.
echo 🔍 Verificar tipos:
echo    npm run type-check
echo.
echo 🧹 Limpar node_modules:
echo    npm run clean
echo.
echo ================================================
echo Pressione qualquer tecla para sair...
pause >nul