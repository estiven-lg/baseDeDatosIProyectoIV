const express = require('express');
const router = express.Router();
const hospedajeController = require('../controllers/hospedajeController');


router.get('/', hospedajeController.getAllHospedajes);


module.exports = router;
