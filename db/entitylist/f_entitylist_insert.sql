-- Function: f_entitylist_insert(character varying, character varying)

-- DROP FUNCTION f_entitylist_insert(character varying, character varying);

/* Add new entity */
CREATE OR REPLACE FUNCTION f_entitylist_insert(
    scode character varying, -- Entity's code (short name)
    sname character varying  -- Entity's full name
    )
  RETURNS numeric AS
$BODY$
    DECLARE
	    nid numeric(17); -- Identifier
    BEGIN

        /* Identifier generation */
        nid := gen_id();

        /* Add new entity */
        insert into entitylist
            values (nid, scode, sname);

        /* Return identifier of an entity created */
        return nid;

    END;

$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_entitylist_insert(character varying, character varying)
  OWNER TO innoreport;
