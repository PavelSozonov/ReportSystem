-- Index: fki_taglist_entity_fk

-- DROP INDEX fki_taglist_entity_fk;

/* Tags -> Entity (Mapping for Classifier module) */
CREATE INDEX fki_taglist_entity_fk
  ON taglist
  USING btree
  (entity);
