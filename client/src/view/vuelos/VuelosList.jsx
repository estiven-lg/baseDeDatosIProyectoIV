import React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const VuelosList = ({ vuelos, onEdit, onDelete }) => {
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
      <h1 className="text-3xl font-bold text-center mb-4">Vuelos</h1>
      <div className="overflow-hidden shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">
                Número de Vuelo
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Fecha</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Origen</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Destino</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">
                Plazas Disponibles
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-600" />
            </tr>
          </thead>
          <tbody>
            {vuelos.map((vuelo) => (
              <tr key={vuelo.NUM_VUELO} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-xs">{vuelo.NUM_VUELO}</td>
                <td className="py-2 px-4 border-b text-xs">{formatDate(vuelo.FECHA)}</td>
                <td className="py-2 px-4 border-b text-xs">{vuelo.ORIGEN}</td>
                <td className="py-2 px-4 border-b text-xs">{vuelo.DESTINO}</td>
                <td className="py-2 px-4 border-b text-xs">{vuelo.NUM_PLAZA_DISP}</td>
                <td className="py-2 px-4 border-b text-xs">
                  <div className="flex space-x-2">
                    <Button
                      size="small"
                      variant="contained"
                      color="info"
                      onClick={() => onEdit(vuelo)}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => onDelete(vuelo)}
                    >
                      <DeleteIcon fontSize="small" />
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

export default VuelosList;
