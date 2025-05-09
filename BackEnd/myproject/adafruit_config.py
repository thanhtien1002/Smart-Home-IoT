# adafruit_config.py
import os
from dotenv import load_dotenv
load_dotenv()
ADAFRUIT_AIO_USERNAME = "tiencao04967172"
#ADAFRUIT_AIO_KEY = os.getenv("ADAFRUIT_AIO_KEY")
BASE_URL = f"https://io.adafruit.com/api/v2/{ADAFRUIT_AIO_USERNAME}/feeds"
