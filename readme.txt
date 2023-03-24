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

);

CREATE TABLE IF NOT EXISTS user (

);
