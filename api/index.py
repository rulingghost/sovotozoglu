import os
import sys
import shutil
import traceback

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

if os.path.exists(db_source):
    try:
        if not os.path.exists(db_dest):
            shutil.copy2(db_source, db_dest)
            os.chmod(db_dest, 0o666)
    except Exception as e:
        print(f"Error copying database: {e}")

from django.core.wsgi import get_wsgi_application

# Point to settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    application = get_wsgi_application()
except Exception:
    error_msg = traceback.format_exc()
    def application(environ, start_response):
        status = '500 Internal Server Error'
        output = f"Django Start Error:\n\n{error_msg}".encode('utf-8')
        response_headers = [('Content-type', 'text/plain'),
                            ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output]
