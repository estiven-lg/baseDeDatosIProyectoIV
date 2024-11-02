import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de que estás usando react-router-dom para la navegación

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Mi Aplicación</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/sucursales" className="hover:text-gray-300">
              Sucursales
            </Link>
          </li>
          <li>
            <Link to="/turistas" className="hover:text-gray-300">
              Turista
            </Link>
          </li>
          <li>
            <Link to="/hoteles" className="hover:text-gray-300">
              Hoteles
            </Link>
          </li>
          <li>
            <Link to="/vuelos" className="hover:text-gray-300">
              Vuelos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
