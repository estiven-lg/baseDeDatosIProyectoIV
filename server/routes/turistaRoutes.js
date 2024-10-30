const express = require('express');
const router = express.Router();
const turistaController = require('../controllers/turistaController');

router.get('/', turistaController.getTuristas);
router.post('/', turistaController.createTurista);
router.get('/:id', turistaController.getTurista);
router.put('/:id', turistaController.updateTurista);
router.delete('/:id', turistaController.deleteTurista);

module.exports = router;
