-- Function: f_entitylist_update(numeric, character varying, character varying)

-- DROP FUNCTION f_entitylist_update(numeric, character varying, character varying);

CREATE OR REPLACE FUNCTION f_entitylist_update(
    nid numeric,
    scode character varying,
    sname character varying DEFAULT NULL::character varying)
  RETURNS void AS
$BODY$
	DECLARE
		nentity numeric(17);
	BEGIN
		update entitylist set
			code = scode,
			name = sname
			where id = nid;
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_entitylist_update(numeric, character varying, character varying)
  OWNER TO innoreport;
