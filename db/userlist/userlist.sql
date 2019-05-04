-- Table: userlist

-- DROP TABLE userlist;

CREATE TABLE userlist
(
  id numeric(17,0) NOT NULL,
  code character varying(20) NOT NULL,
  name character varying(80) NOT NULL,
  entity numeric(17,0),
  password character varying(20),
  CONSTRAINT userlist_pkey PRIMARY KEY (id),
  CONSTRAINT userlist_entity_fk FOREIGN KEY (entity)
      REFERENCES entitylist (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT userlist_code_uk UNIQUE (code),
  CONSTRAINT userlist_name_uk UNIQUE (name)
);
ALTER TABLE userlist
  OWNER TO innoreport;

