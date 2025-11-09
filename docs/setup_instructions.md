# Setup Instructions

Complete guide to set up and run the Road Sign Classification project.

## Prerequisites

### Backend
- Python 3.8 or higher
- pip (Python package manager)

### Frontend
- Node.js 16+ 
- npm or yarn

## Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/pestechnology/PESU_RR_AIML_D_P43_Traffic_Sign_Recognition_Demo_chicken-gang.git
cd PESU_RR_AIML_D_P43_Traffic_Sign_Recognition_Demo_chicken-gang
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file (if needed)
# cp .env.example .env

# Run the server
uvicorn app:app --reload
```

The backend will run on `http://localhost:8000`

**API Documentation:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
# Or with yarn: yarn install

# Create environment file (optional)
# echo "VITE_API_URL=http://localhost:8000" > .env

# Run development server
npm run dev
# Or with yarn: yarn dev
```

The frontend will run on `http://localhost:5173`

## Running Both Services

### Option 1: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn app:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Background Processes

**Backend (background):**
```bash
cd backend
source venv/bin/activate
uvicorn app:app --reload &
```

**Frontend (background):**
```bash
cd frontend
npm run dev &
```

## Verification

1. **Backend Health Check:**
   ```bash
   curl http://localhost:8000/health
   ```
   Should return: `{"status":"ok"}`

2. **Frontend:**
   - Open browser to `http://localhost:5173`
   - You should see the Road Sign Classification interface

## Development Workflow

1. Create a feature branch from `main` or `develop`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Test locally (both backend and frontend)

4. Commit and push
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

5. Create Pull Request on GitHub

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change port in backend/app.py or use:
uvicorn app:app --reload --port 8001
```

**Import errors:**
- Make sure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`

### Frontend Issues

**Port already in use:**
- Vite will automatically try the next available port
- Or change in `vite.config.js`

**API connection errors:**
- Verify backend is running on port 8000
- Check `VITE_API_URL` in `.env` file
- Check CORS settings in `backend/app.py`

### Common Issues

**Module not found errors:**
- Make sure you're in the correct directory
- Check that all dependencies are installed
- Restart your development server

## Project Structure

```
road-sign-classification/
├── backend/          # FastAPI backend
├── frontend/         # React + Vite frontend
├── docs/            # Documentation
└── .github/         # CI/CD workflows
```

## Additional Resources

- [Backend README](../backend/README.md)
- [Frontend README](../frontend/README.md)
- [Sprint Summary](sprint_summary.md)

## Support

For issues or questions, please:
1. Check existing documentation
2. Review Jira tickets for specific feature requirements
3. Contact team members or create an issue on GitHub

