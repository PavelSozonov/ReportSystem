-- Function: f_reports_changestatus(numeric, numeric)

-- DROP FUNCTION f_reports_changestatus(numeric, numeric);

/* Change status of a report */
CREATE OR REPLACE FUNCTION f_reports_changestatus(
    nid numeric,        -- Report identifier
    nstatus numeric     -- New status of the report
                            /* 0 - new
                               1 - sent
                               2 - received
                               3 - in-progress
                               4 - solved
                               5 - declined */
    )
  RETURNS void AS
$BODY$
	DECLARE
		dchangedate timestamp without time zone; -- Date of the report status change
	BEGIN

        -- Example of status change rules
	    /* if nstatus = 3 then
          RAISE NOTICE 'It is impossible to go to the status  %', nstatus;
          return;
        end if; */

		/* Get current time */
        dchangedate := now();

		/* Update the report */
		update reports
			set status = nstatus,
			    changedate = dchangedate
            where id = nid;

	    /* Insert record to the history */
		perform f_reporthistory_insert(nid, nstatus, dchangedate);

	END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION f_reports_changestatus(numeric, numeric)
  OWNER TO innoreport;
