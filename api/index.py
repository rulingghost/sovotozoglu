import os
import sys

def application(environ, start_response):
    status = '200 OK'
    message = "ALIVE!\n"
    message += f"Path: {sys.path}\n"
    message += f"Files in root: {os.listdir('.')}\n"
    
    body = message.encode('utf-8')
    response_headers = [('Content-type', 'text/plain'), ('Content-Length', str(len(body)))]
    start_response(status, response_headers)
    return [body]

app = application
