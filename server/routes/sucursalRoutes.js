const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

router.post('/', sucursalController.createSucursal);
router.get('/', sucursalController.getAllSucursales);
router.get('/:id', sucursalController.getSucursalById);
router.put('/:id', sucursalController.updateSucursal);
router.delete('/:id', sucursalController.deleteSucursal);

module.exports = router;
