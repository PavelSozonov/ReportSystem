-- Function: f_userlist_delete(numeric)

-- DROP FUNCTION f_userlist_delete(numeric);

/* Delete the user */
CREATE OR REPLACE FUNCTION f_userlist_delete(
    nid numeric -- User identifier
    )
  RETURNS void AS
$BODY$
	BEGIN

        /* Delete the user */
		delete from userlist 
			where id = nid;
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_userlist_delete(numeric)
  OWNER TO innoreport;
