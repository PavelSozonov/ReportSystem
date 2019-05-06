-- View: v_reporthistory

-- DROP VIEW v_reporthistory;

/* History of a report statuses */
CREATE OR REPLACE VIEW v_reporthistory AS 
 SELECT rh.id AS nid,                   -- Identifier
        rh.report AS nreport,           -- Report
        r.number AS snumber,            -- Number of the report within a year
        rh.status AS nstatus,           -- Status of a report
                                         /* 0 - new,
                                            1 - sent,
                                            2 - received,
                                            3 - in-progress,
                                            4 - solved,
                                            5 - declined
                                           */
        rh.changedate AS dchangedate    -- Date of a status change
   FROM reporthistory rh
   JOIN reports r ON r.id = rh.report;

ALTER TABLE v_reporthistory
  OWNER TO innoreport;
