const express = require('express');
const router = express.Router();
const turistaVueloController = require('../controllers/turistaVueloController');

router.post('/', turistaVueloController.createTuristaVuelo);
router.get('/', turistaVueloController.getAllTuristaVuelos);
router.get('/:turista', turistaVueloController.getTuristaVueloByIdTuristas);
router.delete('/:turista/:vuelo', turistaVueloController.deleteTuristaVuelo);

module.exports = router;
