-- Function: f_taglist_insert(character varying, character varying, character varying)

-- DROP FUNCTION f_taglist_insert(character varying, character varying, character varying);

/* Add new tag */
CREATE OR REPLACE FUNCTION f_taglist_insert(
    scode character varying,                                    -- Tag code (short name)
    sname character varying,                                    -- Tag full name
    sentity character varying DEFAULT NULL::character varying)  -- Code of an entity
  RETURNS numeric AS
$BODY$
    DECLARE
	    nid numeric(17);     -- New tag identifier
        nentity numeric(17); -- Entity's identifier
    BEGIN

        /* Find identifier of the entity by code */
        select id from entitylist into nentity
            where code = sentity;

        /* Identifier generation */
        nid := gen_id();

        /* Add new tag */
        insert into taglist
            values (nid, scode, sname, nentity);

        /* Return identifier of the tag created */
        return nid;

    END;

$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_taglist_insert(character varying, character varying, character varying)
  OWNER TO innoreport;
