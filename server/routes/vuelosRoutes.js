const express = require('express');
const router = express.Router();
const vueloController = require('../controllers/vueloController');

router.post('/', vueloController.createVuelo);
router.get('/', vueloController.getAllVuelos);
router.get('/:id', vueloController.getVueloById);
router.put('/:id', vueloController.updateVuelo);
router.delete('/:id', vueloController.deleteVuelo);

module.exports = router;
