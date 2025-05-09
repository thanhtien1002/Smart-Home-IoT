from django.urls import path
from .views import faceRecognition, read_temperature,read_humidity,read_light

urlpatterns = [
    path('frame/', faceRecognition),
    path('temperature/',read_temperature),
    path('humidity/',read_humidity),
    path('light/', read_light)
]