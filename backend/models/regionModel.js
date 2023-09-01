const sql = require('../config/db.config');

const Region = function (region){
    this.name = region.name;
    this.description = region.description;
}

Region.findAll = result => {
    sql.query('SELECT id, name, description FROM regions', (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(null, err);
            return;
        }

        console.log('Regions :', res);
        result(null, res);
    });
};

Region.findById = (id, result) => {
    sql.query('SELECT name, description FROM regions WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('Region trouvé :', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

Region.create = (newRegion, result) => {
    sql.query('INSERT INTO regions SET ?', newRegion, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        console.log('Region créé :', { id: res.insertId, ...newRegion });
        result(null, { id: res.insertId, ...newRegion });
    });
};

Region.update = (id, region, result) => {
    sql.query(
        'UPDATE regions SET name = ?, description = ? WHERE id = ?',
        [region.name, region.description, id],
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

            console.log('Region mis à jour :', { id: id, ...region });
            result(null, { id: id, ...region });
        }
    );
};

Region.delete = (id, result) => {
    sql.query('DELETE FROM regions WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Region supprimé avec ID :', id);
        result(null, res);
    });
};

module.exports = Region;