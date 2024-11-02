const express = require('express');
const router = express.Router();
const claseController = require('../controllers/claseController');


router.get('/', claseController.getAllClases);


module.exports = router;
