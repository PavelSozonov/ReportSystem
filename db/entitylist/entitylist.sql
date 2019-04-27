-- Table: entitylist

-- DROP TABLE entitylist;

CREATE TABLE entitylist
(
  id numeric(17,0) NOT NULL,
  code character varying(20) NOT NULL,
  name character varying(80) NOT NULL,
  CONSTRAINT entitylist_pkey PRIMARY KEY (id),
  CONSTRAINT entitylist_code_uk UNIQUE (code),
  CONSTRAINT entitylist_name_uk UNIQUE (name)
);
ALTER TABLE entitylist
  OWNER TO innoreport;
