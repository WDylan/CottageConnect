const Cottage = require('../models/cottageModel');
const Picture = require('../models/pictureModel');
const Adress = require('../models/adressModel');


exports.findAll = (req, res) => {
    Cottage.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la récupération des cottages.'
            });
        } else {
            res.send(data);
        }
    });
};
exports.findByCategoryId = (req, res) => {
    const id = req.params.id;

    Cottage.findByCategoryId(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Cottage avec la category ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la récupération du cottage avec la category ID ${id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};
exports.findById = (req, res) => {
    const id = req.params.id;

    Cottage.findById(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Cottage avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la récupération du cottage avec l'ID ${id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.findByMombrePersonneAndDateStartAndDateEndAndVille = (req, res) => {
    const nombre_personnes = req.params.nombre_personnes;
    const date_start = req.params.date_start;
    const date_end = req.params.date_end;
    const city = req.params.city;
    
    Cottage.findByMombrePersonneAndDateStartAndDateEndAndVille(nombre_personnes, date_start, date_end, city, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Cottage introuvable avec comme filtre ${nombre_personnes}, ${date_start}, ${date_end}`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la récupération du cottage avec comme filtre ${nombre_personnes}, ${date_start}, ${date_end}.`
                });
            }
        } else {
            res.send(data);
        }
    })
}
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne peut pas être vide.'
        });
    }
    let date = new Date()
    date = date.toISOString().split('T')[0];
    const newCottage = new Cottage({
        name: req.body.name,
        date_creation: date,
        content: req.body.content,
        dayprice: req.body.dayprice,
        caution: req.body.caution,
        res_count: 0,
        max_personnes: req.body.max_personnes,
        id_prestation: req.body.id_prestation,
        id_adress: req.body.id_adress,
        id_categories: req.body.id_categories,
        id_proprio: req.body.id_proprio,
    });

    Cottage.create(newCottage, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la création du cottage.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.createWithAdress = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne peut pas être vide.'
        });
    }
    console.log(req.body);
    const newAdress = new Adress({
        adress: req.body.adress,
        code_postal: req.body.code_postal,
        city: req.body.city,
        id_regions: req.body.id_regions,
    });
    
    let date = new Date()
    date = date.toISOString().split('T')[0];
    
    Adress.create(newAdress, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                err.message || 'Une erreur s\'est produite lors de la création de l\'adress.'
            });
        } else {
            const newCottage = new Cottage({
                name: req.body.name,
                date_creation: date,
                content: req.body.content,
                dayprice: req.body.dayprice,
                caution: req.body.caution,
                res_count: 0,
                max_personnes: req.body.max_personnes,
                id_prestation: req.body.id_prestation,
                id_adress: data.id,
                id_categories: req.body.id_categories,
                id_proprio: req.body.id_proprio,
            });
            Cottage.create(newCottage, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message:
                            err.message || 'Une erreur s\'est produite lors de la création du cottage.'
                    });
                } else {
                    res.send(data);
                }
            });
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

    const updated = new Cottage({
        name: req.body.name,
        date_creation: req.body.date_creation,
        content: req.body.content,
        dayprice: req.body.dayprice,
        caution: req.body.caution,
        res_count: req.body.res_count,
        max_personnes: req.body.max_personnes,
        id_adress: req.body.id_adress,
        id_categories: req.body.id_categories,
        id_proprio: req.body.id_proprio,
    });

    Cottage.update(id, updated, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Cottage avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la mise à jour du cottage avec l'ID ${id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Cottage.delete(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Cottage avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la suppression du cottage avec l'ID ${id}.`
                });
            }
        } else {
            res.send({ message: 'Cottage supprimé avec succès !' });
        }
    });
};

// fonction recupérer cottages par Nombre de reservations

exports.res_Count = (req, res) => {
    const limit = req.params.limit
    Cottage.res_Count(limit, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la récupération des cottages.'
            });
        } else {
            res.send(data);
        }
    });
};

// fonction recupérer cottages aléatoirement
exports.res_Rand = (req, res) => {
    Cottage.res_Rand((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la récupération des cottages.'
            });
        } else {
            res.send(data);
        }
    });
};