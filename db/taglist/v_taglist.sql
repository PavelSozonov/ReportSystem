-- View: v_taglist

-- DROP VIEW v_taglist;

CREATE OR REPLACE VIEW v_taglist AS
 SELECT tl.id AS nid, tl.code AS scode, tl.name AS sname, el.code AS sentity
   FROM taglist tl
   LEFT JOIN entitylist el ON el.id = tl.entity;

ALTER TABLE v_taglist
  OWNER TO innoreport;
