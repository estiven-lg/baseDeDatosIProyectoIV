import React, { useEffect, useState } from 'react';
import { createVuelo, deleteVuelo, getVuelos, updateVuelo } from '../../services/api';
import VuelosList from './VuelosList';
import VuelosForm from './VueloForm';

const defaulValues = {
  FECHA: null,
  ORIGEN: '',
  DESTINO: '',
  NUM_PLAZA_DISP: 0,
};

const Vuelos = () => {
  const [vuelos, setVuelos] = useState([]);
  const [vuelo, setVuelo] = useState(defaulValues);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVuelos = async () => {
    try {
      const data = await getVuelos();
      setVuelos(data);
    } catch (err) {
      setError('Error al obtener las vuelos');
    } finally {
      setLoading(false);
    }
  };

  const onLoadVuelo = (hotelData) => setVuelo(hotelData);

  const onSave = async (formData) => {
    if (formData.NUM_VUELO) {
      await updateVuelo(formData);
    } else {
      await createVuelo(formData);
    }
    setVuelo(defaulValues);
    await fetchVuelos();
  };

  const onDelete = async (formData) => {
    await deleteVuelo(formData);
    await fetchVuelos();
  };

  useEffect(() => {
    fetchVuelos();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>; // Muestra un mensaje de carga
  if (error) return <p className="text-red-500 text-center">s{error}</p>; // Muestra un mensaje de error

  return (
    <div className=" mx-auto mt-8 flex flex-col">
      <div className="w-full">
        <VuelosList vuelos={vuelos} onEdit={onLoadVuelo} onDelete={onDelete} />
      </div>
      <div className="w-full">
        <VuelosForm data={vuelo} onSave={onSave} />
      </div>
    </div>
  );
};

export default Vuelos;
