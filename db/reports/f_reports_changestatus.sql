-- Function: f_reports_changestatus(numeric, numeric)

-- DROP FUNCTION f_reports_changestatus(numeric, numeric);

CREATE OR REPLACE FUNCTION f_reports_changestatus(
    nid numeric,
    nstatus numeric)
  RETURNS void AS
$BODY$
	DECLARE
		dchangedate timestamp without time zone;
	BEGIN
		/* begin */
			-- здесь место для обработки логики смены статусов (nstatus)
			-- 0 - new
			-- 1 - sent
			-- 2 - received
			-- 3 - in-progress
			-- 4 - solved
			-- 5 - declined
			/* if nstatus = 3 then
			  RAISE NOTICE 'It is impossible to go to the status  %', nstatus;
			  return;
			end if; */
		/* end */
		dchangedate := now();
		update reports
			set status = nstatus,
			    changedate = dchangedate;
		perform f_reporthistory_insert(nid, nstatus, dchangedate);
	END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION f_reports_changestatus(numeric, numeric)
  OWNER TO innoreport;
