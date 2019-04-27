-- Index: fki_reporttags_tags_fk

-- DROP INDEX fki_reporttags_tags_fk;

CREATE INDEX fki_reporttags_tags_fk
  ON reporttags
  USING btree
  (tag);
