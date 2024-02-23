import React, { useEffect } from 'react';
import io from "socket.io-client";
 
const Test = () => {
  useEffect(() => {
    const socket = io('https://centre.7wickets.net:4000', {
      transports: ['websocket'],
      secure: true,
      rejectUnauthorized: false
    });

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('Event/Auto/', (data) => {
      console.log('Received message:', data);
      // Handle the incoming data as needed
    });

    // Emit data to the server
    socket.emit('Event/Auto/', { message: 'Hello, server!' });

    // Don't forget to disconnect the socket when your component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>Test</div>
  )
}

export default Test;
