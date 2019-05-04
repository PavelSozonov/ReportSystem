-- Function: f_taglist_insert(character varying, character varying, character varying)

-- DROP FUNCTION f_taglist_insert(character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION f_taglist_insert(
    scode character varying,
    sname character varying,
    sentity character varying DEFAULT NULL::character varying)
  RETURNS numeric AS
$BODY$
    DECLARE
	    nid numeric(17);
        nentity numeric(17);
    BEGIN
        select id from entitylist into nentity
            where code = sentity;
        nid := gen_id();
        insert into taglist
        values (nid, scode, sname, nentity);
        return nid;
    END;

$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_taglist_insert(character varying, character varying, character varying)
  OWNER TO innoreport;
