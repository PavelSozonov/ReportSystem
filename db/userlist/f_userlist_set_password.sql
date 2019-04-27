-- Function: f_userlist_set_password(numeric, character varying)

-- DROP FUNCTION f_userlist_set_password(numeric, character varying);

CREATE OR REPLACE FUNCTION f_userlist_set_password(
    nid numeric,
    spassword character varying DEFAULT NULL::character varying)
  RETURNS void AS
$BODY$
	DECLARE
		nentity numeric(17);
	BEGIN
		update userlist set
			password = spassword
			where id = nid;
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_userlist_set_password(numeric, character varying)
  OWNER TO innoreport;
