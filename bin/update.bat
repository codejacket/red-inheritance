@echo off
echo.
echo update
echo.

%~d0
cd %~dp0

cd ..
git add .
git commit -m "update"
git push -f origin main

pause