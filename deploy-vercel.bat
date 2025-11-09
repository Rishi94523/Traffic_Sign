@echo off
REM Quick Vercel Deployment Script for Windows
REM This script helps deploy the Traffic Sign Recognition app to Vercel

echo ============================================
echo   Traffic Sign Recognition - Vercel Deploy
echo ============================================
echo.

REM Check if vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Vercel CLI is not installed!
    echo.
    echo Please install it first:
    echo   npm install -g vercel
    echo.
    pause
    exit /b 1
)

echo [INFO] Vercel CLI detected.
echo.

REM Show options
echo Select deployment type:
echo   1. Preview Deployment (Test)
echo   2. Production Deployment
echo   3. Exit
echo.
set /p choice="Enter choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo [INFO] Starting Preview Deployment...
    echo.
    vercel
    echo.
    echo [SUCCESS] Preview deployment complete!
    echo.
    echo Next steps:
    echo 1. Test your preview deployment URL
    echo 2. Check /api/health endpoint
    echo 3. Try uploading an image
    echo.
) else if "%choice%"=="2" (
    echo.
    echo [WARNING] This will deploy to PRODUCTION!
    set /p confirm="Are you sure? (y/n): "
    if /i "%confirm%"=="y" (
        echo.
        echo [INFO] Starting Production Deployment...
        echo.
        vercel --prod
        echo.
        echo [SUCCESS] Production deployment complete!
        echo.
        echo Your app is now live!
        echo.
    ) else (
        echo.
        echo [INFO] Production deployment cancelled.
        echo.
    )
) else if "%choice%"=="3" (
    echo.
    echo [INFO] Exiting...
    exit /b 0
) else (
    echo.
    echo [ERROR] Invalid choice!
    echo.
)

echo.
echo Useful commands:
echo   vercel logs [url]  - View deployment logs
echo   vercel ls          - List all deployments
echo   vercel env ls      - List environment variables
echo.
pause

