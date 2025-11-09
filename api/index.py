"""
Vercel serverless entrypoint for the Road Sign Classification API.

This file adapts the existing FastAPI application so that the Vercel
runtime can import and run it as an ASGI-compatible handler.
"""

from pathlib import Path
import sys

# Ensure the backend package is importable when running in the Vercel runtime.
ROOT_DIR = Path(__file__).resolve().parent.parent
BACKEND_PATH = ROOT_DIR / "backend"

if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

if str(BACKEND_PATH) not in sys.path:
    sys.path.insert(0, str(BACKEND_PATH))

from backend.app import app  # noqa: E402  pylint: disable=C0413  (import after path setup)

# The variable `app` is what Vercel will look for when handling requests.
__all__ = ["app"]


