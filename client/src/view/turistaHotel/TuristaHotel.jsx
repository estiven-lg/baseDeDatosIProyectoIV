import React, { useEffect, useState } from 'react';
import { addTuristaHotels, deleteTuristaHotels, getTuristaHotels } from '../../services/api';
import SucursalesList from './TuristaHotelList';
import TuristaHotelForm from './TuristaHotelForm';

const TuristaHotel = ({ turista }) => {
  const [turistaHotelList, setTuristaHotelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTuristaHotels = async () => {
    try {
      setLoading(true);
      const data = await getTuristaHotels(turista.CODIGO_TURISTA);
      setTuristaHotelList(data);
    } catch (err) {
      setError('Error al obtener las turistaHotelList');
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (formData) => {
    await addTuristaHotels({ TURISTA: turista.CODIGO_TURISTA, ...formData });
    setTuristaHotelList({ VUELO: null, CLASE: null });
    await fetchTuristaHotels();
  };

  const onDelete = async (formData) => {
    await deleteTuristaHotels({ VUELO: formData.VUELO, TURISTA: turista.CODIGO_TURISTA });
    await fetchTuristaHotels();
  };

  useEffect(() => {
    fetchTuristaHotels();
  }, [turista]);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>; // Muestra un mensaje de carga
  if (error) return <p className="text-red-500 text-center">s{error}</p>; // Muestra un mensaje de error

  return (
    <div className=" mx-auto mt-8 flex">
      <div className="w-1/3">
        <TuristaHotelForm onSave={onSave} />
      </div>
      <div className="w-2/3">
        <SucursalesList turistaHotelList={turistaHotelList} turista={turista} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default TuristaHotel;
