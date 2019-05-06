-- Function: f_reports_delete(numeric)

-- DROP FUNCTION f_reports_delete(numeric);

/* Delete the report */
CREATE OR REPLACE FUNCTION f_reports_delete(
    nid numeric -- Report identifier
    )
  RETURNS void AS
$BODY$
	BEGIN

        /* Delete the report history */
        delete from reporthistory
            where report = nid;

        /* Delete the report tags */
        delete from reporttags
        where report = nid;

        /* Delete the report */
		delete from reports
			where id = nid;

	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_reports_delete(numeric)
  OWNER TO innoreport;
