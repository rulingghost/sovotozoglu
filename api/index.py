import os
import sys

def application(environ, start_response):
    status = '200 OK'
    # Try to import django to see if it exists
    django_status = "Not Found"
    try:
        import django
        django_status = f"Found {django.__version__}"
    except ImportError:
        django_status = "ImportError"

    path_info = f"Path: {sys.path}\nCurDir: {os.getcwd()}\nDjango: {django_status}"
    output = f"Function is Alive!\n\n{path_info}".encode('utf-8')
    
    response_headers = [('Content-type', 'text/plain'),
                        ('Content-Length', str(len(output)))]
    start_response(status, response_headers)
    return [output]
