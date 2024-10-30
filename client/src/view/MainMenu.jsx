import React, { useEffect, useState } from 'react';
import { getSucursales } from '../services/api';

const MainMenu = () => {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const data = await getSucursales();
        setSucursales(data); // Actualiza el estado con los datos obtenidos
      } catch (err) {
        setError('Error al obtener las sucursales'); // Maneja el error
      } finally {
        setLoading(false); // Cambia el estado de carga
      }
    };

    fetchSucursales(); // Llama a la función para obtener las sucursales
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>; // Muestra un mensaje de carga
  if (error) return <p className="text-red-500 text-center">{error}</p>; // Muestra un mensaje de error

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-4">Sucursales</h1>
      <div className="overflow-hidden shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-left text-gray-600">codigo sucursal</th>
              <th className="py-2 px-4 border-b text-left text-gray-600">Dirección</th>
              <th className="py-2 px-4 border-b text-left text-gray-600">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {sucursales.map(sucursal => (
              <tr key={sucursal.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{sucursal.id}</td>
                <td className="py-2 px-4 border-b">{sucursal.direccion}</td>
                <td className="py-2 px-4 border-b">{sucursal.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default MainMenu;
