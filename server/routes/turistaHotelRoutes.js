const express = require('express');
const router = express.Router();
const turistaHotelController = require('../controllers/turistaHotelController');

router.post('/', turistaHotelController.createTuristaHotel);
router.get('/', turistaHotelController.getAllTuristaHotel);
router.get('/:turista', turistaHotelController.getAllTuristaHotelByTurista);
router.delete('/:turista/:hotel', turistaHotelController.deleteTuristaHotel);

module.exports = router;
