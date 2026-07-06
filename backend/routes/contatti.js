const express = require('express');
const router = express.Router();
const contattiController = require('../controllers/contattiController');

router.post('/contatti', contattiController.inviaFormContatti);

module.exports = router;