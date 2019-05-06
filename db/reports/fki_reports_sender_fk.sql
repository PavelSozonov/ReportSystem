-- Index: fki_reports_sender_fk

-- DROP INDEX fki_reports_sender_fk;

/* Reports -> User (Sender) */
CREATE INDEX fki_reports_sender_fk
  ON reports
  USING btree
  (sender);
