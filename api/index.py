import os
import sys
import shutil
import traceback

# 1. SETUP PATHS
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(ROOT_DIR, 'backend')

# Add backend directory to sys.path so 'backend.settings' can be found
# and also so 'api' (the django app) is found before the root 'api' folder.
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

# 2. SQLITE SETUP (Writable /tmp)
db_source = os.path.join(BACKEND_DIR, 'db.sqlite3')
db_dest = '/tmp/db.sqlite3'

if os.path.exists(db_source):
    try:
        # Note: In Vercel serverless, /tmp is ephemeral and not shared between instances.
        if not os.path.exists(db_dest):
            shutil.copy2(db_source, db_dest)
            os.chmod(db_dest, 0o666)
    except Exception as e:
        print(f"DB Setup Error: {e}")

# 3. DJANGO INITIALIZATION
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    from django.core.wsgi import get_wsgi_application
    django_app = get_wsgi_application()
    
    def app(environ, start_response):
        # Ensure database path is correct for serverless
        os.environ['DATABASE_URL'] = f'sqlite:///{db_dest}'
        return django_app(environ, start_response)
        
except Exception:
    error_info = traceback.format_exc()
    def app(environ, start_response):
        status = '500 Internal Server Error'
        body = f"Django Load Error:\n\n{error_info}\n\nPath: {sys.path}".encode('utf-8')
        response_headers = [('Content-type', 'text/plain'), ('Content-Length', str(len(body)))]
        start_response(status, response_headers)
        return [body]
