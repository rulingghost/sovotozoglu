import os
import sys
import shutil

# Add the backend directory to the sys.path
path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend'))
if path not in sys.path:
    sys.path.append(path)

# Copy SQLite database to /tmp for write access (Vercel is read-only)
db_source = os.path.join(path, 'db.sqlite3')
db_dest = '/tmp/db.sqlite3'
if os.path.exists(db_source) and not os.path.exists(db_dest):
    try:
        shutil.copy2(db_source, db_dest)
    except Exception as e:
        print(f"Error copying database: {e}")

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    application = get_wsgi_application()
except Exception as e:
    print(f"Error loading WSGI application: {e}")
    raise e
