import React, { useState, useEffect } from 'react';

function VueloForm({ onSave, data }) {
  const [formData, setFormData] = useState({
    NUM_VUELO: '',
    FECHA: '',
    ORIGEN: '',
    DESTINO: '',
    NUM_PLAZA_DISP: 0,
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

  const handleChangeDate = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: formatDatetimeLocalToISO(value),
    }));
  };

  function formatDatetimeLocalToISO(datetimeLocal) {
    const fecha = new Date(datetimeLocal);
    return fecha.toISOString();
  }

  function formatISOtoDatetimeLocal(isoString) {
    if (!isoString) return '';
    const fecha = new Date(isoString);

    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');

    return `${año}-${mes}-${dia}T${horas}:${minutos}`;
  }

  useEffect(() => setFormData({ ...data }), [data]);

  return (
    <div className="bg-white shadow-md rounded mx-12 px-6 py-6 mt-10 flex-1">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="FECHA" className="block text-gray-700 font-medium mb-2">
            Fecha
          </label>
          <input
            type="datetime-local"
            id="FECHA"
            name="FECHA"
            value={formatISOtoDatetimeLocal(formData.FECHA)}
            onChange={(e) => handleChangeDate(e)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ORIGEN" className="block text-gray-700 font-medium mb-2">
            Origen
          </label>
          <input
            type="text"
            id="ORIGEN"
            name="ORIGEN"
            value={formData.ORIGEN}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ciudad de origen"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="DESTINO" className="block text-gray-700 font-medium mb-2">
            Destino
          </label>
          <input
            type="text"
            id="DESTINO"
            name="DESTINO"
            value={formData.DESTINO}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ciudad de destino"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="NUM_PLAZA_DISP" className="block text-gray-700 font-medium mb-2">
            Número de Plazas Disponibles
          </label>
          <input
            type="number"
            id="NUM_PLAZA_DISP"
            name="NUM_PLAZA_DISP"
            value={formData.NUM_PLAZA_DISP}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Plazas disponibles"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          {formData.NUM_VUELO ? 'Actualizar Vuelo' : 'Agregar Vuelo'}
        </button>
      </form>
    </div>
  );
}

export default VueloForm;
