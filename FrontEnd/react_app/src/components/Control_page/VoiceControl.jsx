import { useState, useEffect } from 'react';
import './VoiceControl.css';

function VoiceControl({ onCommand, deviceId, deviceName }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setListening(true);
    setTranscript('');

    // Khởi tạo Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói!");
      setListening(false);
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    setRecognition(recognitionInstance);
    
    recognitionInstance.lang = 'vi-VN';
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;

    recognitionInstance.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setTranscript(command);
      
      // Xử lý lệnh giọng nói
      if (command.includes('bật') || command.includes('mở')) {
        onCommand(deviceId, 'toggle', true);
      } else if (command.includes('tắt') || command.includes('đóng')) {
        onCommand(deviceId, 'toggle', false);
      } else if (command.includes('màu đỏ')) {
        onCommand(deviceId, 'color', {r: 255, g: 0, b: 0});
      } else if (command.includes('màu xanh lá')) {
        onCommand(deviceId, 'color', {r: 0, g: 255, b: 0});
      } else if (command.includes('màu xanh dương')) {
        onCommand(deviceId, 'color', {r: 0, g: 0, b: 255});
      } else if (command.includes('màu trắng')) {
        onCommand(deviceId, 'color', {r: 255, g: 255, b: 255});
      }
      
      setListening(false);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Lỗi nhận dạng giọng nói:', event.error);
      setListening(false);
    };

    recognitionInstance.onend = () => {
      setListening(false);
    };

    recognitionInstance.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setListening(false);
  };

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  return (
    <div className="voice-control">
      <button 
        className={`voice-btn ${listening ? 'listening' : ''}`}
        onClick={toggleListening}
        title="Điều khiển bằng giọng nói"
      >
        {listening ? '🎤 Đang nghe...' : '🎤'}
      </button>
      {transcript && <div className="transcript">{transcript}</div>}
    </div>
  );
}

export default VoiceControl;
