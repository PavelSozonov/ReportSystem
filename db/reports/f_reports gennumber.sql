-- Function: gen_reportnumber()

-- DROP FUNCTION gen_reportnumber();

CREATE OR REPLACE FUNCTION gen_reportnumber()
  RETURNS character varying AS
$BODY$
	DECLARE
		nreport_count numeric(17);
		nyear numeric(4);
		sreport_number character varying;
	BEGIN
		select EXTRACT(ISOyear FROM now()) into nyear;
		select count(report)
			from reporthistory 
			where EXTRACT(ISOyear FROM changedate) = nyear and status = 0
			into nreport_count; -- количество созданных в текущем году отчетов из истории
		sreport_number := TO_CHAR(nyear,'FM9999') ||'-'|| TO_CHAR(nreport_count + 1,'FM0999999');
		return sreport_number;
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION gen_reportnumber()
  OWNER TO innoreport;
