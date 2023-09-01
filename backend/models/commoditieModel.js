const sql = require('../config/db.config');

const Commoditie = function (commoditie){
    this.name = commoditie.name;
}

Commoditie.findAll = result => {
    sql.query('SELECT name FROM commodities', (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(null, err);
            return;
        }

        console.log('Commodities :', res);
        result(null, res);
    });
};

Commoditie.findById = (id, result) => {
    sql.query('SELECT name FROM commodities WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('Commoditie trouvé :', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

Commoditie.create = (newCommoditie, result) => {
    sql.query('INSERT INTO commodities SET ?', newCommoditie, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        console.log('Commodities créé :', { id: res.insertId, ...newCommoditie });
        result(null, { id: res.insertId, ...newCommoditie });
    });
};

Commoditie.update = (id, commoditie, result) => {
    sql.query(
        'UPDATE commodities SET name = ?  WHERE id = ?',
        [commoditie.name, id],
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

            console.log('Commoditie mis à jour :', { id: id, ...commoditie });
            result(null, { id: id, ...commoditie });
        }
    );
};

Commoditie.delete = (id, result) => {
    sql.query('DELETE FROM commodities WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {

            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Commoditie supprimé avec ID :', id);
        result(null, res);
    });
};

module.exports = Commoditie;