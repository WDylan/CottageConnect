const Picture = require("../models/pictureModel");
const path = require("path");
const fs = require("fs");

exports.getImage = (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "../uploads", imageName);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(imagePath);
      res.status(404).send({
        message: "Image introuvable.",
      });
    } else {
      res.sendFile(imagePath);
    }
  });
};

exports.findAll = (req, res) => {
  Picture.findAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur s'est produite lors de la récupération des pictures.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  Picture.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Picture avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la récupération de la picture avec l'ID ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};
exports.findCottagePicture = (req, res) => {
  const id = req.params.id;

  Picture.findCottagePicture(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Picture du cottage id : ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la récupération de la picture du cottage ID : ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
  if (!req.file) {
    res.status(400).send({
      message: "Aucun fichier séléctionner.",
    });
    return;
  }

  const newPicture = new Picture({
    picture_name: req.file.originalname,
    picture_path: req.file.path,
    id_cottages: req.body.id_cottages,
  });

  Picture.create(newPicture, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur s'est produite lors de la création de l'utilisateur.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu de la requête ne peut pas être vide.",
    });
  }

  const id = req.params.id;

  const updated = new Picture({
    picture_name: req.body.picture_name,
    picture_path: req.body.picture_path,
    id_cottages: req.body.id_cottages,
  });

  Picture.update(id, updated, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Picture avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la mise à jour de la picture avec l'ID ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Picture.delete(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Picture avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la suppression de la picture avec l'ID ${id}.`,
        });
      }
    } else {
      res.send({ message: "Picture supprimé avec succès !" });
    }
  });
};
