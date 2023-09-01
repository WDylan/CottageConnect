const sql = require('../config/db.config');

const Adress = function (adress) {
    this.adress = adress.adress
    this.code_postal = adress.code_postal;
    this.city = adress.city;
    this.id_regions = adress.id_regions;
}

Adress.findAll = result => {
    sql.query('SELECT id, adress, code_postal, city, id_regions FROM adress', (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(null, err);
            return;
        }

        console.log('Adress :', res);
        result(null, res);
    });
};

Adress.findById = (id, result) => {
    sql.query('SELECT  adress, code_postal, city, id_regions FROM adress WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('Adress trouvé :', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

Adress.create = (newAdress, result) => {
    sql.query('INSERT INTO adress SET ?', newAdress, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        console.log('Adress créé :', { id: res.insertId, ...newAdress });
        result(null, { id: res.insertId, ...newAdress });
    });
};

Adress.update = (id, adress, result) => {
    sql.query(
        'UPDATE adress SET adress = ? , code_postal = ?, city = ?, id_regions WHERE id = ?',
        [ adress.adress, adress.code_postal, adress.city, adress.id_regions, id],
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

            console.log('Adress mis à jour :', { id: id, ...adress });
            result(null, { id: id, ...adress });
        }
    );
};

Adress.delete = (id, result) => {
    sql.query('DELETE FROM adress WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Adress supprimé avec ID :', id);
        result(null, res);
    });
};

module.exports = Adress;