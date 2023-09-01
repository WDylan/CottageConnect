const express = require('express');
const router = express.Router();
const favoriController = require('../controllers/favorieController');

router.get('/', favoriController.findAll);
router.get('/:id', favoriController.findById);
router.post('/', favoriController.create);
router.delete('/:id', favoriController.delete);

module.exports = router;