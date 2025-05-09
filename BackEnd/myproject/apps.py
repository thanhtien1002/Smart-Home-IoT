from django.apps import AppConfig
import sys
from django.conf import settings
import os

# class MyprojectConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'myproject'

#     def ready(self):
#         # Thêm path đến source face recognition
#         sys.path.append("D:/nam3/da2/AI/AI/face_recognition/src")
        
#         try:
#             from face_rec_cam import FaceRecognitionSystem
#             self.frs = FaceRecognitionSystem()
#             print("✅ Đã khởi tạo FaceRecognitionSystem thành công")
#         except Exception as e:
#             print(f"❌ Lỗi khi khởi tạo FaceRecognitionSystem: {str(e)}")
#             self.frs = None