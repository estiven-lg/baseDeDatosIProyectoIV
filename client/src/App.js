import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './view/Login';
import MainMenu from './view/MainMenu';
import Sucursales from './view/sucursales/Sucursales';
import Navbar from './view/navigator/NavBar';
import Turistas from './view/turistas/Turistas';
import Hoteles from './view/hoteles/Hoteles';
import Vuelos from './view/vuelos/Vuelos';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (usuario, password) => {
    if (usuario === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    }
  };
  //

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={true ? <Navigate to="/sucursales" /> : <Login onLogin={handleLogin} />}
          />
          <Route path="/main" element={isAuthenticated ? <MainMenu /> : <Navigate to="/" />} />
          <Route path="/sucursales" element={<Sucursales/>} />
          <Route path="/turistas" element={<Turistas/>} />
          <Route path="/hoteles" element={<Hoteles/>} />
          <Route path="/vuelos" element={<Vuelos/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
