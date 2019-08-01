CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) UNIQUE,
    password VARCHAR(64),
    avatar TEXT
);

CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(64),
    content TEXT,
    image TEXT,
    edited_time TIMESTAMP DEFAULT NOW(),
    owner_id INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL,
    cat_name TEXT,
    notes_id INT REFERENCES notes(id),
    owner_id INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS shared_notes (
    id SERIAL PRIMARY KEY,
    notes_id INT REFERENCES notes(id),
    owner_id INT REFERENCES users(id),
    shared_id INT REFERENCES users(id)
);

/////!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

---------------------------
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.edited_time = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(64),
    content TEXT,
    image TEXT,
    edited_time TIMESTAMP DEFAULT NOW(),
    owner_id INT REFERENCES users(id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON notes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
