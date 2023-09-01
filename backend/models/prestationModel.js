const sql = require("../config/db.config");

const Prestation = function (prestation){
    this.name = prestation.name;
}

Prestation.findAll = (result) => {
    sql.query("SELECT id, name FROM prestations", (err, res) => {
    if (err) {
        console.log("Erreur :", err);
        result(null, err);
        return;
    }

    console.log("Prestations :", res);
    result(null, res);
    });
};

Prestation.findById = (id, result) => {
    sql.query("SELECT name FROM prestations WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("Erreur :", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Prestations trouvé :", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
};

Prestation.create = (newPrestation, result) => {
    sql.query('INSERT INTO prestations SET ?', newPrestation, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        console.log('Prestations créé :', { id: res.insertId, ...newPrestation });
        result(null, { id: res.insertId, ...newPrestation });
    });
};

Prestation.update = (id, prestation, result) => {
    sql.query(
        'UPDATE prestations SET name = ? WHERE id = ?',
        [prestation.name, id],
        (err, res) => {
            if (err) {
                console.log('Erreur :', err);
                result(err, null);
                return;
            }

            if (res.affectedRows === 0) {
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('Prestations mis à jour :', { id: id, ...prestation });
            result(null, { id: id, ...prestation });
        }
    );
};

Prestation.delete = (id, result) => {
    sql.query('DELETE FROM prestation WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Prestations supprimé avec ID :', id);
        result(null, res);
    });
};

module.exports = Prestation;