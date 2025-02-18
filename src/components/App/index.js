import React, { useState, useEffect } from 'react';
import Login from '../Login';
import Dashboard from '../Dashboard';
import Register from '../Register';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  return (
      <>
        {isAuthenticated ? (
            <Dashboard setIsAuthenticated={setIsAuthenticated} />
        ) : isRegistering ? (
            <Register setIsAuthenticated={setIsAuthenticated} setIsRegistering={setIsRegistering} />
        ) : (
            <Login setIsAuthenticated={setIsAuthenticated} setIsRegistering={setIsRegistering} />
        )}
      </>
  );
};

export default App;
