import os
import sys
import shutil

# Define the root of the project
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Define the backend directory
BACKEND_DIR = os.path.join(BASE_DIR, 'backend')

# Add backend and root to sys.path
if BACKEND_DIR not in sys.path:
    sys.path.append(BACKEND_DIR)
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

# Copy SQLite database to /tmp for write access
db_source = os.path.join(BACKEND_DIR, 'db.sqlite3')
db_dest = '/tmp/db.sqlite3'

# Always copy to ensure we have the latest and it's writable
if os.path.exists(db_source):
    try:
        shutil.copy2(db_source, db_dest)
        os.chmod(db_dest, 0o666) # Ensure writable
    except Exception as e:
        print(f"Error copying database: {e}")

from django.core.wsgi import get_wsgi_application

# Point to settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    application = get_wsgi_application()
except Exception as e:
    print(f"Error loading WSGI application: {e}")
    # Fallback to help debug if needed
    raise e
