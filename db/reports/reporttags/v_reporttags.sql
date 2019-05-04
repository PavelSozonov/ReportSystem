-- View: v_reporttags

-- DROP VIEW v_reporttags;

CREATE OR REPLACE VIEW v_reporttags AS 
 SELECT rt.id AS nid, rt.report AS nreport, r.number AS snumber, 
    tl.code AS scode, el.code as sentity
   FROM reporttags rt
   JOIN reports r ON r.id = rt.report
   JOIN taglist tl ON rt.tag = tl.id
   LEFT JOIN entitylist el ON el.id = tl.entity;

ALTER TABLE v_reporttags
  OWNER TO innoreport;
