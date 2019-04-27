-- Function: f_reporttags_insert(numeric, character varying)

-- DROP FUNCTION f_reporttags_insert(numeric, character varying);

CREATE OR REPLACE FUNCTION f_reporttags_insert(
    nreport numeric,
    stag character varying)
  RETURNS numeric AS
$BODY$
	DECLARE
		nid numeric(17);
		ntag numeric(17);
	BEGIN
		nid := gen_id();
		select id from taglist into ntag 
			where code = stag;	
		insert into reporttags
			values (nid, nreport, ntag);
		return nid;
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_reporttags_insert(numeric, character varying)
  OWNER TO innoreport;
