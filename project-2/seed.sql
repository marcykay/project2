-- CREATE TABLE notes (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(64),
--     content TEXT,
--     image TEXT,
--     edited_time TIMESTAMP DEFAULT now(),
--     owner_id INT REFERENCES users(id)
-- );

INSERT INTO notes (title, content, owner_id) values ('Dog Anatomy', 'Dog anatomy comprises the anatomical studies of the visible parts of the body of a canine. Details of structures vary tremendously from breed to breed, more than in any other animal species, wild or domesticated, as dogs are highly variable in height and weight.', '23');



INSERT INTO notes (title, content, owner_id) values ('Cat Anatomy', 'The cat skull is unusual among mammals in having very large eye sockets and a powerful and specialized jaw. Compared to other felines, domestic cats have narrowly spaced canine teeth, adapted to their preferred prey of small rodents.', '23');

INSERT INTO notes (title, content, image, owner_id) values ('Google', 'Google is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple and Facebook.', '23');

INSERT INTO notes (title, content, owner_id) values ('Faker Notes', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '23');

INSERT INTO notes (title, content, owner_id) values ('Faking Notes', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '23');
