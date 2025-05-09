import { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard({ base_url, aio_key, devices }) {
  const [temp, setTemp] = useState(null);
  const [humid, setHumid] = useState(null);
  const [light, setLight] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [response1, respone2, response3] = await Promise.all([ 
          fetch(`${base_url}/bbc-temperature/data/last`, {
            headers: {
              'x-aio-key': aio_key
            }}
          ),
          fetch(`${base_url}/bbc-humidity/data/last`, {
            headers: {
              'x-aio-key': aio_key
            }}
          ),
          fetch(`${base_url}/bbc-light/data/last`, {
            headers: {
              'x-aio-key': aio_key
            }}
          )
        ]);
        
        if (!response1.ok) {
          throw new Error('Network response 1 was not ok');
        }

        if (!respone2.ok) {
          throw new Error('Network response 2 was not ok');
        }

        if (!response3.ok) {
          throw new Error('Network response 3 was not ok');
        }

        const [json1, json2, json3] = await Promise.all([
          response1.json(),
          respone2.json(),
          response3.json()
        ]);

        setTemp(json1.value);
        setHumid(json2.value);
        setLight(json3.value); 
        
      } catch (err){
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000); // Cập nhật dữ liệu sau mỗi 10 giây

    return () => clearInterval(intervalId);

  }, []);

  return (
    <div className="status-summary">
      <div className="status-card">
        <h3>Active Devices</h3>
        <p className="status-value">{devices.filter(d => d.status).length}/{devices.length}</p>
      </div>
      <div className="status-card">
        <h3>Temperature</h3>
        <p className="status-value">{temp}°C</p>
      </div>
      <div className="status-card">
        <h3>Humidity</h3>
        <p className="status-value">{humid}%</p>
      </div>
      <div className="status-card">
        <h3>Light Intensity</h3>
        <p className="status-value">{light}%</p>
      </div>
    </div>
  );
}
  
export default Dashboard;