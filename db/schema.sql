CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers
(
	id INT AUTO_INCREMENT NOT NULL,
	name varchar(255) NOT NULL,
	createdAt TIMESTAMP NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
