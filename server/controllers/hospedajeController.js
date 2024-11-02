const hospedajeModel = require('../models/hospedajeModel');

async function getAllHospedajes(req, res) {
  try {
    const hospedajes = await hospedajeModel.getAllHospedajes();
    res.json(hospedajes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllHospedajes,
};
