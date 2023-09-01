const express = require('express');
const router = express.Router();
const cottageController = require('../controllers/cottageController');

router.get('/', cottageController.findAll);
router.get('/cottage/:id', cottageController.findById);
router.get('/category/:id', cottageController.findByCategoryId);
router.get('/cottage/:nombre_personnes/:date_start/:date_end/:city', cottageController.findByMombrePersonneAndDateStartAndDateEndAndVille);
router.post('/cottage/', cottageController.create);
router.post('/withAdress/', cottageController.createWithAdress);
router.put('/cottage/:id', cottageController.update);
router.delete('/cottage/:id', cottageController.delete);
router.get('/tri/cottages/:limit', cottageController.res_Count);// fonction recupérer cottages par Nombre de reservations
router.get('/rand/cottages', cottageController.res_Rand);// fonction recupérer cottages aléatoirement
module.exports = router;