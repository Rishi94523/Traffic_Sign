# Windows Setup Instructions

## Problem: 'uvicorn' is not recognized

This error occurs when the virtual environment is not activated or dependencies are not installed.

## Solution: Follow these steps

### Step 1: Open Command Prompt or PowerShell
- Press `Win + R`, type `cmd` and press Enter
- Or search for "Command Prompt" in Start Menu

### Step 2: Navigate to the backend folder
```cmd
cd C:\Users\Rhrishi\Sem5\Software Engineering\project\code\PESU_RR_AIML_D_P43_Traffic_Sign_Recognition_Demo_chicken-gang\backend
```

### Step 3: Activate the virtual environment
```cmd
venv\Scripts\activate
```

**You should see `(venv)` at the beginning of your command prompt after activation.**

### Step 4: Install dependencies (if not already installed)
```cmd
pip install -r requirements.txt
```

This will install uvicorn and all other required packages.

### Step 5: Start the server
```cmd
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

## Alternative: Use the startup script

**Option 1: Double-click the file**
- Navigate to the `backend` folder in Windows Explorer
- Double-click `start_backend.bat`

**Option 2: Run from Command Prompt**
```cmd
cd backend
start_backend.bat
```

## Troubleshooting

### If virtual environment doesn't exist:
```cmd
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### If you get "Python is not recognized":
- Make sure Python is installed and added to PATH
- Download Python from https://www.python.org/downloads/
- During installation, check "Add Python to PATH"

### If you get permission errors:
- Run Command Prompt as Administrator
- Right-click Command Prompt → "Run as administrator"

## Verify Installation

After activating the virtual environment, verify uvicorn is installed:
```cmd
pip list
```

You should see `uvicorn` in the list.

## Complete Setup Sequence

```cmd
# 1. Navigate to backend
cd "C:\Users\Rhrishi\Sem5\Software Engineering\project\code\PESU_RR_AIML_D_P43_Traffic_Sign_Recognition_Demo_chicken-gang\backend"

# 2. Activate virtual environment
venv\Scripts\activate

# 3. Install/update dependencies
pip install -r requirements.txt

# 4. Start server
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

## Success Indicators

When the server starts successfully, you should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

Then open your browser and go to: http://localhost:8000/health

