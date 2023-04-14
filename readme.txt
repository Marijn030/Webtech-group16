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
On our website the homepage displays all the movies on which you can click to go to their movie description page. In the navigation you can go to the store page to order tickets. In the navigation you can also go to the login page where you can also go to the register page. In the navigation you can also go to the profile page.
--registered users logins and passwords
RickV Veening.2000
HenkNL HStraaten!
Davey030 Janssen.1999
JantjeK Janneman#Kippen
MrPeter PJopjes#1980

--table definitions
PRAGMA foreign_keys = ON;

CREATE TABLE movie (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
genre TEXT NOT NULL,
year INTEGER NOT NULL,
director TEXT NOT NULL,
writer TEXT NOT NULL,
actor TEXT NOT NULL,
poster TEXT NOT NULL,
trailer TEXT NOT NULL,
plot TEXT NOT NULL
);

CREATE TABLE director (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
birthyear INTEGER NOT NULL,
movies TEXT NOT NULL
);

CREATE TABLE writer (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
birthyear INTEGER NOT NULL,
movies TEXT NOT NULL
);

CREATE TABLE actor (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
birthyear INTEGER NOT NULL,
movies TEXT NOT NULL,
photo TEXT NOT NULL
);

CREATE TABLE moviescreening (
id INTEGER PRIMARY KEY AUTOINCREMENT,
movie_id INTEGER NOT NULL,
datetime DATETIME NOT NULL,
CONSTRAINT moviescreening_fk_movie FOREIGN KEY (movie_id) 
REFERENCES movie(id)
);

CREATE TABLE user (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT NOT NULL,
login TEXT NOT NULL,
password TEXT NOT NULL,
address TEXT NOT NULL,
creditcard TEXT NOT NULL
);

CREATE TABLE orderhistory (
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER NOT NULL,
moviescreening_id INTEGER NOT NULL,
CONSTRAINT orderhistory_fk_user FOREIGN KEY (user_id) 
REFERENCES user(id),
CONSTRAINT orderhistory_fk_moviescreening FOREIGN KEY (moviescreening_id) 
REFERENCES moviescreening(id)
);
