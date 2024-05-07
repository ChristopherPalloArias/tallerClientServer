import React, { useState, useEffect } from 'react';
import Login from './Login';
import HomePage from './HomePage'; // Importa el componente HomePage
import io from 'socket.io-client';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://tu-url-en-digitalocean');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  return (
    <div>
      {isLoggedIn ? <HomePage socket={socket} /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default App;
