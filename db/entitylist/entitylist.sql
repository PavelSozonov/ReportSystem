-- Table: entitylist

-- DROP TABLE entitylist;

/* Entities */
CREATE TABLE entitylist
(
  /* Identifier */
  id numeric(17,0) NOT NULL,
  /* Entity's code (short name) */
  code character varying(20) NOT NULL,
  /* Entity's full name */
  name character varying(80) NOT NULL,
  /* Keys */
  CONSTRAINT entitylist_pkey PRIMARY KEY (id),
  CONSTRAINT entitylist_code_uk UNIQUE (code),
  CONSTRAINT entitylist_name_uk UNIQUE (name)
);
ALTER TABLE entitylist
  OWNER TO innoreport;
