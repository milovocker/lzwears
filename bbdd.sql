USE LZWears;
DROP TABLE users IF EXISTS;
DROP TABLE articles IF EXISTS;

CREATE TABLE users (
dni VARCHAR(10) PRIMARY KEY,
name VARCHAR(255),
email VARCHAR(255),
password VARCHAR(255),
IBAN VARCHAR(255),
phoneNumber INT)
;

INSERT INTO users (dni, name, email, password, IBAN, phoneNumber) VALUES ('X9559700A', 'milovocker', 'milovocker.clase@gmail.com', 'Admin.1234', 'ES1234567890123456789012', 609925761
);


CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    size VARCHAR(255),
    price FLOAT,
    stock INT
);

INSERT INTO articles (name, type, size, price, stock) 
VALUES ('Brasil Jersey', 'T-shirt', 'XL', 50, 15);
