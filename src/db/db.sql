CREATE DATABASE rest_database;
USE rest_database;

CREATE TABLE user(
    username VARCHAR(255) PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO user (username, email, password)
VALUES
('usertest1', 'useremail1', 'userpass1'),
('usertest2', 'useremail2', 'userpass2');