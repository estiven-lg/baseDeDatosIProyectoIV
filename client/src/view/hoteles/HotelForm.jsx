import React, { useState, useEffect } from 'react';

function HotelForm({ onSave, data }) {
  const [formData, setFormData] = useState({
    CODIGO_HOTEL: '',
    NOMBRE: '',
    DIRECCION: '',
    CUIDAD: '',
    TELEFONO: '',
    NUM_PLAZAS_DISP: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  

  useEffect(() => setFormData(data), [data]);

  return (
    <div className="bg-white shadow-md rounded mx-12 px-6 py-6 mt-10 flex-1">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="NOMBRE" className="block text-gray-700 font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="NOMBRE"
            name="NOMBRE"
            value={formData.NOMBRE}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del hotel"
            required
          />
        </div>

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
            placeholder="Dirección del hotel"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="CUIDAD" className="block text-gray-700 font-medium mb-2">
            Cuidad
          </label>
          <input
            type="text"
            id="CUIDAD"
            name="CUIDAD"
            value={formData.CUIDAD}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Teléfono del hotel"
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
            placeholder="Teléfono del hotel"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="NUM_PLAZAS_DISP" className="block text-gray-700 font-medium mb-2">
            Numero de plazas disponible
          </label>
          <input
            type="text"
            id="NUM_PLAZAS_DISP"
            name="NUM_PLAZAS_DISP"
            value={formData.NUM_PLAZAS_DISP}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Teléfono del hotel"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          {formData.CODIGO_TURISTA ? 'Actualizar Turista' : 'Agregar Turista'}
        </button>
      </form>
    </div>
  );
}

export default HotelForm;
