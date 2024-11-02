import React, { useEffect, useState } from 'react';
import { createTurista, deleteTurista, getTuristas, updateTurista } from '../../services/api';
import TuristasList from './TuristasList';
import TuristasForm from './TuristaForm';
import TuristaVuelo from '../turistaVuelo/TuristaVuelo';
import TuristaHotel from '../turistaHotel/TuristaHotel';

const defaulValues = {
  DIRECCION: '',
  SUC_CONTRATADA: '',
  NOMBRE1: '',
  NOMBRE2: '',
  NOMBRE3: '',
  APELLIDO1: '',
  APELLIDO2: '',
  PAIS: '',
  CORREOS: [{ CORREO: '' }],
  TELEFONOS: [{ NUM_TELEFONO: '' }],
};

const Turistas = () => {
  const [turistas, setTuristas] = useState([]);
  const [turista, setTurista] = useState(defaulValues);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTuristas = async () => {
    try {
      const data = await getTuristas();
      setTuristas(data);
    } catch (err) {
      setError('Error al obtener las turistas');
    } finally {
      setLoading(false);
    }
  };

  const onLoadTurista = (sucursalData) => setTurista(sucursalData);

  const onSave = async (formData) => {
    if (formData.CODIGO_TURISTA) {
      await updateTurista(formData);
    } else {
      await createTurista(formData);
    }

    setTurista(defaulValues);
    await fetchTuristas();
  };

  const onDelete = async (formData) => {
    await deleteTurista(formData);
    await fetchTuristas();
  };

  useEffect(() => {
    fetchTuristas();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>; // Muestra un mensaje de carga
  if (error) return <p className="text-red-500 text-center">s{error}</p>; // Muestra un mensaje de error

  return (
    <div className=" mx-auto mt-8 flex flex-col">
      <div className="w-full">
        <TuristasList turistas={turistas} onEdit={onLoadTurista} onDelete={onDelete} />
      </div>
      <div className="w-full">
        <TuristasForm data={turista} onSave={onSave} />
      </div>
      {turista.CODIGO_TURISTA && (
        <div className="w-full">
          <TuristaVuelo turista={turista} />
        </div>
      )}
      {turista.CODIGO_TURISTA && (
        <div className="w-full">
          <TuristaHotel turista={turista} />
        </div>
      )}
    </div>
  );
};

export default Turistas;
