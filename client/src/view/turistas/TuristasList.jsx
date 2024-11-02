import React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TuristasList = ({ turistas, onEdit, onDelete }) => {
  return (
    <div className="flex-1 px-12">
      <h1 className="text-3xl font-bold text-center mb-4">TuristasList</h1>
      <div className="overflow-hidden shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Código Turista</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Sucursal Contratada</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Nombre Completo</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">País</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Correos</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-xs">Teléfonos</th>
              <th className="py-2 px-4 border-b text-left text-gray-600" />
            </tr>
          </thead>
          <tbody>
            {turistas.map((turista) => (
              <tr key={turista.CODIGO_TURISTA} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-xs">{turista.CODIGO_TURISTA}</td>
                <td className="py-2 px-4 border-b text-xs">{turista.DIRECCION}</td>
                <td className="py-2 px-4 border-b text-xs">
                  {`${turista.NOMBRE1} ${turista.NOMBRE2 || ''} ${turista.NOMBRE3 || ''} ${
                    turista.APELLIDO1
                  } ${turista.APELLIDO2}`}
                </td>
                <td className="py-2 px-4 border-b text-xs">{turista.PAIS}</td>
                <td className="py-2 px-4 border-b text-xs">
                  {turista.CORREOS.map((correo, index) => (
                    <div key={index}>{correo.CORREO}</div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b text-xs">
                  {turista.TELEFONOS.map((telefono, index) => (
                    <div key={index}>{telefono.NUM_TELEFONO}</div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b text-xs">
                  <div className="flex space-x-2">
                    <Button
                      size="small"
                      variant="contained"
                      color="info"
                      onClick={() => onEdit(turista)}
                    >
                      <EditIcon fontSize='small'/>
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => onDelete(turista)}
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

export default TuristasList;
