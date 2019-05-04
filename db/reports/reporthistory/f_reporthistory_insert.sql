-- Function: f_reporthistory_insert(numeric, numeric, timestamp without time zone)

-- DROP FUNCTION f_reporthistory_insert(numeric, numeric, timestamp without time zone);

CREATE OR REPLACE FUNCTION f_reporthistory_insert(
    nreport numeric,
    nstatus numeric,
    dchangedate timestamp without time zone)
  RETURNS numeric AS
$BODY$
	DECLARE
		nid numeric(17);
	BEGIN
		nid := gen_id();
		insert into reporthistory
			values (nid, nreport, nstatus, dchangedate);
		return nid;
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_reporthistory_insert(numeric, numeric, timestamp without time zone)
  OWNER TO innoreport;
