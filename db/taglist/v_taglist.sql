-- View: v_taglist

-- DROP VIEW v_taglist;

CREATE OR REPLACE VIEW v_taglist AS
 SELECT tl.id AS nid, tl.code AS scode, tl.name AS sname
   FROM taglist tl;

ALTER TABLE v_taglist
  OWNER TO innoreport;
