CREATE TABLE reservation
(
    id                    INT AUTO_INCREMENT NOT NULL,
    doctor_id             INT                NOT NULL,
    member_login_id       VARCHAR(255)       NOT NULL,
    reservation_date_time datetime           NULL,
    status                VARCHAR(255)       NULL,
    created_at            datetime           NULL DEFAULT NOW(),
    CONSTRAINT pk_reservation PRIMARY KEY (id)
);

ALTER TABLE reservation
    ADD CONSTRAINT FK_RESERVATION_ON_DOCTOR FOREIGN KEY (doctor_id) REFERENCES doctor (id);

ALTER TABLE reservation
    ADD CONSTRAINT FK_RESERVATION_ON_MEMBER FOREIGN KEY (member_login_id) REFERENCES member (login_id);

DROP TABLE reservation;

ALTER TABLE reservation
    ADD COLUMN memo VARCHAR(255) NULL;

ALTER TABLE reservation
    DROP COLUMN status;


