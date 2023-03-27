This file should contain:

Your group id
Names and student numbers of all authors;
A direct link (full URL) to the location of the website at 
A brief explanation of your web-site, the structure of your application, including every content file and every code file, the structure of your database.
Logins and passwords of all registered users.
The SQL definition of your database (the CREATE TABLE statements).

We are Group 16
Our names are Marijn Luime(1921142), Jonathan van Dijk(4890477), Taylan Batman(9896392)
See our website: http://webtech.science.uu.nl/group16/
--explain
we used the website https://www.perfomatix.com/nodejs-coding-standards-and-best-practices/ to base our behaviour and the design of our backend
--registered users

--table definitions
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS movie (
title TEXT PRIMARY KEY NOT NULL,
genre TEXT NOT NULL,
year INTEGER NOT NULL,
director TEXT NOT NULL,
writer TEXT NOT NULL,
star TEXT NOT NULL,
poster TEXT NOT NULL,
trailer TEXT NOT NULL,
plot TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS director (
name TEXT PRIMARY KEY NOT NULL,
birthyear INTEGER NOT NULL,
movies TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS writer (
name TEXT PRIMARY KEY NOT NULL,
birthyear INTEGER NOT NULL,
movies TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS actor (
name TEXT PRIMARY KEY NOT NULL,
birthyear INTEGER NOT NULL,
movies TEXT NOT NULL,
photo TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS moviescreening (
title TEXT NOT NULL,
date DATE NOT NULL,
time TIME NOT NULL,
PRIMARY KEY(title, date, time)
);

CREATE TABLE IF NOT EXISTS user (
name TEXT PRIMARY KEY NOT NULL,
email TEXT NOT NULL,
login TEXT NOT NULL,
password TEXT NOT NULL,
address TEXT NOT NULL,
creditcard TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS orderhistory (
user_name TEXT NOT NULL,
moviescreening_title TEXT NOT NULL,
moviescreening_date DATE NOT NULL,
moviescreening_time TIME NOT NULL,
PRIMARY KEY (user_name, moviescreening_title, moviescreening_date, moviescreening_time),
CONSTRAINT orderhistory_fk_user FOREIGN KEY (user_name) 
REFERENCES user(name),
CONSTRAINT orderhistory_fk_user FOREIGN KEY (moviescreening_title) 
REFERENCES moviescreening(title),
CONSTRAINT orderhistory_fk_moviescreening FOREIGN KEY (moviescreening_date) 
REFERENCES moviescreening(date),
CONSTRAINT orderhistory_fk_moviescreening FOREIGN KEY (moviescreening_time) 
REFERENCES moviescreening(time)
);

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('John Wick', 'action-thriller', 2014, 'Chad Stahelski', 'Derek Kolstad', 'Keanu Reeves-Michael Nycvist-Alfie Allen-Adrianne Palicki-Bridget Moynahan', '../images/john_wick_movieposter.jpg', 'https://www.youtube.com/embed/2AUmvWm5ZDQ', 'Legendary assassin John Wick 
(Keanu Reeves) retired from his violent career after marrying the love of his life. Her sudden death leaves John in deep mourning. When sadistic mobster Iosef Tarasov (Alfie Allen) 
and his thugs steal John's prized car and kill the puppy that was a last gift from his wife, John unleashes the remorseless killing machine within and seeks vengeance. Meanwhile, 
Iosef's father (Michael Nyqvist) -- John's former colleague -- puts a huge bounty on John's head. (Source: John Wick page on Rotten Tomatoes)');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('John Wick: Chapter 2', 'action-thriller', 2017, 'Chad Stahelski', 'Derek Kolstad', 'Keanu Reeves-Ruby Rose-Laurence Fishburne-Ian McShane-Riccardo Scamarcio', 'https://m.media-amazon.com/images/M/MV5BMjE2NDkxNTY2M15BMl5BanBnXkFtZTgwMDc2NzE0MTI@._V1_.jpg',
'https://www.youtube.com/embed/ChpLV9AMqm4', 'Bound by an inescapable blood debt to the Italian crime lord, Santino D'Antonio, and with his precious 1969 Mustang still stolen, 
John Wick--the taciturn and pitiless assassin who thirsts for seclusion--is forced to visit Italy to honour his promise. But, soon, the Bogeyman will find himself dragged into 
an impossible task in the heart of Rome's secret criminal society, as every killer in the business dreams of cornering the legendary Wick who now has an enormous price on his head. 
Drenched in blood and mercilessly hunted down, John Wick can surely forget a peaceful retirement as no one can make it out in one piece.';

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('John Wick: Chapter 3 - Parabellum', 'actionPRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS movie (
title TEXT PRIMARY KEY NOT NULL,
genre TEXT NOT NULL,
year INTEGER NOT NULL,
director TEXT NOT NULL,
writer TEXT NOT NULL,
star TEXT NOT NULL,
poster TEXT NOT NULL,
trailer TEXT NOT NULL,
plot TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS director (
name TEXT PRIMARY KEY NOT NULL,
birthyear INTEGER NOT NULL,
movies TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS writer (
name TEXT PRIMARY KEY NOT NULL,
birthyear INTEGER NOT NULL,
movies TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS actor (
name TEXT PRIMARY KEY NOT NULL,
birthyear INTEGER NOT NULL,
movies TEXT NOT NULL,
photo TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS moviescreening (
title TEXT NOT NULL,
date DATE NOT NULL,
time TIME NOT NULL,
PRIMARY KEY(title, date, time)
);

CREATE TABLE IF NOT EXISTS user (
name TEXT PRIMARY KEY NOT NULL,
email TEXT NOT NULL,
login TEXT NOT NULL,
password TEXT NOT NULL,
address TEXT NOT NULL,
creditcard TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS orderhistory (
user_name TEXT NOT NULL,
moviescreening_title TEXT NOT NULL,
moviescreening_date DATE NOT NULL,
moviescreening_time TIME NOT NULL,
PRIMARY KEY (user_name, moviescreening_title, moviescreening_date, moviescreening_time),
CONSTRAINT orderhistory_fk_user FOREIGN KEY (user_name) 
REFERENCES user(name),
CONSTRAINT orderhistory_fk_user FOREIGN KEY (moviescreening_title) 
REFERENCES moviescreening(title),
CONSTRAINT orderhistory_fk_moviescreening FOREIGN KEY (moviescreening_date) 
REFERENCES moviescreening(date),
CONSTRAINT orderhistory_fk_moviescreening FOREIGN KEY (moviescreening_time) 
REFERENCES moviescreening(time)
);

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('John Wick', 'action-thriller', 2014, 'Chad Stahelski', 'Derek Kolstad', 'Keanu Reeves-Michael Nycvist-Alfie Allen-Adrianne Palicki-Bridget Moynahan', '../images/john_wick_movieposter.jpg', 'https://www.youtube.com/embed/2AUmvWm5ZDQ', 'Legendary assassin John Wick 
(Keanu Reeves) retired from his violent career after marrying the love of his life. Her sudden death leaves John in deep mourning. When sadistic mobster Iosef Tarasov (Alfie Allen) 
and his thugs steal John's prized car and kill the puppy that was a last gift from his wife, John unleashes the remorseless killing machine within and seeks vengeance. Meanwhile, 
Iosef's father (Michael Nyqvist) -- John's former colleague -- puts a huge bounty on John's head. (Source: John Wick page on Rotten Tomatoes)');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('John Wick: Chapter 2', 'action-thriller', 2017, 'Chad Stahelski', 'Derek Kolstad', 'Keanu Reeves-Ruby Rose-Laurence Fishburne-Ian McShane-Riccardo Scamarcio', 'https://m.media-amazon.com/images/M/MV5BMjE2NDkxNTY2M15BMl5BanBnXkFtZTgwMDc2NzE0MTI@._V1_.jpg',
'https://www.youtube.com/embed/ChpLV9AMqm4', 'Bound by an inescapable blood debt to the Italian crime lord, Santino D'Antonio, and with his precious 1969 Mustang still stolen, 
John Wick--the taciturn and pitiless assassin who thirsts for seclusion--is forced to visit Italy to honour his promise. But, soon, the Bogeyman will find himself dragged into 
an impossible task in the heart of Rome's secret criminal society, as every killer in the business dreams of cornering the legendary Wick who now has an enormous price on his head. 
Drenched in blood and mercilessly hunted down, John Wick can surely forget a peaceful retirement as no one can make it out in one piece.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('John Wick: Chapter 3 - Parabellum', 'action-thriller', 2019, 'Chad Stahelski', 'Derek Kolstad', 'Keanu Reeves-Halle Berry-Laurence Fishburne-Ian Mcshane-Mark Dacascos', 'https://image.tmdb.org/t/p/original/jeNTqOnux7KSulznSh4UdiDlfmV.jpg',
'https://www.youtube.com/embed/M7XM597XO94', 'In this third installment of the adrenaline-fueled action franchise, skilled assassin John Wick (Keanu Reeves) returns with 
a $14 million price tag on his head and an army of bounty-hunting killers on his trail. After killing a member of the shadowy international assassin's guild, the High Table, 
John Wick is excommunicado, but the world's most ruthless hit men and women await his every turn.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('John Wick: Chapter 3', 'action-thriller', 2023, 'Chad Stahelski', 'Derek Kolstad', 'Keanu Reeves-Donnie Yen-Scott Adkins-Ian Mcshane-Bill Skarsgård', 'https://assets-prd.ignimgs.com/2023/02/08/jw4-2025x3000-online-character-1sht-keanu-v187-1675886090936.jpg',
'https://www.youtube.com/embed/qEVUtrk8_B4', 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy 
with powerful alliances across the globe and forces that turn old friends into foes.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Philosopher's Stone', 'fantasy', 2001, 'Chris Columbus', 'JK Rowling', 'Daniel Radcliffe-Rupert Grint-Emma Watson-Robbie Coltrane-Tom Felton', 'https://fffmovieposters.com/wp-content/uploads/73931.jpg',
'https://www.youtube.com/embed/VyHV0BRtdxo', 'On his eleventh birthday, Harry Potter (Daniel Radcliffe) discovers that he is no ordinary boy. Hagrid (Robbie Coltrane), a beetle-eyed giant, 
tells Harry that he is a wizard and has a place at Hogwarts School of Witchcraft and Wizardry. In his first year of magical education, Harry tackles a fully grown mountain troll, 
learns to play Quidditch, and participates in a thrilling "live" game of chess.');
