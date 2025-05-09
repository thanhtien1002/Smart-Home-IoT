
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from django.shortcuts import render
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
import tempfile
import speech_recognition 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import sys
import os

import datetime
sys.path.append("D:/nam3/da2/AI/AI/face_recognition/src")
try:
    import face_rec_cam
    import facenet as facenet
except ImportError as e:
    print(f"Lỗi import: {e}")
    raise
import cv2
import numpy as np
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse

FACENET_MODEL_PATH = 'D:/nam3/da2/AI/AI/face_recognition/src/Models/20180402-114759.pb'

@csrf_exempt
def faceRecognition(request):
    if request.method != 'POST':
        response = JsonResponse({"error": "Only POST method is allowed"}, status=405)
        return response
    
    try:
        image_file = request.FILES.get('frame')
        if not image_file:
            response = JsonResponse({"error": "No image provided"}, status=400)
            return response


        image_data = image_file.read()
        nparr = np.frombuffer(image_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # facenet.load_model(FACENET_MODEL_PATH)

        result = face_rec_cam.process_frame(frame)
        
        if not result == "Unknown":
            response = JsonResponse({
                "status": "ok", 
                "message": result
            }, status=200)
        else:
            response = JsonResponse({
                "status": "unknown", 
                "message": "No recognized face detected"
            }, status=200)
        return response
            
    except Exception as e:
        # Lấy thông tin lỗi chi tiết
        error_type = type(e).__name__
        error_message = str(e)
        
        
        # Trả về response chi tiết
        response = JsonResponse({
            "status": "error",
            "error_type": error_type,
            "error_message": error_message,
            # "traceback": error_traceback  # Chỉ bật trong môi trường dev
        }, status=500)
        return response


#  this is to save the data

from django.http import JsonResponse
from .adafruit_service import get_feed_data, send_feed_data
from .mongo_service import save_sensor_data
from datetime import datetime

def read_temperature(request):
    data = get_feed_data("bbc-temperature")
    if data:
        value = data.get("value")
        time_str = data.get("created_at")
        save_sensor_data("temperature", value, datetime.fromisoformat(time_str.replace('Z', '+00:00')))
    return JsonResponse(data)

def read_humidity(request):
    data = get_feed_data("bbc-humidity")
    if data:
        value = data.get("value")
        time_str = data.get("created_at")
        save_sensor_data("humidity", value, datetime.fromisoformat(time_str.replace('Z', '+00:00')))
    return JsonResponse(data)

def read_light(request):
    data = get_feed_data("bbc-light")
    if data:
        value = data.get("value")
        time_str = data.get("created_at")
        save_sensor_data("light", value, datetime.fromisoformat(time_str.replace('Z', '+00:00')))
    return JsonResponse(data)





