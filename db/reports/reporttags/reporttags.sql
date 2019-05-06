-- Table: reporttags

-- DROP TABLE reporttags;

/* Tags of a report */
CREATE TABLE reporttags
(
  /* Identifier */
  id numeric(17,0) NOT NULL,
  /* Report */
  report numeric(17,0) NOT NULL,
  /* Tag */
  tag numeric(17,0) NOT NULL,
  /* Keys */
  CONSTRAINT reporttags_pkey PRIMARY KEY (id),
  CONSTRAINT reporttags_reports_fk FOREIGN KEY (report)
      REFERENCES reports (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT reporttags_tags_fk FOREIGN KEY (tag)
      REFERENCES taglist (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT reporttags_uk UNIQUE (report, tag)
);
ALTER TABLE reporttags
  OWNER TO innoreport;