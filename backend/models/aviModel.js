const sql = require('../config/db.config');

const Avi = function (avi){
    this.text = avi.text;
    this.note = avi.note;
    this.id_users = avi.id_users;
    this.id_cottages = avi.id_cottages;
}

Avi.findAll = result => {
    sql.query('SELECT id, text, note, id_users, id_cottages FROM avis', (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(null, err);
            return;
        }

        console.log('Avis :', res);
        result(null, res);
    });
};

Avi.findById = (id, result) => {
    sql.query('SELECT text, note, id_users, id_cottages FROM avis WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('Avis trouvé :', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

Avi.create = (newAvi, result) => {
    sql.query('INSERT INTO avis SET ?', newAvi, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        console.log('Avi créé :', { id: res.insertId, ...newAvi });
        result(null, { id: res.insertId, ...newAvi });
    });
};

Avi.update = (id, avi, result) => {
    sql.query(
        'UPDATE avis SET text = ?, note = ? , id_users = ?, id_cottages = ? WHERE id = ?',
        [avi.text, avi.note, avi.id_users, avi.id_cottages, id],
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

            console.log('Avi mis à jour :', { id: id, ...avi });
            result(null, { id: id, ...avi });
        }
    );
};

Avi.delete = (id, result) => {
    sql.query('DELETE FROM avis WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            // Si l'avi n'est pas trouvé
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Avi supprimé avec ID :', id);
        result(null, res);
    });
};

module.exports = Avi;