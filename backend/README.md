# Backend - Road Sign Classification API

FastAPI backend for the Road Sign Classification project.

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip

### Installation

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Copy environment file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Running the Server

```bash
# Development mode with auto-reload
uvicorn app:app --reload --host 0.0.0.0 --port 8000

# Or run directly
python app.py
```

The API will be available at `http://localhost:8000`

### API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Health Check

```bash
curl http://localhost:8000/health
```

## 📁 Project Structure

```
backend/
├── app.py                 # FastAPI application entry point
├── routes/                # API route handlers
│   ├── upload_routes.py   # Upload endpoints (RSCI-4,6,7,16)
│   └── classification_routes.py  # Classification endpoints (RSCI-10,12,13,14)
├── services/              # Business logic
│   ├── validation_service.py     # File validation (RSCI-6,7)
│   └── classification_service.py # Stubbed ML model (RSCI-10)
├── tests/                 # Test files
└── requirements.txt       # Python dependencies
```

## 🧪 Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=.
```

## 📝 Development Notes

- This is a stubbed implementation with placeholder logic
- Real ML model integration will be added in RSCI-10
- File validation is partially implemented (RSCI-6, RSCI-7)
- CORS is configured for frontend access on ports 5173 and 3000

