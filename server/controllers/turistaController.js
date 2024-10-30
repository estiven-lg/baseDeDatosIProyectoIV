const turistaModel = require('../models/turistaModel');

async function getTurista(req, res) {
  try {
    const CODIGO_TURISTA = req.params.id;
    const turista = await turistaModel.getTurista(CODIGO_TURISTA);
    const contacts = await turistaModel.getTuristaContacts(CODIGO_TURISTA);
    res.json({ turista, contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createTurista(req, res) {
  try {
    const turista = req.body;
    await turistaModel.addTurista(turista);
    await turistaModel.addTuristaContact(turista.codigo, {
      TELEFONOS: turista.TELEFONOS,
      CORREOS: turista.CORREOS,
    });
    res.status(201).json({ message: 'Turista creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTurista(req, res) {
  try {
    const turista = req.body;
    await turistaModel.updateTurista(turista);
    await turistaModel.updateContacts(turista.codigo, {
      TELEFONOS: turista.TELEFONOS,
      CORREOS: turista.CORREOS,
    });
//
    res.json({ message: 'Turista actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTurista(req, res) {
  try {
    const CODIGO_TURISTA = req.params.id;
    await turistaModel.deleteTurista(CODIGO_TURISTA);
    res.json({ message: 'Turista eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controlador para obtener todos los turistas con sus contactos
async function getTuristas(req, res) {
  try {
    const turistas = await turistaModel.getAllTuristas();
    res.status(200).json(turistas);
  } catch (error) {
    console.error('Error in getTuristas:', error);
    res.status(500).json({ message: 'Error fetching turistas' });
  }
}

module.exports = { getTurista, createTurista, updateTurista, deleteTurista, getTuristas };
