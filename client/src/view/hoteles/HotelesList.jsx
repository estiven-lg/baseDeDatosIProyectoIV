import React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const HotelesList = ({ hoteles, onEdit, onDelete }) => {
  return (
    <div className="flex-1 px-12">
      <h1 className="text-3xl font-bold text-center mb-4">Hoteles</h1>
      <div className="overflow-hidden shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Código Hotel</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Nombre</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Dirección</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Teléfono</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Cupos</th>
              <th className="py-2 px-4 border-b text-left text-gray-600" />
            </tr>
          </thead>
          <tbody>
            {hoteles.map((hotel) => (
              <tr key={hotel.CODIGO_HOTEL} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-xs">{hotel.CODIGO_HOTEL}</td>
                <td className="py-2 px-4 border-b text-xs">{hotel.NOMBRE}</td>
                <td className="py-2 px-4 border-b text-xs">{hotel.DIRECCION}</td>
                <td className="py-2 px-4 border-b text-xs">{hotel.TELEFONO}</td>
                <td className="py-2 px-4 border-b text-xs">{hotel.NUM_PLAZAS_DISP}</td>
                <td className="py-2 px-4 border-b text-xs">
                  <div className="flex space-x-2">
                    <Button
                      size="small"
                      variant="contained"
                      color="info"
                      onClick={() => onEdit(hotel)}
                    >
                      <EditIcon fontSize='small'/>
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => onDelete(hotel)}
                    >
                      <DeleteIcon fontSize='small'/>
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

export default HotelesList;
