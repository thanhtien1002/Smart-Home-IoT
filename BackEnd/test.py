from flask import Flask
from flask_socketio import SocketIO
import os
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")  # Cho phép tất cả origins

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('frame')
def handle_frame(data):
    # Lưu frame ảnh với timestamp
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
    filename = os.path.join(UPLOAD_FOLDER, f'frame_{timestamp}.jpg')
    with open(filename, 'wb') as f:
        f.write(data)
    print(f'Đã lưu frame: {filename}')

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)