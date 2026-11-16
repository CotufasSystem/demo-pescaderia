@echo off
title Servidor de Produccion - DEMO Pescaderia
echo ========================================================
echo   INICIANDO DEMO PESCADERIA EN MODO PRODUCCION
echo ========================================================
echo.
cd /d "%~dp0"
if not exist "dist" (
    echo Compilando aplicacion para produccion...
    call npm run build
)
echo Abriendo servidor en http://localhost:5000 ...
npx serve -s dist -l 5000
pause
