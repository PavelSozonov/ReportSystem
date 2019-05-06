-- Index: fki_reporttags_reports_fk

-- DROP INDEX fki_reporttags_reports_fk;

/* Report tags -> Report */
CREATE INDEX fki_reporttags_reports_fk
  ON reporttags
  USING btree
  (report);
