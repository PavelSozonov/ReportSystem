-- View: v_reporttags

-- DROP VIEW v_reporttags;

CREATE OR REPLACE VIEW v_reporttags AS 
 SELECT rt.id AS nid,         -- Identifier
        rt.report AS nreport, -- Report
        r.number AS snumber,  -- Number of the report within a year
        tl.code AS scode,     -- Tag code
        el.code as sentity    -- Mapped entity
   FROM reporttags rt
   JOIN reports r ON r.id = rt.report
   JOIN taglist tl ON rt.tag = tl.id
   LEFT JOIN entitylist el ON el.id = tl.entity;

ALTER TABLE v_reporttags
  OWNER TO innoreport;
