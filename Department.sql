-- 진료과 종류 테이블
CREATE TABLE department
(
    id   INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255)       NOT NULL,
    CONSTRAINT pk_department PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ('호흡기내과'),
       ('소화기내과'),
       ('순환기내과'),
       ('신장내과'),
       ('혈액종양내과'),
       ('내분비대사내과'),
       ('알레르기내과'),
       ('류마티스내과'),
       ('감염내과'),
       ('일반내과');
