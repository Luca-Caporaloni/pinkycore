from http.server import SimpleHTTPRequestHandler, HTTPServer
import threading
import webview
import sys
import os
print(sys.executable)


# src/main.py
from updater import check_for_updates

def main():
    current_version = "1.0.0"  # Versión actual de tu aplicación
    check_for_updates(current_version)
    
    # Aquí va el resto de tu lógica de aplicación
    print("Iniciando PinkyCore...")
    # Tu código de aplicación aquí
    

def resource_path(relative_path):
    """ Get the absolute path to a resource, works for dev and for PyInstaller """
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

def resource_path(relative_path):
    try:
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)


class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Ajustar el directorio base para servir los archivos correctos
        path = path.split('?',1)[0]
        path = path.split('#',1)[0]
        if path == '/':
            path = '/recurses'
        return resource_path(path[1:])
    

# Ejemplo de uso
html_file = resource_path('web/inicio.html')    

class Api:
    def toggle_sidebar(self):
        webview.evaluate_js('toggleSidebar()')

def start_server():
     handler = CustomHTTPRequestHandler
     httpd = HTTPServer(('localhost', 8000), handler)
     threading.Thread(target=httpd.serve_forever).start()
     api = Api()
     window = webview.create_window(
        'PinkyCore',
        'web/inicio.html',
        js_api=api,
        width=1500,
        height=930,
        resizable=False
        
    )
     webview.start()

if __name__ == '__main__':
    start_server()