-- Function: f_reports_insert(character varying, character varying, character varying)

-- DROP FUNCTION f_reports_insert(character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION f_reports_insert(
    stitle character varying,
    sdescription character varying,
    ssender character varying)
  RETURNS numeric AS
$BODY$
	DECLARE
		nid numeric(17);
		nsender numeric(17);
		dchangedate timestamp without time zone;
		nstatus numeric(1) := 0; -- новый
		snumber character varying(40);
	BEGIN
		nid := gen_id();
		dchangedate := now();
		snumber := f_reports_gennumber();
		
		select id from userlist into nsender 
			where code = ssender;	
		insert into reports
			values (nid, stitle, sdescription, nsender, null, nstatus, dchangedate, snumber);
		perform f_reporthistory_insert(nid, nstatus, dchangedate);
		return nid;
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_reports_insert(character varying, character varying, character varying)
  OWNER TO innoreport;
