# 고객 테이블
CREATE TABLE member
(
    login_id    VARCHAR(255) NOT NULL,
    name        VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    phone       VARCHAR(255) NOT NULL,
    gender      VARCHAR(255) NOT NULL,
    inserted_at datetime     NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_member PRIMARY KEY (login_id)
);

DROP TABLE member;

# 권한 테이블
CREATE TABLE auth
(
    login_id  VARCHAR(255) NOT NULL,
    auth_name VARCHAR(255) NOT NULL,
    CONSTRAINT pk_auth PRIMARY KEY (login_id, auth_name)
);

ALTER TABLE auth
    ADD CONSTRAINT FK_AUTH_ON_LOGIN FOREIGN KEY (login_id) REFERENCES member (login_id);

SHOW COLUMNS FROM member;

SELECT DATABASE();
SHOW CREATE TABLE member;