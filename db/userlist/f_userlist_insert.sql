-- Function: f_userlist_insert(character varying, character varying, character varying)

-- DROP FUNCTION f_userlist_insert(character varying, character varying, character varying);

/* Add new user */
CREATE OR REPLACE FUNCTION f_userlist_insert(
    scode character varying,                                    -- User's login
    sname character varying DEFAULT NULL::character varying,    -- User's full name
    sentity character varying DEFAULT NULL::character varying)  -- Code of an entity
  RETURNS numeric AS
$BODY$
	DECLARE
		nid numeric(17);     -- New user identifier
		nentity numeric(17); -- Entity's identifier
	BEGIN

        /* Identifier generation */
	    nid := gen_id();

	    /* Find identifier of the entity by code */
		select id from entitylist into nentity 
			where code = sentity;

		/* Add new user */
		insert into userlist
		    values (nid, scode, sname, nentity);

        /* Return identifier of the user created */
		return nid;

	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_userlist_insert(character varying, character varying, character varying)
  OWNER TO innoreport;
