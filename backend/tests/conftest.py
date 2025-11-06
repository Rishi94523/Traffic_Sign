"""
Pytest configuration file
Sets up Python path for imports
"""
import sys
from pathlib import Path
import os

# Add the backend directory to Python path (absolute path)
backend_dir = Path(__file__).parent.parent.resolve()
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

# Also set PYTHONPATH environment variable as backup
os.environ['PYTHONPATH'] = str(backend_dir) + os.pathsep + os.environ.get('PYTHONPATH', '')

