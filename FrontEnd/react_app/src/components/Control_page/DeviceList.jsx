import DeviceCard from './DeviceCard';
import './DeviceList.css';

function DeviceList({ devices, activeTab, onToggle, onTemperatureChange, onColorChange }) {
  return (
    <div className="device-grid">
      {devices
        .filter(device => activeTab === 'home' || device.type === activeTab)
        .map(device => (
          <DeviceCard 
            key={device.id} 
            device={device} 
            onToggle={onToggle}
            onTemperatureChange={onTemperatureChange}
            onColorChange={onColorChange}
          />
        ))}
    </div>
  );
}

export default DeviceList;