# src/updater.py
import requests
import os
import zipfile

def check_for_updates(current_version):
    release_url = 'https://github.com/Luca-Caporaloni/pinkycore/releases/tag/app'
    try:
        response = requests.get(release_url)
        response.raise_for_status()
        latest_release = response.json()
        latest_version = latest_release['tag_name']
        
        if latest_version > current_version:
            download_url = latest_release['assets'][0]['browser_download_url']
            download_and_install_update(download_url)
        else:
            print("No hay actualizaciones disponibles.")
    except requests.exceptions.RequestException as e:
        print(f"Error al verificar actualizaciones: {e}")

def download_and_install_update(download_url):
    try:
        response = requests.get(download_url)
        with open('temp_update.zip', 'wb') as f:
            f.write(response.content)
        print("Actualización descargada correctamente.")
        with zipfile.ZipFile('temp_update.zip', 'r') as zip_ref:
            zip_ref.extractall('temp_update')
        # Aquí puedes implementar la lógica para reemplazar los archivos antiguos con los nuevos
        print("Actualización instalada.")
    except requests.exceptions.RequestException as e:
        print(f"Error al descargar actualización: {e}")
    except zipfile.BadZipFile as e:
        print(f"Error al descomprimir el archivo de actualización: {e}")

if __name__ == "__main__":
    current_version = "1.0.0"  # Versión actual de tu aplicación
    check_for_updates(current_version)
