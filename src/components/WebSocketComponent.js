import  { useEffect } from 'react';

const WebSocketComponent = () => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080'); 

    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socket.onmessage = (event) => {
      console.log('Received message from server:', event.data);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        console.error('Connection died');
      }
    };

    socket.onerror = (error) => {
      console.error(`Error: ${error.message}`);
    };

    return () => {
      socket.close();
    };
  }, []);

  return <div>WebSocket Component</div>;
};

export default WebSocketComponent;
