const express = require('express');
const router = express.Router();
const commoditieController = require('../controllers/commoditieController');

router.get('/', commoditieController.findAll);
router.get('/:id', commoditieController.findById);
router.post('/', commoditieController.create);
router.put('/:id', commoditieController.update);
router.delete('/:id', commoditieController.delete);

module.exports = router;