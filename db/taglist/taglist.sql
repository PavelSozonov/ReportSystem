-- Table: taglist

-- DROP TABLE taglist;

/* Tags */
CREATE TABLE taglist
(
  /* Identifier */
  id numeric(17,0) NOT NULL,
  /* Tag code (short name) */
  code character varying(20) NOT NULL,
  /* Tag full name */
  name character varying(80) NOT NULL,
  /* Mapping to entity for Classifier module */
  entity numeric(17,0),
  /* Keys */
  CONSTRAINT taglist_pkey PRIMARY KEY (id),
  CONSTRAINT userlist_entity_fk FOREIGN KEY (entity)
      REFERENCES entitylist (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT taglist_code_uk UNIQUE (code),
  CONSTRAINT taglist_name_uk UNIQUE (name)
);
ALTER TABLE taglist
  OWNER TO innoreport;
