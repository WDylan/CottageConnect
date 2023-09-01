const Favori = require('../models/favoriModel');

exports.findAll = (req, res) => {
    Favori.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la récupération des favoris.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    Favori.findById(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Favori avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la récupération du favori avec l'ID ${id}.`
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

    const newFavori = new Favori({
        id_cottages: req.body.id_cottages,
        id_users: req.body.id_users,
        
    });

    Favori.create(newFavori, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la création du favori.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Favori.delete(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Favori avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la suppression du favori avec l'ID ${id}.`
                });
            }
        } else {
            res.send({ message: 'Favori supprimé avec succès !' });
        }
    });
};