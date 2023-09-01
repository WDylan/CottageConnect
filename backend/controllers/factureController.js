const Facture = require('../models/factureModel');

exports.findAll = (req, res) => {
    Facture.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la récupération des factures.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    Facture.findById(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Facture avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la récupération de la facture avec l'ID ${id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne peut pas être vide.'
        });
    }

    const newFacture = new Facture({

        date_start: req.body.date_start,
        date_end: req.body.date_end,
        cottage_id: req.body.cottage_id,
        cottage_name: req.body.cottage_name,
        cottage_adress: req.body.cottage_adress,
        client_id: req.body.client_id,
        client_username: req.body.client_username,
        client_firstname: req.body.client_firstname,
        client_lastname: req.body.client_lastname,
        client_email: req.body.client_email,
        client_phone: req.body.client_phone,
        client_postal: req.body.client_postal,
        client_adress: req.body.client_adress,
        proprio_id: req.body.proprio_id,
        proprio_firstname: req.body.proprio_firstname,
        proprio_username: req.body.proprio_username,
        proprio_lastname: req.body.proprio_lastname,
        proprio_email: req.body.proprio_email,
        proprio_phone: req.body.proprio_phone,
        proprio_postal: req.body.proprio_postal,
        proprio_adress: req.body.proprio_adress,
        duration: req.body.duration,
        price: req.body.price,
        nombre_personnes: req.body.nombre_personnes,
        

    });

    Facture.create(newFacture, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la création de la facture.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne peut pas être vide.'
        });
    }

    const id = req.params.id;

    const updated = new Facture({
        date_start: req.body.date_start,
        date_end: req.body.date_end,
        cottage_id: req.body.cottage_id,
        cottage_name: req.body.cottage_name,
        cottage_adress: req.body.cottage_adress,
        client_id: req.body.client_id,
        client_username: req.body.client_username,
        client_firstname: req.body.client_firstname,
        client_lastname: req.body.client_lastname,
        client_email: req.body.client_email,
        client_phone: req.body.client_phone,
        client_postal: req.body.client_postal,
        client_adress: req.body.client_adress,
        proprio_id: req.body.proprio_id,
        proprio_firstname: req.body.proprio_firstname,
        proprio_username: req.body.proprio_username,
        proprio_lastname: req.body.proprio_lastname,
        proprio_email: req.body.proprio_email,
        proprio_phone: req.body.proprio_phone,
        proprio_postal: req.body.proprio_postal,
        proprio_adress: req.body.proprio_adress,
        duration: req.body.duration,
        price: req.body.price,
        nombre_personnes: req.body.nombre_personnes,
        

    });

    Facture.update(id, updated, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `La facture avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la mise à jour de la facture avec l'ID ${id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Facture.delete(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Facture avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la suppression de la facture avec l'ID ${id}.`
                });
            }
        } else {
            res.send({ message: 'Facture supprimée avec succès !' });
        }
    });
};