-- Function: f_userlist_insert(character varying, character varying, character varying)

-- DROP FUNCTION f_userlist_insert(character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION f_userlist_insert(
    scode character varying,
    sname character varying DEFAULT NULL::character varying,
    sentity character varying DEFAULT NULL::character varying)
  RETURNS numeric AS
$BODY$
	DECLARE
		nid numeric(17);
		nentity numeric(17);
	BEGIN
		nid := gen_id();
		select id from entitylist into nentity 
			where code = sentity;
		insert into userlist
		values (nid, scode, sname, nentity);
		return nid;
	END;
$BODY$
  LANGUAGE plpgsql;
  
ALTER FUNCTION f_userlist_insert(character varying, character varying, character varying)
  OWNER TO innoreport;
