-- Index: fki_taglist_entity_fk

-- DROP INDEX fki_taglist_entity_fk;

CREATE INDEX fki_taglist_entity_fk
  ON taglist
  USING btree
  (entity);
