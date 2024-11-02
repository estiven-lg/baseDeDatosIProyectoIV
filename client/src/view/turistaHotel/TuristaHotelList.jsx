import React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TuristaHotelList = ({ turistaHotelList, turista, onDelete }) => {
  function formatDate(fechaISO) {
    const fecha = new Date(fechaISO);

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const año = fecha.getFullYear();

    const horas = fecha.getHours();
    const minutos = String(fecha.getMinutes()).padStart(2, '0');

    const amPm = horas >= 12 ? 'PM' : 'AM';
    const horas12 = horas % 12 || 12; // Convierte el reloj de 24 horas a 12 horas

    return `${dia}/${mes}/${año} ${horas12}:${minutos} ${amPm}`;
  }
  return (
    <div className="flex-1 px-12">
      <h1 className="text-3xl font-bold text-center mb-4">Vuelos de {turista.NOMBRE1}</h1>
      <div className="overflow-hidden shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-left text-gray-600">Hotel</th>
              <th className="py-2 px-4 border-b text-left text-gray-600">Regimen</th>
              <th className="py-2 px-4 border-b text-left text-gray-600">fecha Llegada</th>
              <th className="py-2 px-4 border-b text-left text-gray-600">fecha Partida</th>
              <th className="py-2 px-4 border-b text-left text-gray-600" />
            </tr>
          </thead>
          <tbody>
            {turistaHotelList.map((turistaHotel) => (
              <tr key={turistaHotel.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{turistaHotel.NOMBRE_HOTEL}</td>
                <td className="py-2 px-4 border-b">{turistaHotel.REGIMEN_NOMBRE}</td>
                <td className="py-2 px-4 border-b">{formatDate(turistaHotel.FECHA_LLEGADA)}</td>
                <td className="py-2 px-4 border-b">{formatDate(turistaHotel.FECHA_PARTIDA)}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex ">
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => onDelete(turistaHotel)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TuristaHotelList;
