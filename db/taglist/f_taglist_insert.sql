-- Function: f_taglist_insert(character varying, character varying)

-- DROP FUNCTION f_taglist_insert(character varying, character varying);

CREATE OR REPLACE FUNCTION f_taglist_insert(
    scode character varying,
    sname character varying)
  RETURNS numeric AS
$BODY$DECLARE
	nid numeric(17);
BEGIN
	nid := gen_id();
	insert into taglist
	values (nid, scode, sname);
	return nid;
END;

$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_taglist_insert(character varying, character varying)
  OWNER TO innoreport;
