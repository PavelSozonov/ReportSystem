-- Function: f_entitylist_delete(numeric)

-- DROP FUNCTION f_entitylist_delete(numeric);

/* Delete the entity */
CREATE OR REPLACE FUNCTION f_entitylist_delete(
    nid numeric -- Entity identifier
    )
  RETURNS void AS
$BODY$
	BEGIN

	    /* Delete the entity */
	    delete from entitylist
			where id = nid;

	END;
$BODY$
  LANGUAGE plpgsql;
ALTER FUNCTION f_entitylist_delete(numeric)
  OWNER TO innoreport;