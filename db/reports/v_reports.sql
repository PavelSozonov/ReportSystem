-- View: v_reports

-- DROP VIEW v_reports;

CREATE OR REPLACE VIEW v_reports AS 
 SELECT r.id AS nid, r.number AS snumber, r.title AS stitle, 
    r.description AS sdescription, ul.code AS ssender, el.code AS srecipient, 
    r.status AS nstatus, r.changedate AS dchangedate
   FROM reports r
   JOIN userlist ul ON ul.id = r.sender
   LEFT JOIN entitylist el ON el.id = r.recipient;

ALTER TABLE v_reports
  OWNER TO innoreport;
