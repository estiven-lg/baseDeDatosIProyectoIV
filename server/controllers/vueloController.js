// controllers/vueloController.js
const vueloModel = require('../models/vueloModel');

async function getAllVuelos(req, res) {
  try {
    const vuelos = await vueloModel.getAllVuelos();
    res.json(vuelos);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving vuelos', error });
  }
}

async function getVueloById(req, res) {
  const numVuelo = req.params.id;
  try {
    const vuelo = await vueloModel.getVueloById(numVuelo);
    if (!vuelo) {
      return res.status(404).json({ message: 'Vuelo not found' });
    }
    res.json(vuelo);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving vuelo', error });
  }
}

async function createVuelo(req, res) {
  const vuelo = req.body;
  try {
    await vueloModel.createVuelo(vuelo);
    res.status(201).json({ message: 'Vuelo created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating vuelo', error });
  }
}

async function updateVuelo(req, res) {
  const numVuelo = req.params.id;
  const vuelo = req.body;
  try {
    await vueloModel.updateVuelo(numVuelo, vuelo);
    res.json({ message: 'Vuelo updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vuelo', error });
  }
}

async function deleteVuelo(req, res) {
  const numVuelo = req.params.id;
  try {
    await vueloModel.deleteVuelo(numVuelo);
    res.json({ message: 'Vuelo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vuelo', error });
  }
}

module.exports = {
  getAllVuelos,
  getVueloById,
  createVuelo,
  updateVuelo,
  deleteVuelo,
};
