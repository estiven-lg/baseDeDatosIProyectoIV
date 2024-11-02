import React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const SucursalesList = ({ turistaVueloList, turista, onDelete }) => {
  return (
    <div className="flex-1 px-12">
      <h1 className="text-3xl font-bold text-center mb-4">Vuelos de {turista.NOMBRE1}</h1>
      <div className="overflow-hidden shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-left text-gray-600">Vuelo</th>
              <th className="py-2 px-4 border-b text-left text-gray-600">Clase</th>
              <th className="py-2 px-4 border-b text-left text-gray-600" />
            </tr>
          </thead>
          <tbody>
            {turistaVueloList.map((turistaVuelo) => (
              <tr key={turistaVuelo.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  {turistaVuelo.ORIGEN} - {turistaVuelo.DESTINO}
                </td>
                <td className="py-2 px-4 border-b">{turistaVuelo.NOM_CLASE}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex ">
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => onDelete(turistaVuelo)}
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

export default SucursalesList;
