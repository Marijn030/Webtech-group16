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

CREATE TABLE movie (
title TEXT PRIMARY KEY NOT NULL,
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
directorname TEXT PRIMARY KEY NOT NULL,
birthyear INTEGER NOT NULL,
movies TEXT NOT NULL
);

CREATE TABLE writer (
writername TEXT PRIMARY KEY NOT NULL,
birthyear INTEGER NOT NULL,
movies TEXT NOT NULL
);

CREATE TABLE actor (
actorname TEXT PRIMARY KEY NOT NULL,
birthyear INTEGER NOT NULL,
movies TEXT NOT NULL,
photo TEXT NOT NULL
);

CREATE TABLE moviescreening (
movie_title TEXT NOT NULL,
date DATE NOT NULL,
time TIME NOT NULL,
PRIMARY KEY(movie_title, date, time)
CONSTRAINT moviescreening_fk_movie FOREIGN KEY (movie_title) 
REFERENCES movie(title)
);

CREATE TABLE user (
name TEXT PRIMARY KEY NOT NULL,
email TEXT NOT NULL,
login TEXT NOT NULL,
password TEXT NOT NULL,
address TEXT NOT NULL,
creditcard TEXT NOT NULL
);

CREATE TABLE orderhistory (
user_name TEXT NOT NULL,
movie_title TEXT NOT NULL,
moviescreening_date DATE NOT NULL,
moviescreening_time TIME NOT NULL,
PRIMARY KEY (user_name, movie_title, moviescreening_date, moviescreening_time),
CONSTRAINT orderhistory_fk_user FOREIGN KEY (user_name) 
REFERENCES user(name),
CONSTRAINT orderhistory_fk_movie FOREIGN KEY (movie_title) 
REFERENCES movie(title),
CONSTRAINT orderhistory_fk_moviescreening FOREIGN KEY (moviescreening_date) 
REFERENCES moviescreening(date),
CONSTRAINT orderhistory_fk_moviescreening FOREIGN KEY (moviescreening_time) 
REFERENCES moviescreening(time)
);

--table filling
/*The information comes from wikipedia and the plot comes from imdb.*/

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('John Wick', 'action-thriller', 2014, 'Chad Stahelski', 'Derek Kolstad', 'Keanu Reeves-Michael Nycvist-Alfie Allen-Adrianne Palicki-Bridget Moynahan', '../images/john_wick_movieposter.jpg', 'https://www.youtube.com/embed/2AUmvWm5ZDQ', 'Legendary assassin John Wick 
(Keanu Reeves) retired from his violent career after marrying the love of his life. Her sudden death leaves John in deep mourning. When sadistic mobster Iosef Tarasov (Alfie Allen) 
and his thugs steal Johns prized car and kill the puppy that was a last gift from his wife, John unleashes the remorseless killing machine within and seeks vengeance. Meanwhile, 
Iosefs father (Michael Nyqvist) -- Johns former colleague -- puts a huge bounty on Johns head. (Source: John Wick page on Rotten Tomatoes)');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('John Wick: Chapter 2', 'action-thriller', 2017, 'Chad Stahelski', 'Derek Kolstad', 'Keanu Reeves-Ruby Rose-Laurence Fishburne-Ian McShane-Riccardo Scamarcio', 'https://m.media-amazon.com/images/M/MV5BMjE2NDkxNTY2M15BMl5BanBnXkFtZTgwMDc2NzE0MTI@._V1_.jpg',
'https://www.youtube.com/embed/ChpLV9AMqm4', 'Bound by an inescapable blood debt to the Italian crime lord, Santino D Antonio, and with his precious 1969 Mustang still stolen, 
John Wick--the taciturn and pitiless assassin who thirsts for seclusion--is forced to visit Italy to honour his promise. But, soon, the Bogeyman will find himself dragged into 
an impossible task in the heart of Romes secret criminal society, as every killer in the business dreams of cornering the legendary Wick who now has an enormous price on his head. 
Drenched in blood and mercilessly hunted down, John Wick can surely forget a peaceful retirement as no one can make it out in one piece.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('John Wick: Chapter 3 - Parabellum', 'action-thriller', 2019, 'Chad Stahelski', 'Derek Kolstad', 'Keanu Reeves-Halle Berry-Laurence Fishburne-Ian Mcshane-Mark Dacascos', 'https://image.tmdb.org/t/p/original/jeNTqOnux7KSulznSh4UdiDlfmV.jpg',
'https://www.youtube.com/embed/M7XM597XO94', 'In this third installment of the adrenaline-fueled action franchise, skilled assassin John Wick returns with 
a $14 million price tag on his head and an army of bounty-hunting killers on his trail. After killing a member of the shadowy international assassins guild, the High Table, 
John Wick is excommunicado, but the worlds most ruthless hit men and women await his every turn.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('John Wick: Chapter 4', 'action-thriller', 2023, 'Chad Stahelski', 'Derek Kolstad', 'Keanu Reeves-Donnie Yen-Scott Adkins-Ian Mcshane-Bill Skarsgård', 'https://assets-prd.ignimgs.com/2023/02/08/jw4-2025x3000-online-character-1sht-keanu-v187-1675886090936.jpg',
'https://www.youtube.com/embed/qEVUtrk8_B4', 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy 
with powerful alliances across the globe and forces that turn old friends into foes.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Philosophers Stone', 'fantasy', 2001, 'Chris Columbus', 'JK Rowling', 'Daniel Radcliffe-Rupert Grint-Emma Watson-Robbie Coltrane-Tom Felton', 'https://fffmovieposters.com/wp-content/uploads/73931.jpg',
'https://www.youtube.com/embed/VyHV0BRtdxo', 'On his eleventh birthday, Harry Potter discovers that he is no ordinary boy. Hagrid, a beetle-eyed giant, 
tells Harry that he is a wizard and has a place at Hogwarts School of Witchcraft and Wizardry. In his first year of magical education, Harry tackles a fully grown mountain troll, 
learns to play Quidditch, and participates in a thrilling "live" game of chess.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Chamber of Secrets', 'fantasy', 2002, 'Chris Columbus', 'JK Rowling', 'Daniel Radcliffe-Rupert Grint-Emma Watson-Kenneth Branagh-Richard Harris', 'https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_.jpg',
'https://www.youtube.com/embed/jBltxS8HfQ4', 'It is year two at Hogwarts, and Harry, Ron, and Hermione are back learning, 
but their year does not go passed quietly. Members of the school are turning up petrified and bloody writings are appearing on the walls, revealing to everyone, 
that someone has opened the Chamber of Secrets. The attacks continue, bringing the possibility of the closure of Hogwarts. Harry and his friends are now forced 
to secretly uncover the truth about the chamber before the school closes or any lives are taken.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Prisoner of Azkaban', 'fantasy', 2004, 'Alfonso Cuarón', 'JK Rowling', 'Daniel Radcliffe-Emma Watson-Rupert Grint-Gary Oldman-Michael Gambon', 'https://cdn.shopify.com/s/files/1/0037/8008/3782/products/harry-potter-and-the-prisoner-of-azkaban_DS-OS-Style-A-399685_35a1b3f2-5fd6-47bb-a866-77c19b1ddbf5_1024x1024@2x.jpg?v=1637162000',
'https://www.youtube.com/embed/lAxgztbYDbs', 'In the summer before his third year at Hogwarts, Harry Potter becomes fed up with his horrible aunt and uncle, 
and after accidentally inflating his visiting Aunt Marge, he runs away. Unfortunately, there is much more danger in the wizarding world than Harry thought. 
Convicted murderer Sirius Black has escaped from the wizarding prison Azkaban. Black is known as Lord Voldemorts most devoted follower, 
and he is after Harry to avenge Voldemort and finish the job. But not everything is what it seems, and inside of Hogwarts there may just be a traitor.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Goblet of Fire', 'fantasy', 2005, 'Mike Newell', 'JK Rowling', 'Daniel Radcliffe-Emma Watson-Rupert Grint-Robert Pattinson-Ralph Fiennes', 'https://static.wikia.nocookie.net/qghficsimjkaeibhfztnpjrqiezhzuadzsjxwpnxusefbthfes/images/4/4a/35FFD453-DFDD-4C2C-93C2-FDE66CCB14D6.webp/revision/latest?cb=20210812224339',
'https://www.youtube.com/embed/3EGojp4Hh6I', 'Harry Potter returns to Hogwarts for his fourth year, where the Triwizard Tournament is soon due to begin. 
Students must be over seventeen to enter, with the winner receiving eternal glory. Harry cannot enter it this year, or can he. When his name is read out from the Goblet of Fire, 
everyone assumes that Harry has cheated. Harry insists that he never placed his name in there, with someone else behind it. But who? Harry must now survive through dragons, 
sea creatures and a terrifying maze, all before coming face-to-face with a particular dark wizard.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Order of the Phoenix', 'fantasy', 2007, 'David Yates', 'JK Rowling', 'Daniel Radcliffe-Emma Watson-Rupert Grint-Robbie Coltrane-Ralph Fiennes', 'https://m.media-amazon.com/images/M/MV5BOTA3MmRmZDgtOWU1Ny00ZDc5LWFkN2YtNzNlY2UxZmY0N2IyXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg',
'https://www.youtube.com/embed/y6ZW7KXaXYk', 'After a disastrous summer with the Dursleys, including an encounter with the Dementors, Harry (Daniel Radcliffe) is shunned by 
friends upon returning to Hogwarts, after the return of Lord Voldemort and no one believes him. He starts his fifth year while new Defense Against the 
Dark Arts teacher, Professor Dolores Jane Umbridge refuses to teach them defensive spells while refuting Harrys claims of the Dark Lords return. 
So Harry sets out, with Ron and Hermione, to start up "Dumbledores Army" to battle evil forces and prepare the fellow young witches and 
wizards for the extraordinary journey that lies ahead.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Half-Blood Prince', 'fantasy', 2009, 'David Yates', 'JK Rowling', 'Daniel Radcliffe-Emma Watson-Rupert Grint-Alan Rickman-Tom Felton', 'https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_.jpg',
'https://www.youtube.com/embed/tAiy66Xrsz4', 'After a disastrous summer with the Dursleys, including an encounter with the Dementors, Harry is shunned by friends upon returning to 
Hogwarts, after the return of Lord Voldemort and no one believes him. He starts his fifth year while new Defense Against the Dark Arts teacher, 
Professor Dolores Jane Umbridge refuses to teach them defensive spells while refuting Harrys claims of the Dark Lords return. So Harry sets out, with Ron and Hermione, 
to start up "Dumbledores Army" to battle evil forces and prepare the fellow young witches and wizards for the extraordinary journey that lies ahead.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Deathly Hallows - Part 1', 'fantasy', 2010, 'David Yates', 'JK Rowling', 'Daniel Radcliffe-Emma Watson-Rupert Grint-Tom Felton-Ralph Fiennes', 'https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_.jpg',
'https://www.youtube.com/embed/qJRvBtqOOz8', 'While villainous Lord Voldemort begins taking over the Ministry of Magic, Harry, Ron and Hermione must race against time to 
finish Dumbledores quest to find and destroy Voldemorts Horcruxes in order to stop the Dark Lord once and for all. On their own out in the world, the trio must rely upon 
one another as evil forces threaten to tear them apart. Will they succeed? Will Voldemort finally be stopped? What is the mystery behind the Deathly Hallows?');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Deathly Hallows - Part 2', 'fantasy', 2011, 'David Yates', 'JK Rowling', 'Daniel Radcliffe-Emma Watson-Rupert Grint-Ralph Fiennes-Alan Rickman', 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
'https://www.youtube.com/embed/5NYt1qirBWg', 'Harry (Daniel Radcliffe), Ron, and Hermione continue to find the rest of Voldemorts Horcruxes, until Harry discovers that one 
is at Hogwarts, they flee there as soon as possible, but Voldemort instantly finds out about their mission. The battle is drawn at Hogwarts as many people fight to protect Harry. 
Harry then realizes that people are dying constantly for his mistakes and then eventually fights Voldemort for the last time. Along the way, crucial secrets are unravelled, 
and the mysterious, but legendary, Deathly Hallows reappear.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('The Fast and the Furious', 'action', 2001, 'Rob Cohen', 'Gary Scott Thompson', 'Paul Walker-Vin Diesel-Michelle Rodriguez-Jordana Brewster-Rick Yune', 'https://i.ebayimg.com/images/g/v7AAAOSwstxVCESm/s-l1600.jpg',
'https://www.youtube.com/embed/2TAOizOnNPo', 'Los Angeles street racer Dominic Toretto falls under the suspicion of the LAPD as a string of high-speed electronics truck robberies 
rocks the area. Brian O Connor, an officer of the LAPD, joins the ranks of Torettos highly skilled racing crew undercover to convict Toretto. However, O Connor finds himself both 
enamored with this new world and in love with Torettos sister, Mia. As a rival racing crew gains strength, O Connor must decide where his loyalty really lies.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('2 Fast 2 Furious', 'action', 2003, 'John Singleton', 'Gary Scott Thompson-Michael Brandt-Derek Haas', 'Paul Walker-Tyrese Gibson-Devon Aoki-Chris Bridges-Eva Mendes', 'https://i.etsystatic.com/35330351/r/il/52d287/3938270029/il_570xN.3938270029_scrh.jpg',
'https://www.youtube.com/embed/ZZGkV_xWGw4', 'Now an ex-cop , on the run ,Brian O Connor hooks into outlaw street racing. When the Feds strong arm him back O Connors no rules 
win-or-die skills are unleashed against an international drug Lord . With his velocity-addicted buddy riding shotgun ,and a drop dead- gorgeous undercover agent dialing up the heat, 
2 fast 2 furious accelerates the action into a desperate race for survival, justice ... and a mind - blowing jaw dropping speed!');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('The Fast and the Furious: Tokyo Drift', 'action', 2006, 'Justin Lin', 'Chris Morgan', 'Lucas Black-Sung Kang-Brian Tee-Nathalie Kelley-Nikki Griffin', 'https://i.ebayimg.com/images/g/Cw8AAMXQobdQ7Pmy/s-l1600.jpg',
'https://www.youtube.com/embed/p8HQ2JLlc4E', 'Sean Boswell, an Alabama teenager with a record for street racing, moves to his fathers resident city of Tokyo, 
Japan to avoid a prison sentence in America. Boswell quickly falls in love with the world of drift racing in Tokyos underground and a Japanese girl named Neela. 
However, Boswells presence and growing talent for drifting unsettles the Japanese Mafia, which makes thousands of dollars from the sport. Confrontations arise, 
and Sean is faced with a simple decision: drift or die.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Fast & Furious', 'action', 2009, 'Justin Lin', 'Chris Morgan', 'Vin Diesel-Paul Walker-Michelle Rodriguez-Jordana Brewster-Sung Kang', 'https://static.wikia.nocookie.net/fastandfurious/images/b/bc/Fast_Four_Poster.jpg/revision/latest?cb=20200323093212',
'https://www.youtube.com/embed/k98tBkRsGl4', 'Heading back to the streets where it all began, two men rejoin two women to blast muscle, 
tuner and exotic cars across Los Angeles and floor through the Mexican desert. When a crime brings them back to L.A., 
fugitive ex-con Dom Toretto reignites his feud with agent Brian O Connor. But as they are forced to confront a shared enemy, 
Dom and Brian must give in to an uncertain new trust if they hope to outmaneuver him. And from convoy heists to precision tunnel crawls across international lines, 
two men will find the best way to get revenge: push the limits of what is possible behind the wheel.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Fast Five', 'action', 2011, 'Justin Lin', 'Chris Morgan', 'Elsa Pataky-Paul Walker-Vin Diesel-Dwayne Johnson-Jordana Brewster', 'https://cdn.shopify.com/s/files/1/1416/8662/products/fast_five_original_film_art_1_spo_5000x.jpg?v=1562539730',
'https://www.youtube.com/embed/vcn2GOuZCKI', 'Former agent Brian O Conner and his girlfriend Mia Toretto rescue her brother Dominic Toretto during transportation to prison, 
and they flee to Rio de Janeiro. They rob a car from custody and find that the powerful drug lord Hernan Reyes has US$ 100,000 in a safe located inside the police station, 
protected by corrupt policeman. Dominic invites his skilled crew to steal the dirty money and achieve their freedom, moving to a country without extradition to the USA. 
Meanwhile the tough FBI agent Luke Hobbs comes to Brazil with an elite force to arrest Dominic and Brian.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Fast & Furious 6', 'action', 2013, 'Justin Lin', 'Chris Morgan', 'Paul Walker-Vin Diesel-Dwayne Johnson-Michelle Rodriguez-Jordana Brewster', 'https://i.etsystatic.com/35330351/r/il/a740ae/3957977087/il_fullxfull.3957977087_8qhd.jpg',
'https://www.youtube.com/embed/dKi5XoeTN0k', 'Luke Hobbs, the criminal tracer has been tracking a man named Shaw who is a former military man who headed a mobile tactical unit. 
And when Hobbs finally gets a lead on him, he decides to recruit Dominic Toretto to help him get him. He goes to see Dominic and tells him that his girlfriend, 
Letty whom he thought was dead, is alive and part of Shaws crew. So Dom calls Brian, Roman. Han, Tej and Gisele to help him. 
And they go to where they think Shaw will make his next move in London. When Hobbs makes his move, they learn that Shaw played them and they try to get him but he is too good.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Fast & Furious 7', 'action', 2015, 'James Wan', 'Chris Morgan', 'Paul Walker-Cody Walker-Vin Diesel-Jason Statham-Michelle Rodriguez', 'https://media.s-bol.com/A8r0Mq3n3p1p/NW9x22/843x1200.jpg',
'https://www.youtube.com/embed/yISKeT6sDOg', 'Dominic and his crew thought they had left the criminal mercenary life behind. They had defeated international terrorist Owen Shaw and 
went their separate ways. But now, Shaws brother, Deckard Shaw, is out killing the crew one by one for revenge. Worse, a Somalian terrorist called Jakarde and 
a shady government official called "Mr. Nobody" are both competing to steal a computer terrorism program called "Gods Eye," that can turn any technological device into a weapon. 
Torretto must reconvene with his team to stop Shaw and retrieve the Gods Eye program while caught in a power struggle between the terrorist and the United States government.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('The Fate of the Furious', 'action', 2017, 'Felix Gary Gray', 'Chris Morgan', 'Vin Diesel-Dwayne Johnson-Jason Statham-Michelle Rodriguez-Tyrese Gibson', 'https://m.media-amazon.com/images/M/MV5BMjMxODI2NDM5Nl5BMl5BanBnXkFtZTgwNjgzOTk1MTI@._V1_.jpg',
'https://www.youtube.com/embed/JwMKRevYa_M', 'The family has been doing their normal thing. Everything has been cool with them as it always has. All of a sudden, 
a mysterious decoy lured Dominic Toretto and enthralled him to the state of betrayal. He betrayed his family and set them to face trials they never imagined to face alone without Dom.'); 

INSERT INTO director (directorname, birthyear, movies)
VALUES ('Chad Stahelski', 1968, 'John Wick-John Wick: Chapter 2-John Wick: Chapter 3');

INSERT INTO director (directorname, birthyear, movies)
VALUES ('Chris Columbus', 1958, 'Home Alone-Percy Jackson & the Olympians: The Lightning Thief-Pixels');

INSERT INTO director (directorname, birthyear, movies)
VALUES ('Alfonso Cuarón', 1961, 'Children of Men-Gravity-Roma');

INSERT INTO director (directorname, birthyear, movies)
VALUES ('Mike Newell', 1942, 'Pushing Tin-Prince of Persia: The Sands of Time-Great Expectations');

INSERT INTO director (directorname, birthyear, movies)
VALUES ('David Yates', 1963, 'The Legend of Tarzan- The Fantastic Beasts and Where to Find Them-Fantastic Beasts: The Crimes of Grindelwald');

INSERT INTO director (directorname, birthyear, movies)
VALUES ('Rob Cohen', 1949, 'Dragonheart-Daylight-The Skulls');

INSERT INTO director (directorname, birthyear, movies)
VALUES ('John Singleton', 1968, 'Boyz n the Hood-Higher Learning-Shaft');

INSERT INTO director (directorname, birthyear, movies)
VALUES ('Justin Lin', 1971, 'Annapolis-Fast-Star Trek: Beyond');

INSERT INTO director (directorname, birthyear, movies)
VALUES ('James Wan', 1977, 'Saw-Dead Silence-Aquaman');

INSERT INTO director (directorname, birthyear, movies)
VALUES ('Felix Gary Gray', 1969, 'A Man Apart-Be Cool-Man in Black: International');

INSERT INTO writer (writername, birthyear, movies)
VALUES ('Derek Kolstad', 1974, 'The Package-Nobody-Die Hart');

INSERT INTO writer (writername, birthyear, movies)
VALUES ('JK Rowling', 1965, 'Fantastic Beasts and Where to Find Them-Fantastic Beasts: The Crimes of Grindelwald-Fantastic Beasts: The Secrets of Dumbledore');

INSERT INTO writer (writername, birthyear, movies)
VALUES ('Gary Scott Thompson', 1959, 'Split Second-88 Minutes-Fast');

INSERT INTO writer (writername, birthyear, movies)
VALUES ('Michael Brandt', 1958, 'Wanted-The Double-Overdrive');

INSERT INTO writer (writername, birthyear, movies)
VALUES ('Derek Haas', 1970, 'Catch That Kid-Wanted-The Double');

INSERT INTO writer (writername, birthyear, movies)
VALUES ('Chris Morgan', 1970, 'Wanted-Fast-47 Ronin');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Keanu Reeves', 1964, 'The Matrix-Constantine-47 Ronin', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2022%2F07%2F15%2FKeanu-Reeves-John-Wick-071522-2.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Michael Nycvist', 1960, 'Abduction-Disconnect-Colonia', 'https://www.looper.com/img/gallery/why-viggo-from-john-wick-looks-so-familiar/l-intro-1611754422.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Alfie Allen', 1986, 'Game of Thrones-Pandemic-The Predator', 'https://images6.fanpop.com/image/photos/39500000/Alfie-Allen-as-Iosef-Tarasov-in-John-Wick-2014-alfie-allen-39548466-900-599.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Adrianne Palicki', 1983, 'Legion-Red Dawn-Coffee Town', 'https://m.media-amazon.com/images/M/MV5BYjc2MGNlODItMjdkOC00OWJiLWE1ZTQtODU3MDNjMTkwZDIxXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Bridget Moynahan', 1971, 'Unknown-Prey-Small Time', 'https://static.wikia.nocookie.net/john-wick8561/images/d/d0/Helen_Wick.jpg/revision/latest?cb=20190404152934');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Ruby Rose', 1986, 'The Meg-Vanquish-Taurus', 'https://i.pinimg.com/originals/93/e3/e5/93e3e5073cfc45401cc7be5196caa603.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Laurence Fishburne', 1961, 'Standoff-Imprisoned-The Mule', 'https://static1.srcdn.com/wordpress/wp-content/uploads/2017/02/Laurence-Fishburne-in-John-Wick-2.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Ian McShane', 1942, 'Death Race-Hercules-Jawbone', 'https://images.indianexpress.com/2021/07/ian-mcshane-120.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Riccardo Scamarcio', 1979, 'Burnt-Ali and Nino-Dalida', 'https://m.media-amazon.com/images/M/MV5BNDllYzZlNTAtZDg2Zi00ODU1LWIyM2QtNDFjYTdiMjNjZDBjXkEyXkFqcGdeQXVyNDE5MTU2MDE@._V1_.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Halle Berry', 1966, 'The Kid-Kings-Moonfall', 'https://static1.moviewebimages.com/wordpress/wp-content/uploads/2022/02/Halle-Berry.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Mark Dacascos', 1964, 'Beyond the Game-The Driver-The Ray', 'https://www.slashfilm.com/img/gallery/mark-dacascos-interview-john-wick-chapter-3-parabellum/intro-import.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Donnie Yen', 1963, '14 Blades-Dragon-Star Wars: Rogue One', 'https://assets-prd.ignimgs.com/2023/03/02/johnwickchapter4arealdilemmaclip-ign-blogroll-1677778928064.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Scott Adkins', 1976, 'Abduction-One Shot-Section 8', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F03%2F21%2FScott-Adkins-John-Wick-4-032123.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Bill Skarsgård', 1990, 'Deadpool 2-It-Barbarian', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F03%2F21%2FBill-Skarsgard-John-Wick-4-032123.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Daniel Radcliffe', 1989, 'Jungle-Beast of Burden-Guns Akimbo', 'https://www.looper.com/img/gallery/what-daniel-radcliffe-has-been-doing-since-harry-potter-ended/intro-1569869083.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Rupert Grint', 1988, 'Into the White-Moonwalkers-Knock at the Cabin', 'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/08/Pictures/_f4f594a2-90ed-11ea-b24e-c3981487abe8.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Emma Watson', 1990, 'Noah-The Circle-Little Women', 'https://people.com/thmb/RpnNLplOGndVrTF-rdBlp0biuxE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(719x39:721x41)/Emma-Watson-c59dff78899047bb839b894665b85a13.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Robbie Coltrane', 1950, 'Van Helsing-StormBreaker-Effie Gray', 'https://www.gannett-cdn.com/presto/2022/10/14/USAT/5d6ee4d3-d53b-4399-a987-329590fdd378-XXX_ZX20791_.jpg?width=660&height=435&fit=crop&format=pjpg&auto=webp');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Tom Felton', 1987, 'Ophelia-The Forgotten Battle-Burial', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/11/23/09/malfoy.0.0.jpg?width=1200');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Kenneth Branagh', 1960, 'Valkyrie-Dunkirk-Tenet', 'https://static.wikia.nocookie.net/villains/images/1/14/Gilderoy_Lockhart_HP_CoS_promotional_picture.jpg/revision/latest?cb=20221120180634');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Richard Harris', 1930, 'Trojan Eddie-Gladiator-The Pearl', 'https://img.nieuwsblad.be/kvfOAkNguHxPP7ApYwJ13sGZMMs=/960x640/smart/https%3A%2F%2Fstatic.nieuwsblad.be%2FAssets%2FImages_Upload%2F2022%2F11%2F18%2Fc340907b-f880-44db-9f8e-da8ead15eea4.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Gary Oldman', 1958, 'Child 44-Darkest Hour-Crisis', 'https://www.thedigitalfix.com/wp-content/sites/thedigitalfix/2022/10/gary-oldman-sirius-black.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Michael Gambon', 1940, 'The Book of Eli-Quartet-Cordelia', 'https://images.indianexpress.com/2022/01/MichaelGambon12.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Robert Pattinson', 1986, 'Twilight-Tenet-The Batman', 'https://i.insider.com/6203dfc6019b02001851f0e1?width=700');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Ralph Fiennes', 1962, 'Spectre-No Time to Die-The Menu', 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/03/1516016506-vhp.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Alan Rickman', 1946, 'Die Hard-Galaxy Quest-Eye in the Sky', 'https://i.ndtvimg.com/i/2016-01/snape_640x480_71452776743.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Paul Walker', 1973, 'Fast-Takers-Hours', 'https://static.onecms.io/wp-content/uploads/sites/6/2013/12/paul-walker-fast-and-furious.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Vin Diesel', 1967, 'Fast-The Last Witch Hunter-Bloodshot', 'https://cdn.britannica.com/97/194197-050-5BD88874/Vin-Diesel-The-Fast-and-the-Furious.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Michelle Rodriguez', 1978, 'Fast-Machete Kills-Widows', 'https://www.indiewire.com/wp-content/uploads/2021/05/michelle-rodriguez.png?w=780');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Jordana Brewster', 1980, 'The Faculty-Annapolis-Home Sweet Hell', 'https://media.vanityfair.com/photos/5d177da6734e1f0008f96136/master/w_2560%2Cc_limit/fast-9-jordana-brewster.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Rick Yune', 1971, 'Die Another Day-Ninja Assassin-Olympus Has Fallen', 'https://i.pinimg.com/736x/d2/09/d1/d209d171e319ee2cd27834c9f5823883.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Tyrese Gibson', 1978, 'Baby Boy-Transformers-Morbius', 'https://m.media-amazon.com/images/M/MV5BMTQ5MjcxNjI3MV5BMl5BanBnXkFtZTYwMzQ3NTE3._V1_.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Devon Aoki', 1982, 'Death of a Dinasty-Sin City-War', 'https://m.media-amazon.com/images/M/MV5BMTg0MTAzNDE0MF5BMl5BanBnXkFtZTYwODU3NTE3._V1_.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Chris Bridges', 1977, 'Crash-Ride-John Henry', 'https://film-book.com/wp-content/uploads/2020/11/ludacris-fast-and-furious-01-700x400-1.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Eva Mendes', 1974, 'Hitch-The Other Guys-The Place Beyond the Pines', 'https://www.aceshowbiz.com/images/news/eva-mendes-rumored-to-return-for-furious-8.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Lucas Black', 1982, 'Sling-Friday Night Lights-Blade Legion', 'https://dvdmedia.ign.com/dvd/image/article/734/734756/the-fast-and-the-furious-tokyo-drift-20060922070255505-000.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Sung Kang', 1972, 'Better Luck Tomorrow-Bullet to the Head-Snakehead', 'https://upload.wikimedia.org/wikipedia/en/3/3a/Han_Lue.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Brian Tee', 1977, 'The Wolverine-No Tears for the Dead-The Beautiful Ones', 'https://static.wikia.nocookie.net/fastandfurious/images/8/8a/Brian-Tee.jpg/revision/latest?cb=20150507194336');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Nathalie Kelley', 1985, 'Loaded-Infiltrators-The Baker and the Beauty', 'https://static.wikia.nocookie.net/fastandfurious/images/5/56/Neela_1.jpg/revision/latest?cb=20130617212549');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Nikki Griffin', 1978, 'The Dukes of Hazard-Monster Night-The Forgotten Ones', 'https://static.wikia.nocookie.net/fastandfurious/images/0/09/F3_Cindy_Profile.png/revision/latest?cb=20201009073526');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Elsa Pataky', 1976, 'Tidelands-Interceptor-Poker Face', 'https://media1.popsugar-assets.com/files/thumbor/5a8txKytKdzlAIkAN69FmZ7ur_4/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/04/13/734/n/1922283/eb26e1a3f28a3ff5_MCDSAHA_EC208_H.JPG');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Dwayne Johnson', 1972, 'Jumanju-Jungle Cruise-Black Adam', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2017%2F12%2Fdwayne-2000.jpg&q=60');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Cody Walker', 1988, 'The Mine-USS Indianapolis: Men of Courage', 'https://cf-images.us-east-1.prod.boltdns.net/v1/static/219646971/b044bda7-ed55-4071-af89-8ee5e34188c2/adc66753-2c16-4ef3-8239-c485bfaaeff8/1280x720/match/image.jpg');

INSERT INTO actor (actorname, birthyear, movies, photo)
VALUES ('Jason Statham', 1967, 'The Transporter-The Expendables-Cash Truck', 'https://static.onecms.io/wp-content/uploads/sites/6/2015/04/jason-statham-2000.jpg');
