CREATE TABLE member
(
    id       INT AUTO_INCREMENT NOT NULL,
    login_id VARCHAR(255)      NOT NULL,
    name     VARCHAR(255)      NOT NULL,
    password VARCHAR(255)      NOT NULL,
    email    VARCHAR(255)      NOT NULL,
    phone    VARCHAR(255)      NOT NULL,
    gender   VARCHAR(255)      NOT NULL,
    CONSTRAINT pk_member PRIMARY KEY (id)
);