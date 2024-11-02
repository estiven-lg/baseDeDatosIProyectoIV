const TuristaHotel = require('../models/turistaHotelModel');

// Crear una nueva relación turista-hotel
exports.createTuristaHotel = async (req, res) => {
  try {
    const { TURISTA, HOTEL, REGIMEN_HOSP, FECHA_LLEGADA, FECHA_PARTIDA } = req.body;
    const result = await TuristaHotel.createTuristaHotel({
      TURISTA,
      HOTEL,
      REGIMEN_HOSP,
      FECHA_LLEGADA,
      FECHA_PARTIDA,
    });
    res.status(201).json({ message: 'Relación turista-hotel creada exitosamente', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la relación turista-hotel', error });
  }
};

// Obtener todas las relaciones turista-hotel
exports.getAllTuristaHotel = async (req, res) => {
  try {
    const relaciones = await TuristaHotel.getAllTuristaHotel();
    res.status(200).json(relaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las relaciones turista-hotel', error });
  }
};

// Obtener todas las relaciones turista-hotel
exports.getAllTuristaHotelByTurista = async (req, res) => {
  try {
    const TURISTA = parseInt(req.params.turista, 10);
    const relaciones = await TuristaHotel.getAllTuristaHotelByTurista(TURISTA);
    res.status(200).json(relaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las relaciones turista-hotel', error });
  }
};



// Obtener una relación turista-hotel por TURISTA y HOTEL
exports.getTuristaHotelById = async (req, res) => {
  try {
    const TURISTA = parseInt(req.params.turista, 10);
    const HOTEL = parseInt(req.params.hotel, 10);
    const result = await TuristaHotel.getTuristaHotelById(TURISTA, HOTEL);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la relación turista-hotel', error });
  }
};

// Eliminar una relación turista-hotel
exports.deleteTuristaHotel = async (req, res) => {
  try {
    const TURISTA = parseInt(req.params.turista, 10);
    const HOTEL = parseInt(req.params.hotel, 10);
    await TuristaHotel.deleteTuristaHotel(TURISTA, HOTEL);
    res.status(200).json({ message: 'Relación turista-hotel eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la relación turista-hotel', error });
  }
};
