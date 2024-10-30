import React, { useEffect, useState } from 'react';
import { createSucursal, deleteSucursal, getSucursales, updateSucursal } from '../../services/api';
import SucursalesList from './SucurcalesList';
import SucursalesForm from './SucursalesForm';

const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [sucursal, setSucursal] = useState({ CODIGO_SUC: '', DIRECCION: '', TELEFONO: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSucursales = async () => {
    try {
      const data = await getSucursales();
      setSucursales(data);
    } catch (err) {
      setError('Error al obtener las sucursales');
    } finally {
      setLoading(false);
    }
  };

  const onLoadSucursal = (sucursalData) => setSucursal(sucursalData);

  const onSave = async (formData) => {
    if (formData.CODIGO_SUC) {
      await updateSucursal(formData);
    } else {
      await createSucursal(formData);
    }
    setSucursal({ CODIGO_SUC: '', DIRECCION: '', TELEFONO: '' });
    await fetchSucursales();
  };

  const onDelete = async (formData) => {
    await deleteSucursal(formData);
    await fetchSucursales();
  };

  useEffect(() => {
    fetchSucursales();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>; // Muestra un mensaje de carga
  if (error) return <p className="text-red-500 text-center">s{error}</p>; // Muestra un mensaje de error

  return (
    <div className=" mx-auto mt-8 flex">
      <div className="w-1/3">
        <SucursalesForm data={sucursal} onSave={onSave} />
      </div>
      <div className="w-2/3">
        <SucursalesList sucursales={sucursales} onEdit={onLoadSucursal} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default Sucursales;
