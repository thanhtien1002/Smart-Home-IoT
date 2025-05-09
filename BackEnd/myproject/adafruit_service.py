# adafruit_service.py
import requests
from .adafruit_config import BASE_URL, ADAFRUIT_AIO_KEY

headers = {
    "X-AIO-Key": ADAFRUIT_AIO_KEY,
    "Content-Type": "application/json"
}

def get_feed_data(feed_key):
    url = f"{BASE_URL}/{feed_key}/data/last"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    return None

def send_feed_data(feed_key, value):
    url = f"{BASE_URL}/{feed_key}/data"
    payload = {"value": value}
    response = requests.post(url, headers=headers, json=payload)
    return response.status_code == 200
