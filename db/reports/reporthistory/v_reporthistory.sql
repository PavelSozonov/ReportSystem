-- View: v_reporthistory

-- DROP VIEW v_reporthistory;

CREATE OR REPLACE VIEW v_reporthistory AS 
 SELECT rh.id AS nid, rh.report AS nreport, r.number AS snumber, 
    rh.status AS nstatus, rh.changedate AS dchangedate
   FROM reporthistory rh
   JOIN reports r ON r.id = rh.report;

ALTER TABLE v_reporthistory
  OWNER TO innoreport;
