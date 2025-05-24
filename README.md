# Smart Home IoT System

## Overview

The Smart Home IoT system is a comprehensive solution for monitoring and controlling smart devices in your home (lights, air conditioners, cameras, door locks, etc.) via a modern web interface. The system integrates hardware (Yolo:Bit, sensors), a Python gateway, a Django backend, and a React frontend. It uses Adafruit IO for MQTT communication and MongoDB for sensor data storage.

---

## System Architecture

```
SmartHomeIoT/
│
├── BackEnd/                # Django backend: API, Adafruit IO, MongoDB
│   ├── myproject/
│   │   ├── adafruit_config.py
│   │   ├── adafruit_service.py
│   │   ├── mongo_service.py
│   │   ├── views.py
│   │   └── ...
│   ├── SMARTHOME/          # Django project settings
│   ├── manage.py
│   └── test.py             # Flask-SocketIO (camera frames)
│
├── FrontEnd/
│   └── react_app/          # React web dashboard
│       ├── src/
│       │   ├── App.jsx
│       │   └── components/
│       └── ...
│
└── IoTGatewayPython/       # Python gateway Yolo:Bit <-> Adafruit IO
    └── main.py
```

---

## Main Components

### 1. IoT Gateway (Python)
- **Location:** `IoTGatewayPython/main.py`
- **Function:** Connects to Yolo:Bit via Serial, reads sensor data, publishes/subscribes to Adafruit IO MQTT feeds.
- **Setup:**
  - Create a `.env` file with your `AIO_KEY` (Adafruit IO Key).
  - Connect Yolo:Bit via USB.
  - Install dependencies:
    ```cmd
    pip install python-dotenv pyserial adafruit-io
    python main.py
    ```

### 2. Backend (Django)
- **Location:** `BackEnd/`
- **Function:**
  - Provides REST APIs for the frontend.
  - Integrates with Adafruit IO (REST API) for device control.
  - Logs sensor data to MongoDB.
- **Setup:**
  - Create a `.env` file with: `ADAFRUIT_AIO_KEY`, `MONGO_URI`, `MONGO_DB_NAME`.
  - Install dependencies:
    ```cmd
    pip install django python-dotenv pymongo requests
    ```
  - Run the server:
    ```cmd
    python manage.py runserver
    ```

### 3. Frontend (React)
- **Location:** `FrontEnd/react_app/`
- **Function:**
  - Dashboard for device control and monitoring.
  - Communicates with Django backend and Adafruit IO.
- **Setup:**
  - Create a `.env` file with `REACT_APP_AIO_KEY` if needed.
  - Install dependencies:
    ```cmd
    npm install
    ```
  - Run the app:
    ```cmd
    npm run dev
    ```

### 4. Camera Streaming (Optional)
- **Location:** `BackEnd/test.py`
- **Function:** Flask-SocketIO server for receiving and saving camera frames.
- **Setup:**
    ```cmd
    pip install flask flask-socketio
    python test.py
    ```

---

## Environment Variables

Create a `.env` file in the relevant folders with the following content:

- **Python (IoTGatewayPython, BackEnd/myproject):**
  ```env
  AIO_KEY=your_adafruit_aio_key
  ADAFRUIT_AIO_KEY=your_adafruit_aio_key
  MONGO_URI=your_mongodb_uri
  MONGO_DB_NAME=your_db_name
  ```
- **React (FrontEnd/react_app):**
  ```env
  REACT_APP_AIO_KEY=your_adafruit_aio_key
  ```

---

## Technologies Used
- **Frontend:** React, Vite
- **Backend:** Django, REST API, Flask-SocketIO (camera)
- **IoT Gateway:** Python, Adafruit IO MQTT, Serial
- **Database:** MongoDB (sensor logs)
- **Cloud IoT:** Adafruit IO

---

## Usage Guide
1. **Start IoT Gateway:** Connect Yolo:Bit, run `main.py`.
2. **Start Backend:** Run the Django server.
3. **Start Frontend:** Run the React app and access the dashboard in your browser.
4. **(Optional) Camera:** Run the Flask server to receive camera streams.

---

## Authors
- Thanh Tien
---

## License
This project is for educational purposes. Please check individual files for copyright notes.
