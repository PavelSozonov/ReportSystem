-- Table: taglist

-- DROP TABLE taglist;

CREATE TABLE taglist
(
  id numeric(17,0) NOT NULL,
  code character varying(20) NOT NULL,
  name character varying(80) NOT NULL,
  CONSTRAINT taglist_pkey PRIMARY KEY (id),
  CONSTRAINT taglist_code_uk UNIQUE (code),
  CONSTRAINT taglist_name_uk UNIQUE (name)
);
ALTER TABLE taglist
  OWNER TO innoreport;
