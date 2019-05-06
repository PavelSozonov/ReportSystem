-- Function: f_reporthistory_insert(numeric, numeric, timestamp without time zone)

-- DROP FUNCTION f_reporthistory_insert(numeric, numeric, timestamp without time zone);

/* Add history record of status changes */
CREATE OR REPLACE FUNCTION f_reporthistory_insert(
    nreport numeric,                         -- Report identifier
    nstatus numeric,                         -- New status of a report
                                             /*  0 - new,
                                                 1 - sent,
                                                 2 - received,
                                                 3 - in-progress,
                                                 4 - solved,
                                                 5 - declined
                                             */
    dchangedate timestamp without time zone) -- Date of status change
  RETURNS numeric AS
$BODY$
	DECLARE
		nid numeric(17);    -- History identifier
	BEGIN

        /* Identifier generation */
	    nid := gen_id();

	    /* Add new record to the history */
		insert into reporthistory
			values (nid, nreport, nstatus, dchangedate);

	    /* Return history identifier */
		return nid;

	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_reporthistory_insert(numeric, numeric, timestamp without time zone)
  OWNER TO innoreport;
