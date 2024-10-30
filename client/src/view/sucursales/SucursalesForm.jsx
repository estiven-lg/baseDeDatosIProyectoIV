// src/components/SucursalForm.js
import React, { useState } from 'react';
import { useEffect } from 'react';

const SucursalesForm = ({ onSave, data }) => {
  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    CODIGO_SUC: '',
    DIRECCION: '',
    TELEFONO: '',
  });

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

  useEffect(() => setFormData({ ...data }), [data]);

  return (
    <div className=" bg-white shadow-md rounded mx-12 px-6 py-6 mt-10 flex-1">
      {/* <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Agregar Sucursal</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="DIRECCION" className="block text-gray-700 font-medium mb-2">
            Dirección
          </label>
          <input
            type="text"
            id="DIRECCION"
            name="DIRECCION"
            value={formData.DIRECCION}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Dirección de la sucursal"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="TELEFONO" className="block text-gray-700 font-medium mb-2">
            Teléfono
          </label>
          <input
            type="text"
            id="TELEFONO"
            name="TELEFONO"
            value={formData.TELEFONO}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Número de teléfono"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {formData.CODIGO_SUC ? 'Actualizar Sucursal' : 'Agregar Sucursal'}
        </button>
      </form>
    </div>
  );
};

export default SucursalesForm;
