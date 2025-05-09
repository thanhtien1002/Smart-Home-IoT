import os
from dotenv import load_dotenv
import serial.tools.list_ports
import sys
import time
from Adafruit_IO import MQTTClient

# ==== Cấu hình ====
AIO_FEED_ID = ["bbc-temperature", "bbc-humidity", "bbc-ledrgb", "bbc-fan","bbc-door", "bbc-light", "button-value"]
AIO_USERNAME = "tiencao04967172"
load_dotenv()
AIO_KEY = os.getenv("AIO_KEY")

# ==== Biến toàn cục ====
last_temp = None
last_hum = None
last_li = None
mess = ""
isYoloBitConnected = False
ser = None  # Global serial

# ==== Hàm xử lý MQTT ====
def connected(client):
    print("Đã kết nối MQTT")
    for feed in AIO_FEED_ID:
        client.subscribe(feed)

def subscribe(client, userdata, mid, granted_qos):
    print("Subscribe thành công")

def disconnected(client):
    print("MQTT ngắt kết nối")
    sys.exit(1)

def message(client, feed_id, payload):
    print(f"Nhận dữ liệu [{feed_id}]: {payload}")
    if isYoloBitConnected and ser:
        ser.write((str(payload)).encode())
    
    # if not (isYoloBitConnected and ser):
    #     return

    # if feed_id == "bbc-ledrgb":
    #     command = f"{payload}"
    #     ser.write(command.encode())

    # elif feed_id == "button-value":
    #     command = f"F{payload}"
    #     ser.write(command.encode())

    # elif feed_id == "bbc-door":
    #     command = f"{payload}"
    #     ser.write(command.encode())

# ==== Hàm xử lý Serial ====
def getPort():
    ports = serial.tools.list_ports.comports()
    for port in ports:
        if "USB-SERIAL CH340" in str(port):
            return str(port).split(" ")[0]
    return None

def processData(data):
    global last_temp, last_hum
    data = data.replace("!", "").replace("#", "")
    parts = data.split(":")
    
    if len(parts) >= 2:  
        key = parts[0].strip()
        value = parts[1].strip()

        if key == "T":
            if value != last_temp:
                client.publish("bbc-temperature", value)
                last_temp = value

        elif key == "H":
            if value != last_hum:
                client.publish("bbc-humidity", value)
                last_hum = value
        elif key == "L":
            if value != last_li:
                client.publish("bbc-light", value)
                last_hum = value


def readSerial():
    global mess
    if isYoloBitConnected and ser:
        bytesToRead = ser.in_waiting
        if bytesToRead > 0:
            mess += ser.read(bytesToRead).decode("UTF-8")
            while "!" in mess and "#" in mess:
                start = mess.find("!")
                end = mess.find("#")
                processData(mess[start:end + 1])
                mess = mess[end + 1:] if end + 1 < len(mess) else ""

# ==== Khởi tạo Serial ====
port = getPort()
if port:
    try:
        ser = serial.Serial(port=port, baudrate=115200)
        isYoloBitConnected = True
        print(f"Kết nối Yolo:Bit qua {port}")
    except Exception as e:
        print(f"Lỗi kết nối cổng Serial: {e}")

# ==== MQTT Setup ====
client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

# ==== Vòng lặp chính ====
while True:
    if isYoloBitConnected and ser:
        readSerial()
    time.sleep(2)  
