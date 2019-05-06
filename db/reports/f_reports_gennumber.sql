-- Function: f_reports_gennumber()

-- DROP FUNCTION f_reports_gennumber();

/* Generation next number for a report within a current year */
CREATE OR REPLACE FUNCTION f_reports_gennumber()
    RETURNS character varying AS
$BODY$
DECLARE
    nreport_count numeric(17);          -- report count in a current year
    nyear numeric(4);                   -- current year
    sreport_number character varying;   -- result report number
BEGIN

    /* Find current year */
    select EXTRACT(ISOyear FROM now()) into nyear;

    /* Find count of the reports created in the current year */
    select count(report)
        from reporthistory
        where EXTRACT(ISOyear FROM changedate) = nyear and status = 0 -- status = new
            into nreport_count;

    /* Calculate new report number */
    sreport_number := TO_CHAR(nyear,'FM9999') ||'-'|| TO_CHAR(nreport_count + 1,'FM0999999');

    /* Return new report number */
    return sreport_number;
END;
$BODY$
    LANGUAGE plpgsql VOLATILE
    COST 100;
ALTER FUNCTION f_reports_gennumber()
    OWNER TO innoreport;