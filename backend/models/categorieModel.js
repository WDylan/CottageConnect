const sql = require('../config/db.config');

const Categorie = function (categorie) {
    this.name = categorie.name;
};

Categorie.findAll = result => {
    sql.query('SELECT * FROM categories', (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(null, err);
            return;
        }

        console.log('Catégorie :', res);
        result(null, res);
    });
};

Categorie.findById = (id, result) => {
    sql.query('SELECT * FROM categories WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('Catégorie trouvé :', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

Categorie.create = (newCategorie, result) => {
    sql.query('INSERT INTO categories SET ?', newCategorie, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        console.log('Catégorie créé :', { id: res.insertId, ...newCategorie });
        result(null, { id: res.insertId, ...newCategorie });
    });
};

Categorie.update = (id, categorie, result) => {
    sql.query(
        'UPDATE categories SET name = ?  WHERE id = ?',
        [categorie.name, id],
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

            console.log('Catégorie mis à jour :', { id: id, ...categorie });
            result(null, { id: id, ...categorie });
        }
    );
};

Categorie.delete = (id, result) => {
    sql.query('DELETE FROM categories WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Catégorie supprimé avec ID :', id);
        result(null, res);
    });
};

module.exports = Categorie;