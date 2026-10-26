@echo off
chcp 65001 >nul
cd /d "%~dp0"

where git >nul 2>&1
if errorlevel 1 (
  echo 找不到 git。請先安裝 Git for Windows：https://git-scm.com/download/win
  pause
  exit /b 1
)

git config --global user.name "idsfc14th"
git config --global user.email "IDSFC14th@gmail.com"

if not exist "IDSFC\.git" (
  echo 第一次設置，正在下載專案...
  if exist "IDSFC\" rmdir "IDSFC" 2>nul
  git clone https://github.com/idsfc14th/IDSFC.git IDSFC
  if errorlevel 1 (
    echo 下載失敗。請確認可以連上 GitHub。
    pause
    exit /b 1
  )
)

cd /d "IDSFC"
echo 正在拉下最新程式...
git pull origin main
if errorlevel 1 (
  echo 拉下失敗。
  pause
  exit /b 1
)

echo.
echo 已進入資料夾：
echo %cd%
echo.
echo user.name：
git config --global user.name
echo user.email：
git config --global user.email
echo.
pause
