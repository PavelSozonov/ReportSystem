-- Function: f_userlist_update(numeric, character varying, character varying, character varying)

-- DROP FUNCTION f_userlist_update(numeric, character varying, character varying, character varying);

/* Update the user */
CREATE OR REPLACE FUNCTION f_userlist_update(
    nid numeric,                                                -- User identifier
    scode character varying,                                    -- New login of a user
    sname character varying DEFAULT NULL::character varying,    -- New full name of a user
    sentity character varying DEFAULT NULL::character varying)  -- New entity's code
  RETURNS void AS
$BODY$
	DECLARE
		nentity numeric(17);    -- Entity identifier
	BEGIN

	    /* Find the entity identifier by code */
	    select id from entitylist into nentity
			where code = sentity;

        /* Update the user */
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
