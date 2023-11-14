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

CREATE TABLE transaction(
    id_transaction VARCHAR(255) PRIMARY KEY  NOT NULL,
    username VARCHAR(255) NOT NULL,
    item VARCHAR(255) NOT NULL,
    item_id VARCHAR NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total_item INT NOT NULL,
    pay_total DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (username) REFERENCES user(username)
);

INSERT INTO transaction (id_transaction, username, item, item_id, price, total_item, pay_total, date)
VALUES
('1', 'user1', 'Item1', 'item_id_1', 10.99, 2, 21.98, '2023-11-11'),
('2', 'user2', 'Item2', 'item_id_2', 15.99, 1, 15.99, '2023-11-12'),
('3', 'user1', 'Item3', 'item_id_3', 5.49, 3, 16.47, '2023-11-13'),
('4', 'user3', 'Item4', 'item_id_4', 8.75, 1, 8.75, '2023-11-14'),
('5', 'user2', 'Item5', 'item_id_5', 12.50, 2, 25.00, '2023-11-15');


CREATE TABLE items(
    id_item  VARCHAR(255) PRIMARY KEY KEY NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    item_price DECIMAL(10,2) NOT NULL,
    item_stock INT NOT NULL,
    item_description VARCHAR(255) NOT NULL,
    item_image VARCHAR(255) NOT NULL,
    item_rate DECIMAL(2,1) NOT NULL DEFAULT 0.0
);

INSERT INTO items (id_item, item_name, item_price, item_stock, item_description, item_image, item_rate)
SELECT 
    id_item,
    item_name, 
    item_price, 
    item_stock, 
    item_description, 
    item_image, 
    (SELECT AVG(SUM(rate_value)) FROM itemRate WHERE item_id = items.id_item) AS item_rate
FROM (
    VALUES
    ('id1','Product A', 50.00, 10, 'Description A', 'image_a.jpg'),
    ('id2','Product B', 30.00, 5, 'Description B', 'image_b.jpg'),
    ('id3','Product C', 25.00, 3, 'Description C', 'image_c.jpg'),
    ('id4','Product D', 40.00, 8, 'Description D', 'image_d.jpg'),
    ('id5','Product E', 20.00, 2, 'Description E', 'image_e.jpg')
) AS items(id_item, item_name, item_price, item_stock, item_description, item_image);

CREATE TABLE itemRate(
    id_rate VARCHAR(255) PRIMARY KEY KEY NOT NULL,
    item_id VARCHAR(255) NOT NULL,
    rate_value DECIMAL(2,1) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES items(id_item)
);

INSERT INTO itemRate (id_rate, item_id, rate_value) VALUES
    ('12345','id1', 4.0),
    ('12453','id1', 5.0),
    ('14532','id2', 3.0),
    ('42315','id2', 4.0);

CREATE TABLE userRate(
    id_rate  VARCHAR(255) PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    rate_value DECIMAL(2,1) NOT NULL,
    FOREIGN KEY (username) REFERENCES user(username)
);

INSERT INTO userRate (id_rate, username, rate_value) VALUES
    ('12345','user1', 4.0),
    ('12453','user1', 5.0),
    ('14532','user2', 3.0),
    ('42315','user2', 4.0);

CREATE TABLE itemReview(
    id_review VARCHAR(255) PRIMARY KEY NOT NULL,
    item_id VARCHAR(255) NOT NULL,
    review VARCHAR(255) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES items(id_item)
);

INSERT INTO itemReview (id_review, item_id, review) VALUES
    ('12345','id1', 'GOOD'),
    ('12453','id1', 'GOOD'),
    ('14532','id2','BAD'),
    ('42315','id2','NOT THAT BAD');

CREATE TABLE userReview(
    id_review  VARCHAR(255) PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    review VARCHAR(255) NOT NULL,
    FOREIGN KEY (username) REFERENCES user(username)
);

INSERT INTO userReview (id_review, username,review) VALUES
    ('23732','user1', 'GOOD'),
    ('27484','user1', 'GOOD'),
    ('99239','user2','BAD'),
    ('37494','user2','NOT THAT BAD');

CREATE TABLE chat_history (
    id_chat VARCHAR(255) PRIMARY KEY NOT NULL,
    sender_username VARCHAR(255) NOT NULL,
    receiver_username VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_username) REFERENCES user(username),
    FOREIGN KEY (receiver_username) REFERENCES user(username)
);


CREATE TABLE friends (
    id_friend VARCHAR(255) PRIMARY KEY NOT NULL,
    user1_username VARCHAR(255) NOT NULL,
    user2_username VARCHAR(255) NOT NULL,
    status ENUM('pending', 'accepted') DEFAULT 'pending',
    FOREIGN KEY (user1_username) REFERENCES user(username),
    FOREIGN KEY (user2_username) REFERENCES user(username)
);


-- Mock Data for chat_history
INSERT INTO chat_history (id_chat, sender_username, receiver_username, message,)
VALUES
  ('1', 'user1', 'user2', 'Hello, how are you?', '2023-11-14 12:00:00'),
  ('2', 'user2', 'user1', 'Hi! Im good, thanks.', '2023-11-14 12:05:00'),
  ('3', 'user1', 'user3', 'Hey there!', '2023-11-14 12:10:00'),
  ('4', 'user3', 'user1', 'Hi! Whats up?', '2023-11-14 12:15:00'),
  ('5', 'user2', 'user3', 'Hello friends!', '2023-11-14 12:20:00');

-- Mock Data for friends
INSERT INTO friends (id_friend, user1_username, user2_username, status)
VALUES
  ('1', 'user1', 'user2', 'accepted'),
  ('2', 'user1', 'user3', 'pending'),
  ('3', 'user2', 'user3', 'accepted'),
  ('4', 'user3', 'user4', 'pending'),
  ('5', 'user4', 'user1', 'accepted');
