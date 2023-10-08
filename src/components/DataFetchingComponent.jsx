import { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetchingComponent = ({ onDataFetched }) => {
  const [dataFromEndpoint1, setDataFromEndpoint1] = useState([]);
  const [dataFromEndpoint2, setDataFromEndpoint2] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.138.64:8080/api/temperature_sensor/temperature?timestamp=10m', { mode: 'no-cors' })
      .then(response => {
        const temperatureData = response.data;
        setDataFromEndpoint1(temperatureData);
      })
      .catch(error => {
        console.error('Error fetching data from endpoint 1', error);
      });

    axios.get('http://192.168.138.64:8080/api/temperature_sensor/humidity?timestamp=10m', { mode: 'no-cors' })
      .then(response => {
        const humidityData = response.data;
        setDataFromEndpoint2(humidityData);
      })
      .catch(error => {
        console.error('Error fetching data from endpoint 2', error);
      });
  }, []);

  
  useEffect(() => {
    if (dataFromEndpoint1.length > 0 && dataFromEndpoint2.length > 0) {
      onDataFetched({
        temperatureData: dataFromEndpoint1,
        humidityData: dataFromEndpoint2,
      });
    }
  }, [dataFromEndpoint1, dataFromEndpoint2, onDataFetched]);

  return null;
};

export default DataFetchingComponent;
