--CREATE OR REPLACE FUNCTION reset_sequence(table_name TEXT, sequence_name TEXT)
--RETURNS VOID AS $$
--DECLARE
--    max_id BIGINT;
--BEGIN
--    EXECUTE format('SELECT MAX(id) FROM %I', table_name) INTO max_id;
--    EXECUTE format('ALTER SEQUENCE %I RESTART WITH %s', sequence_name, max_id + 1);
--END;
--$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION reset_sequence(table_name TEXT)
RETURNS VOID AS $$
DECLARE
    sequence_name TEXT;
    max_id BIGINT;
BEGIN
    sequence_name := table_name || '_id_seq';
    EXECUTE format('SELECT MAX(id) FROM %I', table_name) INTO max_id;
    EXECUTE format('ALTER SEQUENCE %I RESTART WITH %s', sequence_name, max_id + 1);
END;
$$ LANGUAGE plpgsql;