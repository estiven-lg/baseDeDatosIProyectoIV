import React, { useEffect, useState } from 'react';
import { createHotel, deleteHotel, getHoteles, updateHotel } from '../../services/api';
import HotelesList from './HotelesList';
import HotelesForm from './HotelForm';

const defaulValues = {
  CODIGO_HOTEL: '',
  NOMBRE: '',
  DIRECCION: '',
  CIUDAD: '',
  TELEFONO: '',
  NUM_PLAZAS_DISP: 0,
};

const Hoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [hotel, setHotel] = useState(defaulValues);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHoteles = async () => {
    
    try {
      const data = await getHoteles();
      setHoteles(data);
    } catch (err) {
      setError('Error al obtener las hoteles');
    } finally {
      setLoading(false);
    }
  };

  const onLoadHotel = (hotelData) => setHotel(hotelData);

  const onSave = async (formData) => {
    if (formData.CODIGO_HOTEL) {
      await updateHotel(formData);
    } else {
      await createHotel(formData);
    }
    setHotel(defaulValues);
    await fetchHoteles();
  };

  const onDelete = async (formData) => {
    await deleteHotel(formData);
    await fetchHoteles();
  };

  useEffect(() => {
    fetchHoteles();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>; // Muestra un mensaje de carga
  if (error) return <p className="text-red-500 text-center">s{error}</p>; // Muestra un mensaje de error

  return (
    <div className=" mx-auto mt-8 flex flex-col">
      <div className="w-full">
        <HotelesList hoteles={hoteles} onEdit={onLoadHotel} onDelete={onDelete} />
      </div>
      <div className="w-full">
        <HotelesForm data={hotel} onSave={onSave} />
      </div>
    </div>
  );
};

export default Hoteles;
