-- 의사 테이블
CREATE TABLE doctor
(
    id            INT AUTO_INCREMENT NOT NULL,
    name          VARCHAR(255)       NOT NULL,
    position      VARCHAR(255)       NULL,
    thumbnail_url VARCHAR(255)       NULL,
    department_id INT                NULL,
    CONSTRAINT pk_doctor PRIMARY KEY (id)
);

ALTER TABLE doctor
    ADD CONSTRAINT FK_DOCTOR_ON_DEPARTMENT FOREIGN KEY (department_id) REFERENCES department (id);

-- 호흡기내과 (id=1)
INSERT INTO doctor (name, position, department_id)
VALUES ('임재준', '교수', 1),
       ('이진우', '전문의', 1);

-- 소화기내과 (id=2)
INSERT INTO doctor (name, position, department_id)
VALUES ('박소영', '교수', 2),
       ('김민호', '전문의', 2);

-- 순환기내과 (id=3)
INSERT INTO doctor (name, position, department_id)
VALUES ('최영훈', '교수', 3);

-- 신장내과 (id=4)
INSERT INTO doctor (name, position, department_id)
VALUES ('정수현', '전문의', 4);

-- 혈액종양내과 (id=5)
INSERT INTO doctor (name, position, department_id)
VALUES ('김하늘', '교수', 5);

-- 내분비대사내과 (id=6)
INSERT INTO doctor (name, position, department_id)
VALUES ('이주연', '전문의', 6);

-- 알레르기내과 (id=7)
INSERT INTO doctor (name, position, department_id)
VALUES ('조현우', '교수', 7);

-- 류마티스내과 (id=8)
INSERT INTO doctor (name, position, department_id)
VALUES ('신예진', '전문의', 8);

-- 감염내과 (id=9)
INSERT INTO doctor (name, position, department_id)
VALUES ('오세훈', '교수', 9);

-- 일반내과 (id=10)
INSERT INTO doctor (name, position, department_id)
VALUES ('강지민', '전문의', 10);
