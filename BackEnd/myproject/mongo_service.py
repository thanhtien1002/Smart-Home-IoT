# mongo_service.py
from pymongo import MongoClient
from django.conf import settings
from datetime import datetime

client = MongoClient(settings.MONGO_URI)
db = client[settings.MONGO_DB_NAME]
collection = db['sensor_logs']  # Collection sẽ lưu cả 3 loại dữ liệu

def save_sensor_data(feed_type, value, timestamp=None):
    if timestamp is None:
        timestamp = datetime.utcnow()
    data = {
        "type": feed_type,
        "value": value,
        "timestamp": timestamp
    }
    collection.insert_one(data)
