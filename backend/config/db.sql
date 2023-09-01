CREATE DATABASE IF NOT EXISTS `cottages` DEFAULT CHARACTER SET latin1;

USE `cottages`;

CREATE TABLE IF NOT EXISTS users(
   id INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(50) NOT NULL,
   password VARCHAR(255) NOT NULL,
   email VARCHAR(50) NOT NULL,
   is_admin BOOLEAN NOT NULL,
   firstname VARCHAR(50),
   lastname VARCHAR(50),
   phone INT,
   postal VARCHAR(50),
   city VARCHAR(50),
   avatar VARCHAR(50),
   website VARCHAR(50),
   adress VARCHAR(255),
   PRIMARY KEY(id),
   UNIQUE(username),
   UNIQUE(email)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS categories(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(50) NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS regions(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(50) NOT NULL,
   description VARCHAR(500),
   PRIMARY KEY(id),
   UNIQUE(name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS factures(
   id INT(11) NOT NULL AUTO_INCREMENT,
   date_start DATE,
   date_end DATE,
   cottage_name VARCHAR(50),
   cottage_adress VARCHAR(50),
   cottage_postal VARCHAR(50),
   client_id INT NOT NULL,
   client_username VARCHAR(50) NOT NULL,
   client_firstname VARCHAR(50),
   client_lastname VARCHAR(50),
   client_email VARCHAR(50),
   client_phone INT NOT NULL,
   client_postal INT NOT NULL,
   client_city VARCHAR(50),
   proprio_id INT NOT NULL,
   proprio_firstname VARCHAR(50),
   proprio_username VARCHAR(50) NOT NULL,
   proprio_lastname VARCHAR(50) NOT NULL,
   proprio_email VARCHAR(50) NOT NULL,
   proprio_phone INT NOT NULL,
   proprio_postal INT NOT NULL,
   nombre_personnes INT,
   proprio_city VARCHAR(50) NOT NULL,
   duration VARCHAR(50) NOT NULL,
   total INT,
   cottage_id INT NOT NULL,
   PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS cottages(
   id INT NOT NULL AUTO_INCREMENT,
   name TEXT NOT NULL,
   date_creation DATE NOT NULL,
   content VARCHAR(500) NOT NULL,
   dayprice INT NOT NULL,
   caution INT NOT NULL,
   adress VARCHAR(50) NOT NULL,
   city VARCHAR(50) NOT NULL,
   cp VARCHAR(50),
   reservation_count INT NOT NULL,
   max_personnes INT NOT NULL,
   bed_count INT NOT NULL,
   room_count INT NOT NULL,
   has_wifi BOOLEAN,
   has_parking BOOLEAN,
   has_clim BOOLEAN,
   has_pool BOOLEAN,
   id_regions INT(11) NOT NULL,
   id_categories INT NOT NULL,
   id_users INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_regions) REFERENCES regions(id),
   FOREIGN KEY(id_categories) REFERENCES categories(id),
   FOREIGN KEY(id_users) REFERENCES users(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS reservations(
   id INT NOT NULL AUTO_INCREMENT,
   created_at DATE NOT NULL,
   date_start DATE NOT NULL,
   date_end DATE NOT NULL,
   nombre_personnes INT NOT NULL,
   total INT NOT NULL,
   duration INT,
   id_cottages INT NOT NULL,
   id_users INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_cottages) REFERENCES cottages(id),
   FOREIGN KEY(id_users) REFERENCES users(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS avis(
   id INT NOT NULL AUTO_INCREMENT,
   text VARCHAR(500),
   note INT,
   id_users INT NOT NULL,
   id_cottages INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_users) REFERENCES users(id),
   FOREIGN KEY(id_cottages) REFERENCES cottages(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS pictures(
   id INT NOT NULL AUTO_INCREMENT,
   picture_name VARCHAR(50) NOT NULL,
   picture_path VARCHAR(50) NOT NULL,
   id_cottages INT NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(picture_path),
   FOREIGN KEY(id_cottages) REFERENCES cottages(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS favoris(
   id INT NOT NULL AUTO_INCREMENT,
   id_cottages INT,
   id_users INT NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(id_cottages),
   FOREIGN KEY(id_cottages) REFERENCES cottages(id),
   FOREIGN KEY(id_users) REFERENCES users(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;