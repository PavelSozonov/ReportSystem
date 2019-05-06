-- Index: fki_userlist_entity_fk

-- DROP INDEX fki_userlist_entity_fk;

/* Users -> Entity */
CREATE INDEX fki_userlist_entity_fk
  ON userlist
  USING btree
  (entity);
