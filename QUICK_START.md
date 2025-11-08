# 🚀 Quick Start Guide

## Prerequisites

- **Python 3.8+** (for backend) - [Download Python](https://www.python.org/downloads/)
- **Node.js 16+** (for frontend) - [Download Node.js](https://nodejs.org/)
- **Git** (if cloning the repository)

## Step-by-Step Setup

### Step 1: Backend Setup

1. **Open a terminal/command prompt and navigate to the backend folder:**
   ```bash
   cd PESU_RR_AIML_D_P43_Traffic_Sign_Recognition_Demo_chicken-gang\backend
   ```

2. **Option A: Use the startup script (Easiest - Windows)**
   ```bash
   start_backend.bat
   ```
   
   **Option B: Manual setup**
   ```bash
   # Activate virtual environment
   venv\Scripts\activate
   
   # Install dependencies (if not already installed)
   pip install -r requirements.txt
   
   # Start the server
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Verify backend is running:**
   - Open your browser and go to: http://localhost:8000/health
   - You should see: `{"status":"ok"}`
   - API Documentation: http://localhost:8000/docs

### Step 2: Frontend Setup (New Terminal)

1. **Open a NEW terminal/command prompt and navigate to the frontend folder:**
   ```bash
   cd PESU_RR_AIML_D_P43_Traffic_Sign_Recognition_Demo_chicken-gang\frontend
   ```

2. **Install dependencies (first time only):**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

4. **The frontend will be available at:**
   - http://localhost:5173

### Step 3: Use the Application

1. **Open your browser and go to:** http://localhost:5173
2. **Upload an image:**
   - Click "Choose File" or drag and drop an image
   - Supported formats: JPG, PNG (max 10MB)
3. **Classify the image:**
   - Click "Classify Image" button
   - Wait for the classification results
   - View the predicted sign name and confidence score

## 🎯 Quick Commands Summary

### Backend (Terminal 1)
```bash
cd backend
venv\Scripts\activate
uvicorn app:app --reload
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install  # First time only
npm run dev
```

## 🔍 Troubleshooting

### Backend won't start?

1. **Check if Python is installed:**
   ```bash
   python --version
   ```

2. **Check if virtual environment exists:**
   ```bash
   cd backend
   dir venv
   ```
   If it doesn't exist, create it:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Check if port 8000 is available:**
   - Make sure no other application is using port 8000
   - You can change the port in `app.py` if needed

### Frontend won't start?

1. **Check if Node.js is installed:**
   ```bash
   node --version
   npm --version
   ```

2. **Clear node_modules and reinstall:**
   ```bash
   cd frontend
   rmdir /s node_modules
   npm install
   ```

3. **Check if port 5173 is available:**
   - Make sure no other application is using port 5173

### Getting "Network Error" or "Cannot connect to backend"?

1. **Make sure the backend is running:**
   - Check Terminal 1 - you should see: `Uvicorn running on http://0.0.0.0:8000`
   - Visit http://localhost:8000/health in your browser

2. **Check the backend URL:**
   - Default: http://localhost:8000
   - If changed, update `VITE_API_URL` in frontend `.env` file

3. **Check CORS settings:**
   - Backend should allow `http://localhost:5173`
   - Check `backend/app.py` for CORS configuration

## 📝 Notes

- **Keep both terminals open** - Backend and Frontend need to run simultaneously
- **Backend must be running first** before using the frontend
- **First time setup** may take a few minutes to install dependencies
- **Virtual environment** should be activated before running backend commands

## 🆘 Still Having Issues?

1. Check the browser console (F12) for error messages
2. Check the backend terminal for error messages
3. Verify all prerequisites are installed correctly
4. Make sure you're in the correct directories when running commands

## 📚 Additional Resources

- Backend API Docs: http://localhost:8000/docs
- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`
- Setup Instructions: `docs/setup_instructions.md`

