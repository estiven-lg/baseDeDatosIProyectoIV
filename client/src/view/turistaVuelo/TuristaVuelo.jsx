import React, { useEffect, useState } from 'react';
import { addTuristaVuelos, deleteTuristaVuelos, getTuristaVuelos } from '../../services/api';
import SucursalesList from './TuristaVueloList';
import TuristaVueloForm from './TuristaVueloForm';

const TuristaVuelo = ({ turista }) => {
  const [turistaVueloList, setTuristaVueloList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTuristaVuelos = async () => {
    try {
      setLoading(true);
      const data = await getTuristaVuelos(turista.CODIGO_TURISTA);
      setTuristaVueloList(data);
    } catch (err) {
      setError('Error al obtener las turistaVueloList');
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (formData) => {
    await addTuristaVuelos({ TURISTA: turista.CODIGO_TURISTA, ...formData });
    setTuristaVueloList({ VUELO: null, CLASE: null });
    await fetchTuristaVuelos();
  };

  const onDelete = async (formData) => {
    await deleteTuristaVuelos({ VUELO: formData.VUELO, TURISTA: turista.CODIGO_TURISTA });
    await fetchTuristaVuelos();
  };

  useEffect(() => {
    fetchTuristaVuelos();
  }, [turista]);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>; // Muestra un mensaje de carga
  if (error) return <p className="text-red-500 text-center">s{error}</p>; // Muestra un mensaje de error

  return (
    <div className=" mx-auto mt-8 flex">
      <div className="w-1/3">
        <TuristaVueloForm onSave={onSave} />
      </div>
      <div className="w-2/3">
        <SucursalesList turistaVueloList={turistaVueloList} turista={turista} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default TuristaVuelo;
