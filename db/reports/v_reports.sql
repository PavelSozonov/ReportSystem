-- View: v_reports

-- DROP VIEW v_reports;

/* Reports */
CREATE OR REPLACE VIEW v_reports AS 
 SELECT r.id AS nid,                    -- Identifier
        r.number AS snumber,            -- Number of a report within a year
        r.title AS stitle,              -- Title of a report
        r.description AS sdescription,  -- Description of a report
        ul.code AS ssender,             -- Report sender (user)
        el.code AS srecipient,          -- Report recipient (entity)
        r.status AS nstatus,            -- Current status of a report
                                        /* 0 - new,
                                           1 - sent,
                                           2 - received,
                                           3 - in-progress,
                                           4 - solved,
                                           5 - declined
                                          */
        r.changedate AS dchangedate     -- Date of a last status change
   FROM reports r
   JOIN userlist ul ON ul.id = r.sender
   LEFT JOIN entitylist el ON el.id = r.recipient;

ALTER TABLE v_reports
  OWNER TO innoreport;
