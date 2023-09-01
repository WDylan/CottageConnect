const sql = require('../config/db.config');

const Favori = function(favori){
    this.id_cottages = favori.id_cottages;
    this.id_users = favori.id_users;
}

Favori.findAll = result => {
    sql.query('SELECT id, id_cottages, id_users FROM favories', (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(null, err);
            return;
        }

        console.log('Favorie :', res);
        result(null, res);
    });
};

Favori.findById = (id, result) => {
    sql.query('SELECT id_cottages, id_users FROM favoris WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('Favori trouvé :', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

Favori.create = (newFavori, result) => {
    sql.query('INSERT INTO favoris SET ?', newFavori, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        console.log('Favori créé :', { id: res.insertId, ...newFavori });
        result(null, { id: res.insertId, ...newFavori });
    });
};

Favori.delete = (id, result) => {
    sql.query('DELETE FROM favoris WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {

            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Favori supprimé avec ID :', id);
        result(null, res);
    });
};