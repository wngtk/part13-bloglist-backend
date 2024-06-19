CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, title, likes, url) values ('Dan Abramov', 'On let vs const', 0, 'https://overreacted.io/on-let-vs-const/');
insert into blogs (author, title, likes, url) values ('Laurenz Albe', 'Gaps in sequences in PostgreSQL', 0, 'https://www.cybertec-postgresql.com/en/gaps-in-sequences-postgresql/');
