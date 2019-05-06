-- Function: f_reports_send(numeric, character varying)

-- DROP FUNCTION f_reports_send(numeric, character varying);

/* Send the report to an entity */
CREATE OR REPLACE FUNCTION f_reports_send(
    nid numeric,                -- Report identifier
    sentity character varying   -- Code of the entity
    )
  RETURNS void AS
$BODY$
	DECLARE
		dchangedate timestamp without time zone; -- Date of the report sending
		nstatus numeric(1);                      -- Status
		nentity numeric(17,0);                   -- Entity identifier
	BEGIN

	    /* Get current time */
	    dchangedate := now();

	    /* Define the new status */
		nstatus := 1; -- sent

        /* Find identifier of the entity by code */
		select id from entitylist into nentity 
			where code = sentity;

		/* Update the report */
		update reports
			set recipient = nentity
		    where id = nid;

		/* Change status of the report */
		perform f_reports_changestatus(nid, nstatus);

	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_reports_send(numeric, character varying)
  OWNER TO innoreport;
