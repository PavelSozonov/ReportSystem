-- Table: reports

-- DROP TABLE reports;

/* Reports */
CREATE TABLE reports
(
  /* Identifier */
  id numeric(17,0) NOT NULL,
  /* Title of a report */
  title character varying(50) NOT NULL,
  /* Description of a report */
  description character varying(600) NOT NULL,
  /* Report sender (user) */
  sender numeric(17,0),
  /* Report recipient (entity) */
  recipient numeric(17,0),
  /* Current status of a report
   0 - new,
   1 - sent,
   2 - received,
   3 - in-progress,
   4 - solved,
   5 - declined
  */
  status numeric(1,0),
  /* Date of a last status change */
  changedate timestamp without time zone,
  /* Number of a report within a year */
  "number" character varying(40),
  /* Keys */
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

