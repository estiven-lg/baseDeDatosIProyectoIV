// src/components/SucursalForm.js
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getHospedajes, getHoteles } from '../../services/api';

const TuristaHotelForm = ({ onSave }) => {
  const [vuelos, setHoteles] = useState([]);
  const [hospedajes, setHospedajes] = useState([]);

  const [formData, setFormData] = useState({
    HOTEL: null,
    REGIMEN_HOSP: null,
    FECHA_LLEGADA: null,
    FECHA_PARTIDA: null,
  });

  const getData = async () => {
    setHoteles(await getHoteles());
    setHospedajes(await getHospedajes());
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" bg-white shadow-md rounded mx-12 px-6 py-6 mt-10 flex-1">
      {/* <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Agregar Sucursal</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="HOTEL" className="block text-gray-700 font-medium mb-2">
            Hotel
          </label>
          <select
            id="HOTEL"
            name="HOTEL"
            value={formData.HOTEL}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccione un hotel</option>
            {vuelos.map((hotel) => (
              <option value={hotel.CODIGO_HOTEL}>{hotel.NOMBRE}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="REGIMEN_HOSP" className="block text-gray-700 font-medium mb-2">
            Hospeje
          </label>
          <select
            id="REGIMEN_HOSP"
            name="REGIMEN_HOSP"
            value={formData.REGIMEN_HOSP}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccione una Hospedaje</option>
            {hospedajes.map((hospedaje) => (
              <option value={hospedaje.ID_REGIMEN}>{hospedaje.NOM_REGIMEN}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="FECHA_LLEGADA" className="block text-gray-700 font-medium mb-2">
            Fecha Llegada
          </label>
          <input
            type="datetime-local"
            id="FECHA_LLEGADA"
            name="FECHA_LLEGADA"
            value={formatISOtoDatetimeLocal(formData.FECHA_LLEGADA)}
            onChange={(e) => handleChangeDate(e)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="FECHA_PARTIDA" className="block text-gray-700 font-medium mb-2">
            Fecha Partida
          </label>
          <input
            type="datetime-local"
            id="FECHA_PARTIDA"
            name="FECHA_PARTIDA"
            value={formatISOtoDatetimeLocal(formData.FECHA_PARTIDA)}
            onChange={(e) => handleChangeDate(e)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Agendar Hospedaje
        </button>
      </form>
    </div>
  );
};

export default TuristaHotelForm;
