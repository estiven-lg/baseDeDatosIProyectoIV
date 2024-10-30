import React, { useEffect, useState } from 'react';
import { getSucursales } from '../../services/api';

function TuristaForm({ onSave, data }) {
  const [sucursales, setSucursales] = useState([]);

  const [formData, setFormData] = useState({
    DIRECCION: '',
    SUC_CONTRATADA: '',
    NOMBRE1: '',
    NOMBRE2: '',
    NOMBRE3: '',
    APELLIDO1: '',
    APELLIDO2: '',
    PAIS: '',
    CORREOS: [''],
    TELEFONOS: [''],
  });

  const getSucursalesList = async () => {
    const sucursales = await getSucursales();
    setSucursales(sucursales);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (index, type, value) => {
    const updatedArray = [...formData[type]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [type]: updatedArray,
    }));
  };

  const handleAddField = (type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ''],
    }));
  };

  const handleRemoveField = (type, index) => {
    const updatedArray = formData[type].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [type]: updatedArray,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  useEffect(() => setFormData(data), [data]);
  useEffect(() => {
    getSucursalesList();
  }, []);

  return (
    <div className="bg-white shadow-md rounded mx-12 px-6 py-6 mt-10 flex-1">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-10">
          <div className="mb-4">
            <label htmlFor="NOMBRE1" className="block text-gray-700 font-medium mb-2">
              Nombre 1
            </label>
            <input
              type="text"
              id="NOMBRE1"
              name="NOMBRE1"
              value={formData.NOMBRE1}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre 1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="NOMBRE2" className="block text-gray-700 font-medium mb-2">
              Nombre 2
            </label>
            <input
              type="text"
              id="NOMBRE2"
              name="NOMBRE2"
              value={formData.NOMBRE2 || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre 2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="NOMBRE3" className="block text-gray-700 font-medium mb-2">
              Nombre 3
            </label>
            <input
              type="text"
              id="NOMBRE3"
              name="NOMBRE3"
              value={formData.NOMBRE3 || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre 3"
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="mb-4">
            <label htmlFor="APELLIDO1" className="block text-gray-700 font-medium mb-2">
              Apellido 1
            </label>
            <input
              type="text"
              id="APELLIDO1"
              name="APELLIDO1"
              value={formData.APELLIDO1}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Apellido 1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="APELLIDO2" className="block text-gray-700 font-medium mb-2">
              Apellido 2
            </label>
            <input
              type="text"
              id="APELLIDO2"
              name="APELLIDO2"
              value={formData.APELLIDO2}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Apellido 2"
              required
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="mb-4">
            <label htmlFor="SUC_CONTRATADA" className="block text-gray-700 font-medium mb-2">
              Sucursal Contratada
            </label>
            <select
              id="SUC_CONTRATADA"
              name="SUC_CONTRATADA"
              value={formData.SUC_CONTRATADA}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione una sucursal</option>
              {sucursales.map((sucursal) => (
                <option value={sucursal.CODIGO_SUC}>{sucursal.DIRECCION}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="PAIS" className="block text-gray-700 font-medium mb-2">
              País
            </label>
            <input
              type="text"
              id="PAIS"
              name="PAIS"
              value={formData.PAIS}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="País de origen"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Correos</label>
            {formData.CORREOS.map((correo, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => handleArrayChange(index, 'CORREOS', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Correo electrónico"
                  required
                />
                {formData.CORREOS.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveField('CORREOS', index)}
                    className="ml-2 text-red-500 font-bold"
                  >
                    x
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField('CORREOS')}
              className="text-blue-500 font-medium"
            >
              + Agregar otro correo
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Teléfonos</label>
            {formData.TELEFONOS.map((telefono, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => handleArrayChange(index, 'TELEFONOS', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Número de teléfono"
                  required
                />
                {formData.TELEFONOS.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveField('TELEFONOS', index)}
                    className="ml-2 text-red-500 font-bold"
                  >
                    x
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField('TELEFONOS')}
              className="text-blue-500 font-medium"
            >
              + Agregar otro teléfono
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {formData.CODIGO_TURISTA ? 'Actualizar Turista' : 'Agregar Turista'}
        </button>
      </form>
    </div>
  );
}

export default TuristaForm;
