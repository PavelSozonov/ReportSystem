-- Function: f_entitylist_delete(numeric)

-- DROP FUNCTION f_entitylist_delete(numeric);

CREATE OR REPLACE FUNCTION f_entitylist_delete(nid numeric)
  RETURNS void AS
$BODY$
	BEGIN
		delete from entitylist 
			where id = nid;
	END;
$BODY$
  LANGUAGE plpgsql;
ALTER FUNCTION f_entitylist_delete(numeric)
  OWNER TO innoreport;