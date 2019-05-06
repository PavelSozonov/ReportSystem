-- Table: reporthistory

-- DROP TABLE reporthistory;

/* History of a report statuses */
CREATE TABLE reporthistory
(
  /* Identifier */
  id numeric(17,0) NOT NULL,
  /* Report */
  report numeric(17,0) NOT NULL,
  /* Status of a report
     0 - new,
     1 - sent,
     2 - received,
     3 - in-progress,
     4 - solved,
     5 - declined
  */
  status numeric(1,0) NOT NULL,
  /* Date of a status change */
  changedate timestamp without time zone NOT NULL,
  /* Keys */
  CONSTRAINT reporthistory_pkey PRIMARY KEY (id),
  CONSTRAINT reporthistory_reports_fk FOREIGN KEY (report)
      REFERENCES reports (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
ALTER TABLE reporthistory
  OWNER TO innoreport;

