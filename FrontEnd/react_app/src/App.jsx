import React from 'react';
import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Dashboard from './components/Control_page/Dashboard'
import CategoryFilters from './components/Control_page/CategoryFilters'
import DeviceList from './components/Control_page/DeviceList'
import Navigation from './components/Navigation'
import { load_dotenv } from 'dotenv';


function App() {
  load_dotenv();
  const [activeTab, setActiveTab] = useState('home');
  const BASE_URL = "https://io.adafruit.com/api/v2/tiencao04967172/feeds";
  // Lấy aio_key từ biến môi trường
  // const aio_key = process.env.REACT_APP_AIO_KEY;

  // Các device mẫu cho smart home
  const [devices, setDevices] = useState([
    { id: 1, name: 'Living Room Light', type: 'light', status: false, icon: '💡', color: {r: 255, g: 255, b: 255} },
    { id: 2, name: 'Bedroom Light', type: 'light', status: false, icon: '💡', color: {r: 255, g: 255, b: 255} },
    { id: 3, name: 'Kitchen Light', type: 'light', status: false, icon: '💡', color: {r: 255, g: 255, b: 255} },
    { id: 4, name: 'Air Conditioner', type: 'climate', status: false, icon: '❄️', temp: 24 },
    { id: 5, name: 'Living Room TV', type: 'entertainment', status: false, icon: '📺' },
    { id: 6, name: 'Front Door Camera', type: 'security', status: false, icon: '📹' },
    { id: 7, name: 'Automatic Sprinkler', type: 'garden', status: false, icon: '💦' },
    { id: 8, name: 'Auto Door Lock', type: 'security', status: false, icon: '🚪'}
  ]);

  // Thay đổi trạng thái thiết bị
  const toggleDevice = (id) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, status: !device.status } : device
    ));
  };

  // Tăng/giảm nhiệt độ
  const adjustTemperature = (id, change) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, temp: device.temp + change } : device
    ));
  };

  // Thay đổi màu RGB cho đèn
  const changeColor = (id, color) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, color: {...device.color, ...color} } : device
    ));
  };

  return (
    <div className="smart-home-app">
      <Header />

      <main className="main-content">
        <section className="dashboard">
          <h2>Dashboard</h2>
          
          <Dashboard base_url={BASE_URL} aio_key={aio_key} devices={devices} />

          <div className="device-categories">
            <h3>Devices</h3>
            
            <CategoryFilters activeTab={activeTab} onTabChange={setActiveTab} />
            
            <DeviceList 
              devices={devices} 
              activeTab={activeTab} 
              onToggle={toggleDevice}
              onTemperatureChange={adjustTemperature}
              onColorChange={changeColor}
            />
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
}

export default App


