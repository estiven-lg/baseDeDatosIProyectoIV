const Sucursal = require('../models/sucursalModel');

// Crear una nueva sucursal
exports.createSucursal = async (req, res) => {
  try {
    const { DIRECCION, TELEFONO } = req.body;
    const result = await Sucursal.createSucursal({ DIRECCION, TELEFONO });
    res.status(201).json({ message: 'Sucursal creada exitosamente', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la sucursal', error });
  }
};

// Obtener todas las sucursales
exports.getAllSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.getAllSucursales();
    res.status(200).json(sucursales);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener sucursales', error });
  }
};

// Obtener una sucursal por su ID
exports.getSucursalById = async (req, res) => {
  try {
    const CODIGO_SUC = parseInt(req.params.id, 10);
    const sucursal = await Sucursal.getSucursalById(CODIGO_SUC);
    if (!sucursal) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }
    res.status(200).json(sucursal);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la sucursal', error });
  }
};

// Actualizar una sucursal
exports.updateSucursal = async (req, res) => {
  try {
    const CODIGO_SUC = parseInt(req.params.id, 10);
    const { DIRECCION, TELEFONO } = req.body;
    const result = await Sucursal.updateSucursal(CODIGO_SUC, { DIRECCION, TELEFONO });
    res.status(200).json({ message: 'Sucursal actualizada exitosamente', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la sucursal', error });
  }
};

// Eliminar una sucursal
exports.deleteSucursal = async (req, res) => {
  try {
    const CODIGO_SUC = parseInt(req.params.id, 10);
    await Sucursal.deleteSucursal(CODIGO_SUC);
    res.status(200).json({ message: 'Sucursal eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la sucursal', error });
  }
};
