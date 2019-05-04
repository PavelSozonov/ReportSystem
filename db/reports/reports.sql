-- Table: reports

-- DROP TABLE reports;

CREATE TABLE reports
(
  id numeric(17,0) NOT NULL,
  title character varying(50) NOT NULL,
  description character varying(600) NOT NULL,
  sender numeric(17,0),
  recipient numeric(17,0),
  status numeric(1,0),
  changedate timestamp without time zone,
  "number" character varying(40),
  CONSTRAINT reports_pkey PRIMARY KEY (id),
  CONSTRAINT reports_recipient_fk FOREIGN KEY (recipient)
      REFERENCES entitylist (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT reports_sender_fk FOREIGN KEY (sender)
      REFERENCES userlist (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
ALTER TABLE reports
  OWNER TO innoreport;

