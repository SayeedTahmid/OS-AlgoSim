@echo off
REM ============================================================
REM OS Algorithm Simulator - Android App Conversion Script
REM Capacitor Setup - Run this in Command Prompt as Administrator
REM ============================================================

echo.
echo ========== OS Algorithm Simulator - Android Conversion ==========
echo Installing Capacitor and setting up Android project...
echo.

REM Step 1: Install Capacitor CLI globally
echo [1/7] Installing Capacitor CLI globally...
call npm install -g @capacitor/cli
if errorlevel 1 (
    echo ERROR: Failed to install Capacitor CLI
    pause
    exit /b 1
)
echo Done!
echo.

REM Step 2: Navigate to project
echo [2/7] Navigating to project directory...
cd /d "c:\Users\User\Desktop\OS Project"
if errorlevel 1 (
    echo ERROR: Failed to navigate to project directory
    pause
    exit /b 1
)
echo Current directory: %cd%
echo.

REM Step 3: Install Capacitor packages
echo [3/7] Installing Capacitor packages...
call npm install @capacitor/core @capacitor/cli @capacitor/android
if errorlevel 1 (
    echo ERROR: Failed to install Capacitor packages
    echo Try running: npm install @capacitor/core @capacitor/cli @capacitor/android
    pause
    exit /b 1
)
echo Done!
echo.

REM Step 4: Initialize Capacitor
echo [4/7] Initializing Capacitor project...
echo App name: OS Algorithm Simulator
echo App ID: com.osalgorithmsimulator.app
echo Web dir: dist
echo.
call npx cap init
if errorlevel 1 (
    echo ERROR: Failed to initialize Capacitor
    echo Try running: npx cap init
    pause
    exit /b 1
)
echo Done!
echo.

REM Step 5: Build React app
echo [5/7] Building React application...
call npm run build
if errorlevel 1 (
    echo ERROR: Failed to build React app
    echo Try running: npm run build
    pause
    exit /b 1
)
echo Done!
echo.

REM Step 6: Add Android platform
echo [6/7] Adding Android platform to Capacitor...
call npx cap add android
if errorlevel 1 (
    echo ERROR: Failed to add Android platform
    echo Try running: npx cap add android
    pause
    exit /b 1
)
echo Done!
echo.

REM Step 7: Sync web app to Android
echo [7/7] Syncing web app to Android project...
call npx cap sync android
if errorlevel 1 (
    echo ERROR: Failed to sync to Android
    echo Try running: npx cap sync android
    pause
    exit /b 1
)
echo Done!
echo.

echo ========== Setup Complete! ==========
echo.
echo Your Android project has been created successfully!
echo.
echo Next steps:
echo 1. Open Android project:
echo    npx cap open android
echo.
echo 2. In Android Studio, install required SDKs:
echo    - Click Tools > SDK Manager
echo    - Install Android SDK Platform (API 31+)
echo    - Install Android SDK Build-tools
echo.
echo 3. Build APK:
echo    - Click Build > Build Bundle / APK > APK
echo.
echo 4. Test on emulator or physical device
echo.
echo For more info, see CAPACITOR_GUIDE.md
echo.
pause
