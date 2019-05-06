-- Function: f_entitylist_update(numeric, character varying, character varying)

-- DROP FUNCTION f_entitylist_update(numeric, character varying, character varying);

/* Update the entity */
CREATE OR REPLACE FUNCTION f_entitylist_update(
    nid numeric,                                             -- Entity identifier
    scode character varying,                                 -- New code of the entity (short name)
    sname character varying DEFAULT NULL::character varying) -- New full name of the entity
  RETURNS void AS
$BODY$
	BEGIN

	    /* Update the entity */
		update entitylist set
			code = scode,
			name = sname
			where id = nid;

	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_entitylist_update(numeric, character varying, character varying)
  OWNER TO innoreport;
