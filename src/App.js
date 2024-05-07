import React, { useState } from 'react';
import Login from './Login';
import HomePage from './HomePage'; // Importa el componente HomePage

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  return (
    <div>
      {isLoggedIn ? <HomePage /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default App;