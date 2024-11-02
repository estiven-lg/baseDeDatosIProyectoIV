const TuristaVuelo = require('../models/turistaVueloModel');

// Crear una nueva relación turista-vuelo
exports.createTuristaVuelo = async (req, res) => {
  try {
    const { TURISTA, VUELO, CLASE } = req.body;
    const result = await TuristaVuelo.createTuristaVuelo({ TURISTA, VUELO, CLASE });
    res.status(201).json({ message: 'Relación turista-vuelo creada exitosamente', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la relación turista-vuelo', error });
  }
};

// Obtener todas las relaciones turista-vuelo
exports.getAllTuristaVuelos = async (req, res) => {
  try {
    const relaciones = await TuristaVuelo.getAllTuristaVuelos();
    res.status(200).json(relaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las relaciones turista-vuelo', error });
  }
};

// Obtener una relación turista-vuelo por TURISTA y VUELO
exports.getTuristaVueloByIdTuristas = async (req, res) => {
  try {
    const TURISTA = parseInt(req.params.turista, 10);

    const result = await TuristaVuelo.getTuristaVueloByIdTurista(TURISTA);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la relación turista-vuelo', error });
  }
};



// Eliminar una relación turista-vuelo
exports.deleteTuristaVuelo = async (req, res) => {
  try {
    const TURISTA = parseInt(req.params.turista, 10);
    const VUELO = parseInt(req.params.vuelo, 10);
    await TuristaVuelo.deleteTuristaVuelo(TURISTA, VUELO);
    res.status(200).json({ message: 'Relación turista-vuelo eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la relación turista-vuelo', error });
  }
};
