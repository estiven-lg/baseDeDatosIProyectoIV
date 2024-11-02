// src/components/SucursalForm.js
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getClases, getVuelos } from '../../services/api';

const SucursalesForm = ({ onSave }) => {
  const [vuelos, setVuelos] = useState([]);
  const [clases, setClases] = useState([]);

  const [formData, setFormData] = useState({
    VUELO: null,
    CLASE: null,
  });

  const getData = async () => {
    setVuelos(await getVuelos());
    setClases(await getClases());
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" bg-white shadow-md rounded mx-12 px-6 py-6 mt-10 flex-1">
      {/* <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Agregar Sucursal</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="VUELO" className="block text-gray-700 font-medium mb-2">
            Vuelo
          </label>
          <select
            id="VUELO"
            name="VUELO"
            value={formData.VUELO}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccione un vuelo</option>
            {vuelos.map((vuelo) => (
              <option value={vuelo.NUM_VUELO}>
                {vuelo.ORIGEN} - {vuelo.DESTINO}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="CLASE" className="block text-gray-700 font-medium mb-2">
            Clase
          </label>
          <select
            id="CLASE"
            name="CLASE"
            value={formData.CLASE}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccione una Clase</option>
            {clases.map((clase) => (
              <option value={clase.ID_CLASE}>{clase.NOM_CLASE}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Agendar vuelo
        </button>
      </form>
    </div>
  );
};

export default SucursalesForm;
