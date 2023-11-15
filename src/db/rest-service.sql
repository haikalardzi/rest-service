CREATE SCHEMA IF NOT EXISTS `rest-service` DEFAULT CHARACTER SET utf8 ;
USE rest-service ;

CREATE TABLE IF NOT EXISTS `rest-service`.`log`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `ip` VARCHAR(50) NOT NULL,
    `endpoint` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `rest-service`.`user` (
    username VARCHAR(255) PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (`username`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `rest-service`.`transaction`(
    `transaction_id` INT NOT NULL AUTO_INCREMENT,
    `buyer_username` VARCHAR(45) NOT NULL,
    `seller_username` VARCHAR(45) NOT NULL,
    `item_id` INT NOT NULL, 
    `quantity` INT NOT NULL,
    PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS`rest-service`.`items`(
    id_item  INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(255) NOT NULL,
    item_price DECIMAL(10,2) NOT NULL,
    item_stock INT NOT NULL,
    item_description VARCHAR(255) NOT NULL,
    item_image VARCHAR(255) NOT NULL,
    item_rate DECIMAL(2,1) NOT NULL DEFAULT 0.0,
    PRIMARY KEY (`id_item`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `rest-service`.`itemRate`(
    id_rate INT NOT NULL AUTO_INCREMENT,
    item_id VARCHAR(255) NOT NULL,
    rate_value DECIMAL(2,1) NOT NULL,
    PRIMARY KEY (`id_rate`),
    FOREIGN KEY (item_id) REFERENCES items(id_item)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS  `rest-service`.`userRate`(
    id_rate  INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    rate_value DECIMAL(2,1) NOT NULL,
    PRIMARY KEY (`id_rate`),
    FOREIGN KEY (username) REFERENCES user(username)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `rest-service`.`itemReview`(
    id_review INT NOT NULL AUTO_INCREMENT,
    item_id VARCHAR(255) NOT NULL,
    review VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id_review`),
    FOREIGN KEY (item_id) REFERENCES items(id_item)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `rest-service`.`userReview`(
    id_review  INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    review VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id_review`),
    FOREIGN KEY (username) REFERENCES user(username)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `rest-service`.`chat_history` (
    id_chat INT NOT NULL AUTO_INCREMENT,
    sender_username VARCHAR(255) NOT NULL,
    receiver_username VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_chat`),
    FOREIGN KEY (sender_username) REFERENCES user(username),
    FOREIGN KEY (receiver_username) REFERENCES user(username)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `rest-service`.`friends` (
    id_friend INT NOT NULL AUTO_INCREMENT,
    user1_username VARCHAR(255) NOT NULL,
    user2_username VARCHAR(255) NOT NULL,
    status ENUM('pending', 'accepted') DEFAULT 'pending',\
    PRIMARY KEY (`id_friend`),
    FOREIGN KEY (user1_username) REFERENCES user(username),
    FOREIGN KEY (user2_username) REFERENCES user(username)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



