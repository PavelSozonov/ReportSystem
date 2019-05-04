-- Function: f_userlist_delete(numeric)

-- DROP FUNCTION f_userlist_delete(numeric);

CREATE OR REPLACE FUNCTION f_userlist_delete(nid numeric)
  RETURNS void AS
$BODY$
	BEGIN
		delete from userlist 
			where id = nid;
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_userlist_delete(numeric)
  OWNER TO innoreport;
