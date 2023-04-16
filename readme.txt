This file should contain:

Your group id
Names and student numbers of all authors;
A direct link (full URL) to the location of the website at 
A brief explanation of your web-site, the structure of your application, including every content file and every code file, the structure of your database.
Logins and passwords of all registered users.
The SQL definition of your database (the CREATE TABLE statements).

--group id
We are Group 16

--names and student numbers all authors
Our names are Marijn Luime(1921142), Jonathan van Dijk(4890477), Taylan Batman(9896392)
See our website: http://webtech.science.uu.nl/group16/

--explanation website
The root of our website is a webpage where the user can see movies that are going to air in the near future. The user can click on any movie and see details about the movie itself. The user can also login and register, in order to buy tickets to these movies and in order to see their user profile.

 
--structure application
The main.js file is basically our entire backend. It has all the middleware, routing, logging, error handling etc. We have a sqlite3 file called cinema, which is our database. Our logger writes all activity to a file called access.log. We have a views map, containing pug files which are rendered in the following cases: on either dynamic pathing in the case of movieinfo, or if its something specific to an user (userprofile), or its just a dynamic loading page (notification). The files in the static map are public. In this map is a general css file for all html (and pug) files. The js files have several functions. Index and store are to handle events in their corresponding html files. nav is for the navigation bar in each website page. The other javascript files hold fetch statements to activate a database query in the main.js file. For example movies is for the home page and currentmovies for the store page.

--structure database
In the database there are the tables movie, director, writer, actor, moviescreening, user and order history. In the table movie there is all the information for the movie description page: title, genre, year, director, writer(s), actors, poster, trailer and plot. All the names of the people who worked on the film in their respective categories are separated in the attributes by a '-'. In moviescreening there is an id, a movie_id as a foreign key and a datetime. There can be multiple moviescreenings per movie, so there is an id for each moviescreening as well. In the table user all the required information for the user is present. In the table orderhistory there are the id's of the order itself (as a user can buy multiple tickets for a moviescreening), a user and of a moviescreening.

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
