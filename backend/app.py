import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOTENV_PATH = os.path.join(BASE_DIR, ".env")

# Load environment variables from backend/.env if available
load_dotenv(dotenv_path=DOTENV_PATH, override=False)

app = FastAPI(title="Road Sign Classification API", version="1.0.0")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routes
from routes import upload_routes, classification_routes

app.include_router(upload_routes.router, prefix="/api/upload", tags=["upload"])
app.include_router(classification_routes.router, prefix="/api/classification", tags=["classification"])


@app.get("/health")
def health():
    """Health check endpoint"""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

