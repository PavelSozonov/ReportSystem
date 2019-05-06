-- Function: f_reports_insert(character varying, character varying, character varying)

-- DROP FUNCTION f_reports_insert(character varying, character varying, character varying);

/* Add new report to the system */
CREATE OR REPLACE FUNCTION f_reports_insert(
    stitle character varying,       -- Report title
    sdescription character varying, -- Report description
    ssender character varying)      -- Login of the report's sender
  RETURNS numeric AS
$BODY$
	DECLARE
		nid numeric(17);                         -- New report identifier
		nsender numeric(17);                     -- Sender (user) identifier
		dchangedate timestamp without time zone; -- Date of the report creation
		nstatus numeric(1) := 0;                 -- Status of the new report = new
		snumber character varying(40);           -- Number of the new report
	BEGIN

        /* Identifier generation */
	    nid := gen_id();

	    /* Get current time */
		dchangedate := now();

		/* Report number generation */
		snumber := f_reports_gennumber();

        /* Find identifier of the user by login */
		select id from userlist into nsender
			where code = ssender;

		/* Add new report */
		insert into reports
			values (nid, stitle, sdescription, nsender, null, nstatus, dchangedate, snumber);

		/* Add history */
		perform f_reporthistory_insert(nid, nstatus, dchangedate);

		/* Return identifier of the report created */
		return nid;

	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_reports_insert(character varying, character varying, character varying)
  OWNER TO innoreport;
