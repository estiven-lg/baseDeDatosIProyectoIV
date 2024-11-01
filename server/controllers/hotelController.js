const hotelModel = require('../models/hotelModel');

async function getAllHotels(req, res) {
  try {
    const hotels = await hotelModel.getAllHotels();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getHotelById(req, res) {
  try {
    const hotel = await hotelModel.getHotelById(req.params.codigoHotel);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createHotel(req, res) {
  try {
    await hotelModel.createHotel(req.body);
    res.status(201).json({ message: 'Hotel created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateHotel(req, res) {
  try {
    await hotelModel.updateHotel(req.body);
    res.json({ message: 'Hotel updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteHotel(req, res) {
  try {
    await hotelModel.deleteHotel(parseInt(req.params.id, 10));
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
};
