const { logDOM } = require("@testing-library/react");
const Reservation = require("../models/reservationModel");

exports.findAll = (req, res) => {
  Reservation.findAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur s'est produite lors de la récupération des reservations.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  Reservation.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Reservation avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la récupération de la reservation avec l'ID ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.findByUser = (req, res) => {
  const id_user = req.params.id_user;

  Reservation.findByUser(id_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Reservation(s) de l'utilisateur avec son ID ${id_user} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la récupération de(s) reservation(s) de l'utilisateur avec son l'ID ${id_user}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
}

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu de la requête ne peut pas être vide.",
    });
  }
  let date = new Date();
  date = date.toISOString().split("T")[0];
  const newReservation = new Reservation({
    created_at: date,
    date_start: req.body.date_start,
    date_end: req.body.date_end,
    duration: req.body.duration,
    nombre_personnes: req.body.nombre_personnes,
    total: req.body.total,
    id_cottages: req.body.id_cottages,
    id_client: req.body.id_client,
  });

  Reservation.create(newReservation, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.Erreur ||
          "Une erreur s'est produite lors de la création de la reservation.",
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
  let date = req.body.created_at;
  const updated = new Reservation({
    created_at: date,
    date_start: req.body.date_start,
    date_end: req.body.date_end,
    duration: req.body.duration,
    nombre_personnes: req.body.nombre_personnes,
    total: req.body.total,
    id_cottages: req.body.id_cottages,
    id_client: req.body.id_client,
  });

  Reservation.update(id, updated, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Reservation avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la mise à jour de la reservation avec l'ID ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Reservation.delete(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Reservation avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la suppression de la reservation avec l'ID ${id}.`,
        });
      }
    } else {
      res.send({ message: "Reservation supprimé avec succès !" });
    }
  });
};
