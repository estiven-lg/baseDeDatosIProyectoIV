import React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SucursalesList = ({ sucursales, onEdit, onDelete }) => {
  return (
    <div className="flex-1 px-12">
      <h1 className="text-3xl font-bold text-center mb-4">SucursalesList</h1>
      <div className="overflow-hidden shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-left text-gray-600">codigo sucursal</th>
              <th className="py-2 px-4 border-b text-left text-gray-600">Dirección</th>
              <th className="py-2 px-4 border-b text-left text-gray-600">Teléfono</th>
              <th className="py-2 px-4 border-b text-left text-gray-600" />
            </tr>
          </thead>
          <tbody>
            {sucursales.map((sucursal) => (
              <tr key={sucursal.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{sucursal.CODIGO_SUC}</td>
                <td className="py-2 px-4 border-b">{sucursal.DIRECCION}</td>
                <td className="py-2 px-4 border-b">{sucursal.TELEFONO}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex ">
                    <Button
                      size="small"
                      variant="contained"
                      color="info"
                      onClick={() => onEdit(sucursal)}
                    >
                      <EditIcon />
                    </Button>
                    <Button size="small" variant="contained" color="error"  onClick={() => onDelete(sucursal)}>
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
