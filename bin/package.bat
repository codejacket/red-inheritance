@echo off
echo.
echo package
echo.

%~d0
cd %~dp0

cd ..
npm run build

pause