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

-- 호흡기내과 (department_id = 1)
INSERT INTO doctor (name, position, department_id)
VALUES ('최은지', '교수', 1),
       ('이진우', '전문의', 1),
       ('박성호', '전임의', 1),
       ('최은지', '전문의', 1);

-- 소화기내과 (department_id = 2)
INSERT INTO doctor (name, position, department_id)
VALUES ('김민지', '교수', 2),
       ('이영호', '전문의', 2),
       ('정수빈', '전임의', 2),
       ('한지훈', '전문의', 2);

-- 순환기내과 (department_id = 3)
INSERT INTO doctor (name, position, department_id)
VALUES ('조윤아', '교수', 3),
       ('강현우', '전문의', 3),
       ('신다은', '전임의', 3),
       ('백승민', '전문의', 3);

-- 신장내과 (department_id = 4)
INSERT INTO doctor (name, position, department_id)
VALUES ('오지현', '교수', 4),
       ('김태훈', '전문의', 4),
       ('윤서영', '전임의', 4),
       ('박재성', '전문의', 4);

-- 혈액종양내과 (department_id = 5)
INSERT INTO doctor (name, position, department_id)
VALUES ('정유진', '교수', 5),
       ('최강호', '전문의', 5),
       ('김소연', '전임의', 5),
       ('박시우', '전문의', 5);

-- 내분비대사내과 (department_id = 6)
INSERT INTO doctor (name, position, department_id)
VALUES ('이도윤', '교수', 6),
       ('권민아', '전문의', 6),
       ('박재훈', '전임의', 6),
       ('김하늘', '전문의', 6);

-- 알레르기내과 (department_id = 7)
INSERT INTO doctor (name, position, department_id)
VALUES ('서지수', '교수', 7),
       ('장우석', '전문의', 7),
       ('윤채린', '전임의', 7),
       ('조현수', '전문의', 7);

-- 류마티스내과 (department_id = 8)
INSERT INTO doctor (name, position, department_id)
VALUES ('박은지', '교수', 8),
       ('김도현', '전문의', 8),
       ('최윤아', '전임의', 8),
       ('이상혁', '전문의', 8);

-- 감염내과 (department_id = 9)
INSERT INTO doctor (name, position, department_id)
VALUES ('정현우', '교수', 9),
       ('김예린', '전문의', 9),
       ('박성민', '전임의', 9),
       ('이주연', '전문의', 9);

-- 일반내과 (department_id = 10)
INSERT INTO doctor (name, position, department_id)
VALUES ('김지훈', '교수', 10),
       ('최유리', '전문의', 10),
       ('박준형', '전임의', 10),
       ('한서진', '전문의', 10);

