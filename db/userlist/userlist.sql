-- Table: userlist

-- DROP TABLE userlist;

/* Users */
CREATE TABLE userlist
(
  /* Identifier */
  id numeric(17,0) NOT NULL,
  /* User's login */
  code character varying(20) NOT NULL,
  /* User's full name */
  name character varying(80) NOT NULL,
  /* Entity (null - citizen, not null - user is an entity's employee) */
  entity numeric(17,0),
  /* User's password */
  password character varying(20),
  /* Keys */
  CONSTRAINT userlist_pkey PRIMARY KEY (id),
  CONSTRAINT userlist_entity_fk FOREIGN KEY (entity)
      REFERENCES entitylist (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT userlist_code_uk UNIQUE (code),
  CONSTRAINT userlist_name_uk UNIQUE (name)
);
ALTER TABLE userlist
  OWNER TO innoreport;

