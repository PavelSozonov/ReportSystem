-- View: v_reporttags

-- DROP VIEW v_reporttags;

CREATE OR REPLACE VIEW v_reporttags AS 
 SELECT rt.id AS nid, rt.report AS nreport, r.number AS snumber, 
    tl.code AS scode
   FROM reporttags rt
   JOIN reports r ON r.id = rt.report
   JOIN taglist tl ON rt.tag = tl.id;

ALTER TABLE v_reporttags
  OWNER TO innoreport;
