-- Index: fki_reports_recipient_fk

-- DROP INDEX fki_reports_recipient_fk;

/* Reports -> Entity (Recipient) */
CREATE INDEX fki_reports_recipient_fk
  ON reports
  USING btree
  (recipient);
