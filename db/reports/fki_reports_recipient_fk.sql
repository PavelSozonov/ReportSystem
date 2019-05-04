-- Index: fki_reports_recipient_fk

-- DROP INDEX fki_reports_recipient_fk;

CREATE INDEX fki_reports_recipient_fk
  ON reports
  USING btree
  (recipient);
