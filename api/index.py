import os
import sys
import shutil
import traceback

# 1. SETUP PATHS
current_file = os.path.abspath(__file__) # /var/task/api/index.py
api_dir = os.path.dirname(current_file) # /var/task/api
root_dir = os.path.dirname(api_dir) # /var/task
backend_dir = os.path.join(root_dir, 'backend') # /var/task/backend

if backend_dir not in sys.path:
    sys.path.append(backend_dir)
if root_dir not in sys.path:
    sys.path.append(root_dir)

# 2. COPY DB
db_source = os.path.join(backend_dir, 'db.sqlite3')
db_dest = '/tmp/db.sqlite3'

if os.path.exists(db_source):
    try:
        # Always overwrite in /tmp to ensure we have the latest data from the repo
        shutil.copy2(db_source, db_dest)
        os.chmod(db_dest, 0o666)
    except Exception as e:
        print(f"DB Copy Error: {e}")

# 3. SETUP DJANGO
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
except Exception:
    error_msg = traceback.format_exc()
    def application(environ, start_response):
        status = '500 Internal Server Error'
        body = f"Django Load Error:\n\n{error_msg}\n\nPath: {sys.path}\nCurDir: {os.getcwd()}".encode('utf-8')
        response_headers = [('Content-type', 'text/plain'), ('Content-Length', str(len(body)))]
        start_response(status, response_headers)
        return [body]
