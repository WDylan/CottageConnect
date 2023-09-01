const sql = require('../config/db.config');

const Facture = function (facture) {
    this.date_start = facture.date_start;
    this.date_end = facture.date_end;
    this.cottage_id = facture.cottage_id;
    this.cottage_name = facture.cottage_name;
    this.cottage_adress = facture.cottage_adress;
    this.client_id = facture.client_id;
    this.client_username = facture.client_username;
    this.client_firstname = facture.client_firstname;
    this.client_lastname = facture.client_lastname;
    this.client_email = facture.client_email;
    this.client_phone = facture.client_phone;
    this.client_postal= facture.client_postal;
    this.client_adress = facture.client_adress;
    this.proprio_id = facture.proprio_id;
    this.proprio_firstname = facture.proprio_firstname;
    this.proprio_username = facture.proprio_username;
    this.proprio_lastname = facture.proprio_lastname;
    this.proprio_email = facture.proprio_email;
    this.proprio_phone = facture.proprio_phone;
    this.proprio_postal = facture.proprio_postal;
    this.proprio_adress = facture.proprio_adress;
    this.duration = facture.duration;
    this.price = facture.price;
    this.nombre_personnes = facture.nombre_personnes;
    
};

Facture.findAll = result => {
    sql.query('SELECT id, date_start, date_end, client_id, client_username, client_firstname, client_lastname, client_email, client_phone, client_postal, client_adress, proprio_id, proprio_firstname, proprio_username, proprio_lastname, proprio_email, proprio_phone, proprio_postal, proprio_adress, cottage_id, cottage_name, cottage_adress, price, duration, nombre_personnes FROM facture', (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(null, err);
            return;
        }

        console.log('Factures :', res);
        result(null, res);
    });
};

Facture.findById = (id, result) => {
    sql.query('SELECT date_start, date_end, client_id, client_username, client_firstname, client_lastname, client_email, client_phone, client_postal, client_adress, proprio_id, proprio_firstname, proprio_username, proprio_lastname, proprio_email, proprio_phone, proprio_postal, proprio_adress, cottage_id, cottage_name, cottage_adress, price, duration, nombre_personnes FROM facture WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('facture trouvée :', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

Facture.create = (newFacture, result) => {
    sql.query('INSERT INTO facture SET ?', newFacture, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        console.log('Facture créée :', { id: res.insertId, ...newFacture});
        result(null, { id: res.insertId, ...newFacture });
    });
};

Facture.update = (id, facture, result) => {
    sql.query(
        'UPDATE facture SET date_start = ?, date_end = ?, client_id = ?,client_username = ?, client_firstname = ?, client_lastname = ?, client_email = ?, client_phone = ?, client_postal = ?, client_adress = ?, proprio_id = ?, proprio_firstname = ?, proprio_username = ?, proprio_lastname = ?, proprio_email = ?, proprio_phone = ?, proprio_postal = ?, proprio_adress = ?, cottage_id = ?, cottage_name = ?, cottage_adress = ? , price = ?, duration = ?, nombre_personnes = ? WHERE id = ?',
        [facture.date_start, facture.date_end, facture.client_id, facture.client_username, facture.client_firstname, facture.client_lastname, facture.client_email, facture.client_phone, facture.client_postal, facture.client_adress, facture.proprio_id, facture.proprio_firstname, facture.proprio_username, facture.proprio_lastname, facture.proprio_email, facture.proprio_phone, facture.proprio_postal, facture.proprio_adress, facture.cottage_id, facture.cottage_adress, facture.price, facture.duration, facture.nombre_personnes, id],
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

            console.log('Facture mise à jour :', { id: id, ...facture });
            result(null, { id: id, ...facture });
        }
    );
};

Facture.delete = (id, result) => {
    sql.query('DELETE FROM facture WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Facture supprimée avec ID :', id);
        result(null, res);
    });
};

module.exports = Facture;