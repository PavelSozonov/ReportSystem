-- View: v_userlist

-- DROP VIEW v_userlist;

/* Users */
CREATE OR REPLACE VIEW v_userlist AS 
 SELECT ul.id AS nid,               -- Identifier
        ul.code AS scode,           -- User's login
        ul.name AS sname,           -- User's full name
        el.code AS sentity,         -- Entity (null - citizen, not null - user is an entity's employee)
        ul.password AS spassword    -- User's password
   FROM userlist ul
   LEFT JOIN entitylist el ON el.id = ul.entity;

ALTER TABLE v_userlist
  OWNER TO innoreport;
