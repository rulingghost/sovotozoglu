import os
import sys
import shutil
import traceback

# 1. SETUP PATHS
# Vercel task root is /var/task
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(ROOT_DIR, 'backend')

# Add backend directory to sys.path so 'backend.settings' can be found
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

# 2. SQLITE SETUP (Writable /tmp)
db_source = os.path.join(BACKEND_DIR, 'db.sqlite3')
db_dest = '/tmp/db.sqlite3'

if os.path.exists(db_source):
    try:
        if not os.path.exists(db_dest):
            shutil.copy2(db_source, db_dest)
            os.chmod(db_dest, 0o666)
    except Exception as e:
        print(f"DB Setup Error: {e}")

# 3. DJANGO INITIALIZATION
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
    
    # Wrap application to handle root / and other paths properly if needed
    def app(environ, start_response):
        # Let Django handle everything
        return application(environ, start_response)
        
except Exception:
    error_info = traceback.format_exc()
    def app(environ, start_response):
        status = '500 Internal Server Error'
        body = f"Django Load Error:\n\n{error_info}\n\nPath: {sys.path}\nFiles: {os.listdir(BACKEND_DIR) if os.path.exists(BACKEND_DIR) else 'No Backend Dir'}".encode('utf-8')
        response_headers = [('Content-type', 'text/plain'), ('Content-Length', str(len(body)))]
        start_response(status, response_headers)
        return [body]
