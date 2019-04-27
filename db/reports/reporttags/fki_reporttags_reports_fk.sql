-- Index: fki_reporttags_reports_fk

-- DROP INDEX fki_reporttags_reports_fk;

CREATE INDEX fki_reporttags_reports_fk
  ON reporttags
  USING btree
  (report);
