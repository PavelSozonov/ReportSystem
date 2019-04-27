-- Function: f_reports_sent(numeric, character varying)

-- DROP FUNCTION f_reports_sent(numeric, character varying);

CREATE OR REPLACE FUNCTION f_reports_sent(
    nid numeric,
    sentity character varying)
  RETURNS void AS
$BODY$
	DECLARE
		dchangedate timestamp without time zone;
		nstatus numeric(1);
		nentity numeric(17,0);
	BEGIN
		dchangedate := now();
		nstatus := 1; -- sent
		select id from entitylist into nentity 
			where code = sentity;		
		update reports
			set recipient = nentity;
		perform f_reports_changestatus(nid, nstatus);
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_reports_sent(numeric, character varying)
  OWNER TO innoreport;
