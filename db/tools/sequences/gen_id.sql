-- Function: gen_id()

-- DROP FUNCTION gen_id();

CREATE OR REPLACE FUNCTION gen_id()
  RETURNS numeric AS
$BODY$
	DECLARE
		nid numeric(17);
	BEGIN
		SELECT nextval('seq_id') into nid;
		return nid;
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION gen_id()
  OWNER TO innoreport;
