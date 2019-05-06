-- Sequence: seq_id

-- DROP SEQUENCE seq_id;

/* Sequence for identifiers generation */
CREATE SEQUENCE seq_id
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 99999999999999
  START 1
  CACHE 5;
ALTER TABLE seq_id
  OWNER TO innoreport;
