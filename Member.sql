CREATE TABLE member
(
    login_id    VARCHAR(255) NOT NULL,
    name        VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    phone       VARCHAR(255) NOT NULL,
    gender      VARCHAR(255) NOT NULL,
    inserted_at datetime     NOT NULL,
    CONSTRAINT pk_member PRIMARY KEY (login_id)
);

DROP TABLE member;
