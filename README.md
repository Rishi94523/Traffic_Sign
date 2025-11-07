# Traffic Sign Recognition Demo

**Project ID:** P43  
**Course:** UE23CS341A  
**Academic Year:** 2025  
**Semester:** 5th Sem  
**Campus:** RR  
**Branch:** AIML  
**Section:** D  
**Team:** chicken gang

## 📋 Project Description

An upload interface for road-sign images that classifies them via a stubbed ML model and displays confidence scores. The project combines file-upload handling, a placeholder inference API, and result visualization.

This repository contains the source code and documentation for the Traffic Sign Recognition Demo project, developed as part of the UE23CS341A course at PES University.

## 🧑‍💻 Development Team (chicken gang)

- [@GroQstar](https://github.com/GroQstar) - Scrum Master
- [@preeeetham](https://github.com/preeeetham) - Developer Team
- [@rhrishi-99](https://github.com/rhrishi-99) - Developer Team
- [@Raihannaeem](https://github.com/Raihannaeem) - Developer Team

## 👨‍🏫 Teaching Assistant

- [@Amrutha-PES](https://github.com/Amrutha-PES)
- [@VenomBlood1207](https://github.com/VenomBlood1207)

## 👨‍⚖️ Faculty Supervisor

- [@Arpitha035](https://github.com/Arpitha035)


## 🚀 Getting Started

### Prerequisites
- Python 3.8+ (for backend)
- Node.js 16+ (for frontend)
- Git

### Quick Start

**See detailed setup instructions in [docs/setup_instructions.md](docs/setup_instructions.md)**

1. Clone the repository
   ```bash
   git clone https://github.com/pestechnology/PESU_RR_AIML_D_P43_Traffic_Sign_Recognition_Demo_chicken-gang.git
   cd PESU_RR_AIML_D_P43_Traffic_Sign_Recognition_Demo_chicken-gang
   ```

2. Set up Backend
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app:app --reload
   ```

3. Set up Frontend (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Access the application
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## 📁 Project Structure

```
road-sign-classification/
├── backend/              # FastAPI backend
│   ├── app.py           # FastAPI entry point
│   ├── routes/          # API route handlers
│   ├── services/        # Business logic
│   ├── tests/           # Test files
│   └── requirements.txt # Python dependencies
├── frontend/            # React + Vite frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   └── api/         # API client
│   ├── public/
│   └── package.json     # Node dependencies
├── docs/                # Documentation
│   ├── setup_instructions.md
│   └── sprint_summary.md
├── .github/
│   └── workflows/       # CI/CD pipelines
└── README.md
```

## 🛠️ Development Guidelines

### Branching Strategy
- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: Feature branches
- `bugfix/*`: Bug fix branches

### Commit Messages
Follow conventional commit format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test-related changes

### Code Review Process
1. Create feature branch from `develop`
2. Make changes and commit
3. Create Pull Request to `develop`
4. Request review from team members
5. Merge after approval

## 📚 Documentation

- [API Documentation](docs/api.md)
- [User Guide](docs/user-guide.md)
- [Developer Guide](docs/developer-guide.md)

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run tests
pytest tests/ -v

# Run tests with coverage
pytest --cov=. --cov-report=html --cov-report=term tests/

# View HTML coverage report
# Open htmlcov/index.html in your browser
```

### Frontend Tests

```bash
cd frontend

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:ci
```

## 🔄 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

### What the CI Does

- **Linting**: Checks code style and quality (ESLint for frontend)
- **Testing**: Runs unit tests for both backend and frontend
- **Coverage**: Generates test coverage reports (HTML and XML)
- **Building**: Creates production-ready builds
- **Deployment**: Packages application for deployment

### Artifacts Produced

- `backend-coverage`: Backend test coverage reports (HTML + XML)
- `frontend-coverage`: Frontend test coverage reports
- `frontend-build`: Production build of the frontend
- `deploy-package`: Complete deployment package (ZIP file)

### How Deployment Works

1. On push to `main`, the deployment pipeline runs
2. It downloads backend and frontend artifacts
3. Creates a ZIP package with all necessary files
4. Uploads the package as an artifact for manual or automated deployment

**Deployment Options:**
- **Manual**: Download `deploy-package.zip` from GitHub Actions and deploy manually
- **Automated**: Configure webhooks for Render.com (backend) and Netlify/Vercel (frontend)

For detailed CI/CD documentation, see [docs/CI_CD_SETUP.md](docs/CI_CD_SETUP.md)

## 📄 License

This project is developed for educational purposes as part of the PES University UE23CS341A curriculum.

---

**Course:** UE23CS341A  
**Institution:** PES University  
**Academic Year:** 2025  
**Semester:** 5th Sem
