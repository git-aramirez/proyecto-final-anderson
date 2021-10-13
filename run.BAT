@echo off
start /B npx serve web-build
TIMEOUT /t 15
start http://localhost:5000