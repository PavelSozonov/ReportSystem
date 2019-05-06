-- View: v_taglist

-- DROP VIEW v_taglist;

/* Tags */
CREATE OR REPLACE VIEW v_taglist AS
 SELECT tl.id AS nid,       -- Identifier
        tl.code AS scode,   -- Tag code (short name)
        tl.name AS sname,   -- Tag full name
        el.code AS sentity  -- Entity for Classifier module
   FROM taglist tl
   LEFT JOIN entitylist el ON el.id = tl.entity;

ALTER TABLE v_taglist
  OWNER TO innoreport;
