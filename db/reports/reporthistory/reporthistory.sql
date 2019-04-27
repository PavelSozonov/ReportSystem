-- Table: reporthistory

-- DROP TABLE reporthistory;

CREATE TABLE reporthistory
(
  id numeric(17,0) NOT NULL,
  report numeric(17,0) NOT NULL,
  status numeric(1,0) NOT NULL,
  changedate timestamp without time zone NOT NULL,
  CONSTRAINT reporthistory_pkey PRIMARY KEY (id),
  CONSTRAINT reporthistory_reports_fk FOREIGN KEY (report)
      REFERENCES reports (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
ALTER TABLE reporthistory
  OWNER TO innoreport;

