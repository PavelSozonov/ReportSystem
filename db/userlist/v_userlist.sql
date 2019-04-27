-- View: v_userlist

-- DROP VIEW v_userlist;

CREATE OR REPLACE VIEW v_userlist AS 
 SELECT ul.id AS nid, ul.code AS scode, ul.name AS sname, el.code AS sentity, 
    ul.password AS spassword
   FROM userlist ul
   LEFT JOIN entitylist el ON el.id = ul.entity;

ALTER TABLE v_userlist
  OWNER TO innoreport;
