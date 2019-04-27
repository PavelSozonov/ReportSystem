-- Index: fki_reporthistory_reports_fk

-- DROP INDEX fki_reporthistory_reports_fk;

CREATE INDEX fki_reporthistory_reports_fk
  ON reporthistory
  USING btree
  (report);
