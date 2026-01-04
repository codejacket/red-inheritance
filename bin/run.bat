@echo off
echo.
echo run
echo.

%~d0
cd %~dp0

cd ..
npm run dev

pause