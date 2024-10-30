import React, { useEffect, useState } from 'react';
import { getTuristas, updateTurista } from '../../services/api';
import TuristasList from './TuristasList';
import TuristasForm from './TuristaForm';

const defaulValues = {
  DIRECCION: '',
  SUCCONTRATADA: '',
  NOMBRE1: '',
  NOMBRE2: '',
  NOMBRE3: '',
  APELLIDO1: '',
  APELLIDO2: '',
  PAIS: '',
  CORREOS: [''],
  TELEFONOS: [''],
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
    await updateTurista(formData);

    setTurista(defaulValues);
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
        <TuristasList turistas={turistas} onEdit={onLoadTurista} />
      </div>
      <div className="w-full">
        <TuristasForm data={turista} onSave={onSave} />
      </div>
    </div>
  );
};

export default Turistas;
