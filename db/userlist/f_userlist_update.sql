-- Function: f_userlist_update(numeric, character varying, character varying, character varying)

-- DROP FUNCTION f_userlist_update(numeric, character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION f_userlist_update(
    nid numeric,
    scode character varying,
    sname character varying DEFAULT NULL::character varying,
    sentity character varying DEFAULT NULL::character varying)
  RETURNS void AS
$BODY$
	DECLARE
		nentity numeric(17);
	BEGIN
		select id from entitylist into nentity 
			where code = sentity;
		update userlist set
			code = scode,
			name = sname,
			entity = nentity
			where id = nid;
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_userlist_update(numeric, character varying, character varying, character varying)
  OWNER TO innoreport;
