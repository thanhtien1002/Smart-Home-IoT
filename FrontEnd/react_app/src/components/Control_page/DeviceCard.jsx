import { useState } from 'react';
import './DeviceCard.css';
import VoiceControl from './VoiceControl';

function DeviceCard({ device, onToggle, onTemperatureChange, onColorChange }) {
  // Hiện/ẩn menu điều chỉnh màu sắc
  const [showColorControls, setShowColorControls] = useState(false);

  // Định dạng chuỗi màu RGB
  const rgbString = device.color 
    ? `rgb(${device.color.r}, ${device.color.g}, ${device.color.b})`
    : 'rgb(255, 255, 255)';
    
  // Xử lý lệnh giọng nói
  const handleVoiceCommand = (deviceId, action, value) => {
    if (action === 'toggle') {
      if ((value && !device.status) || (!value && device.status)) {
        onToggle(deviceId);
      }
    } else if (action === 'color' && device.type === 'light') {
      onColorChange(deviceId, value);
    }
  };

  return (
    <div className={`device-card ${device.status ? 'active' : 'inactive'}`}>
      <div 
        className="device-icon"
        style={device.type === 'light' && device.status ? { backgroundColor: rgbString } : {}}
      >
        {device.icon}
      </div>
      <div className="device-info">
        <h4>{device.name}</h4>
        <p>{device.status ? 'ON' : 'OFF'}</p>
        
        {/* Voice control for all devices */}
        <VoiceControl 
          onCommand={handleVoiceCommand}
          deviceId={device.id}
          deviceName={device.name}
        />
        
        {/* Temperature control for climate devices */}
        {device.type === 'climate' && device.status && device.temp && (
          <div className="temp-control">
            <button onClick={() => onTemperatureChange(device.id, -1)}>-</button>
            <span>{device.temp}°C</span>
            <button onClick={() => onTemperatureChange(device.id, 1)}>+</button>
          </div>
        )}

        {/* Color control for light devices */}
        {device.type === 'light' && device.status && (
          <div className="color-control">
            <button 
              className="color-btn"
              onClick={() => setShowColorControls(!showColorControls)}
            >
              <span className="color-preview" style={{ backgroundColor: rgbString }}></span>
              {showColorControls ? 'Hide Color' : 'Change Color'}
            </button>
            
            {showColorControls && (
              <div className="rgb-controls">
                <div className="rgb-slider">
                  <label className="icon_label" style={{color: 'red'}}>R</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="255" 
                    value={device.color.r}
                    id = "red_color" 
                    onChange={(e) => onColorChange(device.id, {r: parseInt(e.target.value)})} 
                  />
                  <input type="text" value={device.color.r} onChange={(e) => onColorChange(device.id, {r: parseInt(e.target.value)})} />
                </div>
                
                <div className="rgb-slider">
                  <label className="icon_label" style={{color: 'green'}}>G</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="255" 
                    value={device.color.g} 
                    id = "green_color"
                    onChange={(e) => onColorChange(device.id, {g: parseInt(e.target.value)})} 
                  />
                  <input type="text" value={device.color.g} onChange={(e) => onColorChange(device.id, {g: parseInt(e.target.value)})} />
                </div>
                
                <div className="rgb-slider">
                  <label className="icon_label" style={{color: 'blue'}}>B</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="255" 
                    value={device.color.b} 
                    id = "blue_color"
                    onChange={(e) => onColorChange(device.id, {b: parseInt(e.target.value)})} 
                  />
                  <input type="text" value={device.color.b} onChange={(e) => onColorChange(device.id, {b: parseInt(e.target.value)})} />
                </div>

                <div className="preset-colors">
                  <button onClick={() => onColorChange(device.id, {r: 255, g: 255, b: 255})} style={{backgroundColor: 'white'}}></button>
                  <button onClick={() => onColorChange(device.id, {r: 255, g: 0, b: 0})} style={{backgroundColor: 'red'}}></button>
                  <button onClick={() => onColorChange(device.id, {r: 0, g: 255, b: 0})} style={{backgroundColor: 'green'}}></button>
                  <button onClick={() => onColorChange(device.id, {r: 0, g: 0, b: 255})} style={{backgroundColor: 'blue'}}></button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="device-control">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={device.status}
            onChange={() => onToggle(device.id)}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default DeviceCard;
