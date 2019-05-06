-- Function: f_userlist_set_password(numeric, character varying)

-- DROP FUNCTION f_userlist_set_password(numeric, character varying);

/* Set user password */
CREATE OR REPLACE FUNCTION f_userlist_set_password(
    nid numeric,                                                -- User identifier
    spassword character varying DEFAULT NULL::character varying -- New password of the user
    )
  RETURNS void AS
$BODY$
	BEGIN

        /* Update the user */
		update userlist set
			password = spassword
			where id = nid;

	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_userlist_set_password(numeric, character varying)
  OWNER TO innoreport;
