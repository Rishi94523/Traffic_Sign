# Quick Vercel Deployment Script for Windows PowerShell
# This script helps deploy the Traffic Sign Recognition app to Vercel

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Traffic Sign Recognition - Vercel Deploy" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "[ERROR] Vercel CLI is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install it first:" -ForegroundColor Yellow
    Write-Host "  npm install -g vercel" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[INFO] Vercel CLI detected." -ForegroundColor Green
Write-Host ""

# Show options
Write-Host "Select deployment type:" -ForegroundColor Yellow
Write-Host "  1. Preview Deployment (Test)"
Write-Host "  2. Production Deployment"
Write-Host "  3. View Logs"
Write-Host "  4. Set Environment Variables"
Write-Host "  5. Exit"
Write-Host ""

$choice = Read-Host "Enter choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "[INFO] Starting Preview Deployment..." -ForegroundColor Cyan
        Write-Host ""
        vercel
        Write-Host ""
        Write-Host "[SUCCESS] Preview deployment complete!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Test your preview deployment URL"
        Write-Host "2. Check /api/health endpoint"
        Write-Host "3. Try uploading an image"
        Write-Host ""
    }
    "2" {
        Write-Host ""
        Write-Host "[WARNING] This will deploy to PRODUCTION!" -ForegroundColor Yellow
        $confirm = Read-Host "Are you sure? (y/n)"
        if ($confirm -eq "y" -or $confirm -eq "Y") {
            Write-Host ""
            Write-Host "[INFO] Starting Production Deployment..." -ForegroundColor Cyan
            Write-Host ""
            vercel --prod
            Write-Host ""
            Write-Host "[SUCCESS] Production deployment complete!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Your app is now live!" -ForegroundColor Green
            Write-Host ""
        } else {
            Write-Host ""
            Write-Host "[INFO] Production deployment cancelled." -ForegroundColor Yellow
            Write-Host ""
        }
    }
    "3" {
        Write-Host ""
        Write-Host "Enter deployment URL (or press Enter to view latest):" -ForegroundColor Yellow
        $url = Read-Host
        Write-Host ""
        if ($url) {
            vercel logs $url
        } else {
            vercel logs
        }
    }
    "4" {
        Write-Host ""
        Write-Host "Setting GEMINI_API environment variable..." -ForegroundColor Cyan
        Write-Host ""
        vercel env add GEMINI_API
        Write-Host ""
        Write-Host "[INFO] Don't forget to redeploy after adding env vars!" -ForegroundColor Yellow
        Write-Host ""
    }
    "5" {
        Write-Host ""
        Write-Host "[INFO] Exiting..." -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host ""
        Write-Host "[ERROR] Invalid choice!" -ForegroundColor Red
        Write-Host ""
    }
}

Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Yellow
Write-Host "  vercel logs [url]  - View deployment logs"
Write-Host "  vercel ls          - List all deployments"
Write-Host "  vercel env ls      - List environment variables"
Write-Host "  vercel domains add - Add custom domain"
Write-Host ""

Read-Host "Press Enter to exit"

