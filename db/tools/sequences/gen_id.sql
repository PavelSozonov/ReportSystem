-- Function: gen_id()

-- DROP FUNCTION gen_id();

/* Identifier generation */
CREATE OR REPLACE FUNCTION gen_id()
  RETURNS numeric AS
$BODY$
	DECLARE
		nid numeric(17);
	BEGIN
		/* Get next value from the sequence */
	    SELECT nextval('seq_id') into nid;
		return nid;
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION gen_id()
  OWNER TO innoreport;
