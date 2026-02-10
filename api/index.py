import os
import sys
import shutil
import traceback

# 1. SETUP PATHS
# Use absolute paths based on this file's location
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__)) # /var/task/api
ROOT_DIR = os.path.dirname(CURRENT_DIR) # /var/task
BACKEND_DIR = os.path.join(ROOT_DIR, 'backend') # /var/task/backend

# Add paths to sys.path
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

# 2. SQLITE SETUP
# Vercel is read-only. We must copy the DB to /tmp to make it writable.
db_source = os.path.join(BACKEND_DIR, 'db.sqlite3')
db_dest = '/tmp/db.sqlite3'

if os.path.exists(db_source):
    try:
        # Copy file if it doesn't exist in /tmp
        if not os.path.exists(db_dest):
            shutil.copy2(db_source, db_dest)
            os.chmod(db_dest, 0o666)
    except Exception as e:
        print(f"DB Setup Error: {e}")

# 3. DJANGO SETUP
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
except Exception:
    error_info = traceback.format_exc()
    # If Django fails to load, provide a helpful error page instead of 500
    def application(environ, start_response):
        status = '500 Internal Server Error'
        body = f"Django Failed to Load:\n\n{error_info}\n\nPaths:\n{sys.path}".encode('utf-8')
        response_headers = [('Content-type', 'text/plain'), ('Content-Length', str(len(body)))]
        start_response(status, response_headers)
        return [body]

# Export for Vercel
app = application
