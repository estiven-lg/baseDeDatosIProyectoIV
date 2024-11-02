const claseModel = require('../models/claseModel');

async function getAllClases(req, res) {
  try {
    const clases = await claseModel.getAllClases();
    res.json(clases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllClases,
};
