const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController');

router.get('/', factureController.findAll);
router.get('/:id', factureController.findById);
router.post('/', factureController.create);
router.put('/:id', factureController.update);
router.delete('/:id', factureController.delete);

module.exports = router;