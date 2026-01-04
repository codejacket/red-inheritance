@echo off
echo.
echo install
echo.

%~d0
cd %~dp0

cd ..
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install

pause