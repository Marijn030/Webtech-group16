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

/*The information comes from wikipedia and the plot comes from imdb.*/

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
VALUES ('John Wick: Chapter 4', 'action-thriller', 2023, 'Chad Stahelski', 'Derek Kolstad', 'Keanu Reeves-Donnie Yen-Scott Adkins-Ian Mcshane-Bill Skarsgård', 'https://assets-prd.ignimgs.com/2023/02/08/jw4-2025x3000-online-character-1sht-keanu-v187-1675886090936.jpg',
'https://www.youtube.com/embed/qEVUtrk8_B4', 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy 
with powerful alliances across the globe and forces that turn old friends into foes.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Philosopher's Stone', 'fantasy', 2001, 'Chris Columbus', 'JK Rowling', 'Daniel Radcliffe-Rupert Grint-Emma Watson-Robbie Coltrane-Tom Felton', 'https://fffmovieposters.com/wp-content/uploads/73931.jpg',
'https://www.youtube.com/embed/VyHV0BRtdxo', 'On his eleventh birthday, Harry Potter discovers that he is no ordinary boy. Hagrid, a beetle-eyed giant, 
tells Harry that he is a wizard and has a place at Hogwarts School of Witchcraft and Wizardry. In his first year of magical education, Harry tackles a fully grown mountain troll, 
learns to play Quidditch, and participates in a thrilling "live" game of chess.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Chamber of Secrets', 'fantasy', 2002, 'Chris Columbus', 'JK Rowling', 'Daniel Radcliffe-Rupert Grint-Emma Watson-Kenneth Branagh-Richard Harris', 'https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_.jpg',
'https://www.youtube.com/embed/jBltxS8HfQ4', 'It's year two at Hogwarts, and Harry, Ron, and Hermione are back learning, 
but their year doesn't go passed quietly. Members of the school are turning up petrified and bloody writings are appearing on the walls, revealing to everyone, 
that someone has opened the Chamber of Secrets. The attacks continue, bringing the possibility of the closure of Hogwarts. Harry and his friends are now forced 
to secretly uncover the truth about the chamber before the school closes or any lives are taken.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Prisoner of Azkaban', 'fantasy', 2004, 'Alfonso Cuarón', 'JK Rowling', 'Daniel Radcliffe-Emma Watson-Rupert Grint-Gary Oldman-Michael Gambon', 'https://cdn.shopify.com/s/files/1/0037/8008/3782/products/harry-potter-and-the-prisoner-of-azkaban_DS-OS-Style-A-399685_35a1b3f2-5fd6-47bb-a866-77c19b1ddbf5_1024x1024@2x.jpg?v=1637162000',
'https://www.youtube.com/embed/lAxgztbYDbs', 'In the summer before his third year at Hogwarts, Harry Potter becomes fed up with his horrible aunt and uncle, 
and after accidentally inflating his visiting Aunt Marge, he runs away. Unfortunately, there's much more danger in the wizarding world than Harry thought. 
Convicted murderer Sirius Black has escaped from the wizarding prison Azkaban. Black is known as Lord Voldemort's most devoted follower, 
and he's after Harry to avenge Voldemort and finish the job. But not everything is what it seems, and inside of Hogwarts there may just be a traitor.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Goblet of Fire', 'fantasy', 2005, 'Mike Newell', 'JK Rowling', 'Daniel Radcliffe-Emma Watson-Rupert Grint-Robert Pattinson-Ralp Fiennes', 'https://static.wikia.nocookie.net/qghficsimjkaeibhfztnpjrqiezhzuadzsjxwpnxusefbthfes/images/4/4a/35FFD453-DFDD-4C2C-93C2-FDE66CCB14D6.webp/revision/latest?cb=20210812224339',
'https://www.youtube.com/embed/3EGojp4Hh6I', 'Harry Potter returns to Hogwarts for his fourth year, where the Triwizard Tournament is soon due to begin. 
Students must be over seventeen to enter, with the winner receiving eternal glory. Harry can't enter it this year, or can he. When his name is read out from the Goblet of Fire, 
everyone assumes that Harry has cheated. Harry insists that he never placed his name in there, with someone else behind it. But who? Harry must now survive through dragons, 
sea creatures and a terrifying maze, all before coming face-to-face with a particular dark wizard.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Order of the Phoenix', 'fantasy', 2007, 'David Yates', 'JK Rowling', 'Daniel Radcliffe-Emma Watson-Rupert Grint-Robbie Coltrane-Ralph Fiennes', 'https://m.media-amazon.com/images/M/MV5BOTA3MmRmZDgtOWU1Ny00ZDc5LWFkN2YtNzNlY2UxZmY0N2IyXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg',
'https://www.youtube.com/embed/y6ZW7KXaXYk', 'After a disastrous summer with the Dursleys, including an encounter with the Dementors, Harry (Daniel Radcliffe) is shunned by 
friends upon returning to Hogwarts, after the return of Lord Voldemort (Ralph Fiennes) and no one believes him. He starts his fifth year while new Defense Against the 
Dark Arts teacher, Professor Dolores Jane Umbridge (Imelda Staunton) refuses to teach them defensive spells while refuting Harry's claims of the Dark Lord's return. 
So Harry sets out, with Ron (Rupert Grint) and Hermione (Emma Watson), to start up "Dumbledore's Army" to battle evil forces and prepare the fellow young witches and 
wizards for the extraordinary journey that lies ahead.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Half-Blood Prince', 'fantasy', 2009, 'David Yates', 'JK Rowling', 'Daniel Radcliffe-Emma Watson-Rupert Grint-Alan Rickman-Tom Felton', 'https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_.jpg',
'https://www.youtube.com/embed/tAiy66Xrsz4', 'After a disastrous summer with the Dursleys, including an encounter with the Dementors, Harry is shunned by friends upon returning to 
Hogwarts, after the return of Lord Voldemort (Ralph Fiennes) and no one believes him. He starts his fifth year while new Defense Against the Dark Arts teacher, 
Professor Dolores Jane Umbridge refuses to teach them defensive spells while refuting Harry's claims of the Dark Lord's return. So Harry sets out, with Ron and Hermione, 
to start up "Dumbledore's Army" to battle evil forces and prepare the fellow young witches and wizards for the extraordinary journey that lies ahead.'0);

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Deathly Hallows - Part 1', 'fantasy', 2010, 'David Yates', 'JK Rowling', 'Daniel Radcliffe-Emma Watson-Rupert Grint-Tom Felton-Ralp Fiennes', 'https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_.jpg',
'https://www.youtube.com/embed/qJRvBtqOOz8', 'While villainous Lord Voldemort begins taking over the Ministry of Magic, Harry, Ron and Hermione must race against time to 
finish Dumbledore's quest to find and destroy Voldemort's Horcruxes in order to stop the Dark Lord once and for all. On their own out in the world, the trio must rely upon 
one another as evil forces threaten to tear them apart. Will they succeed? Will Voldemort finally be stopped? What is the mystery behind the Deathly Hallows?');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Harry Potter and the Deathly Hallows - Part 2', 'fantasy', 2011, 'David Yates', 'JK Rowling', 'Daniel Radcliffe-Emma Watson-Rupert Grint-Ralph Fiennes-Alan Rickman', 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
'https://www.youtube.com/embed/5NYt1qirBWg', 'Harry (Daniel Radcliffe), Ron, and Hermione continue to find the rest of Voldemort's Horcruxes, until Harry discovers that one 
is at Hogwarts, they flee there as soon as possible, but Voldemort instantly finds out about their mission. The battle is drawn at Hogwarts as many people fight to protect Harry. 
Harry then realizes that people are dying constantly for his mistakes and then eventually fights Voldemort for the last time. Along the way, crucial secrets are unravelled, 
and the mysterious, but legendary, Deathly Hallows reappear.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('The Fast and the Furious', 'action', 2001, 'Rob Cohen', 'Gary Scott Thompson', 'Paul Walker-Vin Diesel-Michelle Rodriguez-Jordana Brewster-Rick Yune', 'https://i.ebayimg.com/images/g/v7AAAOSwstxVCESm/s-l1600.jpg',
'https://www.youtube.com/embed/2TAOizOnNPo', 'Los Angeles street racer Dominic Toretto falls under the suspicion of the LAPD as a string of high-speed electronics truck robberies 
rocks the area. Brian O'Connor, an officer of the LAPD, joins the ranks of Toretto's highly skilled racing crew undercover to convict Toretto. However, O'Connor finds himself both 
enamored with this new world and in love with Toretto's sister, Mia. As a rival racing crew gains strength, O'Connor must decide where his loyalty really lies.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('2 Fast 2 Furious', 'action', 2003, 'John Singleton', 'Gary Scott Thompson-Michael Brandt-Derek Haas', 'Paul Walker-Tyrese Gibson -Devon Aoki-Chris Bridges-Eva Mendes', 'https://i.etsystatic.com/35330351/r/il/52d287/3938270029/il_570xN.3938270029_scrh.jpg',
'https://www.youtube.com/embed/ZZGkV_xWGw4', 'Now an ex-cop , on the run ,Brian O'Connor hooks into outlaw street racing. When the Fed's strong arm him back O'Connor's no rules 
win-or-die skills are unleashed against an international drug Lord . With his velocity-addicted buddy riding shotgun ,and a drop dead- gorgeous undercover agent dialing up the heat, 
2 fast 2 furious accelerates the action into a desperate race for survival, justice ... and a mind - blowing jaw dropping speed!');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('The Fast and the Furious: Tokyo Drift', 'action', 2006, 'Justin Lin', 'Chris Morgan', 'Lucas Black-Sung Kang-Brian Tee-Nathalie Kelley-Nikki Griffin', 'https://i.ebayimg.com/images/g/Cw8AAMXQobdQ7Pmy/s-l1600.jpg',
'https://www.youtube.com/embed/p8HQ2JLlc4E', 'Sean Boswell, an Alabama teenager with a record for street racing, moves to his father's resident city of Tokyo, 
Japan to avoid a prison sentence in America. Boswell quickly falls in love with the world of drift racing in Tokyo's underground and a Japanese girl named Neela. 
However, Boswell's presence and growing talent for drifting unsettles the Japanese Mafia, which makes thousands of dollars from the sport. Confrontations arise, 
and Sean is faced with a simple decision: drift or die.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Fast & Furious', 'action', 2009, 'Justin Lin', 'Chris Morgan', 'Vin Diesel-Paul Walker-Michelle Rodriguez-Jordana Brewster-Sung Kang', 'https://static.wikia.nocookie.net/fastandfurious/images/b/bc/Fast_Four_Poster.jpg/revision/latest?cb=20200323093212',
'https://www.youtube.com/embed/k98tBkRsGl4', 'Heading back to the streets where it all began, two men rejoin two women to blast muscle, 
tuner and exotic cars across Los Angeles and floor through the Mexican desert. When a crime brings them back to L.A., 
fugitive ex-con Dom Toretto reignites his feud with agent Brian O'Connor. But as they are forced to confront a shared enemy, 
Dom and Brian must give in to an uncertain new trust if they hope to outmaneuver him. And from convoy heists to precision tunnel crawls across international lines, 
two men will find the best way to get revenge: push the limits of what's possible behind the wheel.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Fast Five', 'action', 2011, 'Justin Lin', 'Chris Morgan', 'Elsa Pataky-Paul Walker-Vin Diesel-Dwayne Johnson-Jordana Brewster', 'https://cdn.shopify.com/s/files/1/1416/8662/products/fast_five_original_film_art_1_spo_5000x.jpg?v=1562539730',
'https://www.youtube.com/embed/vcn2GOuZCKI', 'Former agent Brian O'Conner and his girlfriend Mia Toretto rescue her brother Dominic Toretto during transportation to prison, 
and they flee to Rio de Janeiro. They rob a car from custody and find that the powerful drug lord Hernan Reyes has US$ 100,000 in a safe located inside the police station, 
protected by corrupt policeman. Dominic invites his skilled crew to steal the dirty money and achieve their freedom, moving to a country without extradition to the USA. 
Meanwhile the tough FBI agent Luke Hobbs comes to Brazil with an elite force to arrest Dominic and Brian.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Fast & Furious 6', 'action', 2013, 'Justin Lin', 'Chris Morgan', 'Paul Walker-Vin Diesel-Dwayne Johnson-Michelle Rodriguez-Jordana Brewster', 'https://i.etsystatic.com/35330351/r/il/a740ae/3957977087/il_fullxfull.3957977087_8qhd.jpg',
'https://www.youtube.com/embed/dKi5XoeTN0k', 'Luke Hobbs, the criminal tracer has been tracking a man named Shaw who's a former military man who headed a mobile tactical unit. 
And when Hobbs finally gets a lead on him, he decides to recruit Dominic Toretto to help him get him. He goes to see Dominic and tells him that his girlfriend, 
Letty whom he thought was dead, is alive and part of Shaw's crew. So Dom calls Brian, Roman. Han, Tej and Gisele to help him. 
And they go to where they think Shaw will make his next move in London. When Hobbs makes his move, they learn that Shaw played them and they try to get him but he's too good.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('Fast & Furious 7', 'action', 2015, 'James Wan', 'Chris Morgan', 'Paul Walker-Cody Walker-Vin Diesel-Jason Statham-Michelle Rodriguez', 'https://media.s-bol.com/A8r0Mq3n3p1p/NW9x22/843x1200.jpg',
'https://www.youtube.com/embed/yISKeT6sDOg', 'Dominic and his crew thought they'd left the criminal mercenary life behind. They'd defeated international terrorist Owen Shaw and 
went their separate ways. But now, Shaw's brother, Deckard Shaw, is out killing the crew one by one for revenge. Worse, a Somalian terrorist called Jakarde and 
a shady government official called "Mr. Nobody" are both competing to steal a computer terrorism program called "God's Eye," that can turn any technological device into a weapon. 
Torretto must reconvene with his team to stop Shaw and retrieve the God's Eye program while caught in a power struggle between the terrorist and the United States government.');

INSERT INTO movie (title, genre, year, director, writer, actor, poster, trailer, plot)
VALUES ('The Fate of the Furious', 'action', 2017, 'Felix Gary Gray', 'Chris Morgan', 'Vin Diesel-Dwayne Johnson-Jason Statham-Michelle Rodriguez-Tyrese Gibson', 'https://m.media-amazon.com/images/M/MV5BMjMxODI2NDM5Nl5BMl5BanBnXkFtZTgwNjgzOTk1MTI@._V1_.jpg',
'https://www.youtube.com/embed/JwMKRevYa_M', 'The family has been doing their normal thing. Everything has been cool with them as it always has. All of a sudden, 
a mysterious decoy lured Dominic Toretto and enthralled him to the state of betrayal. He betrayed his family and set them to face trials they never imagined to face alone without Dom.'); 

INSERT INTO director (name, birthyear, movies)
VALUES ('Chad Stahelski', 1968, 'John Wick-John Wick: Chapter 2-John Wick: Chapter 3');

INSERT INTO director (name, birthyear, movies)
VALUES ('Chris Columbus', 1958, 'Home Alone-Percy Jackson & the Olympians: The Lightning Thief-Pixels');

INSERT INTO director (name, birthyear, movies)
VALUES ('Alfonso Cuarón', 1961, 'Children of Men-Gravity-Roma');

INSERT INTO director (name, birthyear, movies)
VALUES ('Mike Newell', 1942, 'Pushing Tin-Prince of Persia: The Sands of Time-Great Expectations');

INSERT INTO director (name, birthyear, movies)
VALUES ('David Yates', 1963, 'The Legend of Tarzan- The Fantastic Beasts and Where to Find Them-Fantastic Beasts: The Crimes of Grindelwald');

INSERT INTO director (name, birthyear, movies)
VALUES ('Rob Cohen', 1949, 'Dragonheart-Daylight-The Skulls');

INSERT INTO director (name, birthyear, movies)
VALUES ('John Singleton', 1968, 'Boyz n the Hood-Higher Learning-Shaft');

INSERT INTO director (name, birthyear, movies)
VALUES ('Justin Lin', 1971, 'Annapolis-Fast-Star Trek: Beyond');

INSERT INTO director (name, birthyear, movies)
VALUES ('James Wan', 1977, 'Saw-Dead Silence-Aquaman');

INSERT INTO director (name, birthyear, movies)
VALUES ('Felix Gary Gray', 1969, 'A Man Apart-Be Cool-Man in Black: International');

INSERT INTO writer (name, birthyear, movies)
VALUES ('Derek Kolstad', 1974, 'The Package-Nobody-Die Hart');

INSERT INTO writer (name, birthyear, movies)
VALUES ('JK Rowling', 1965, 'Fantastic Beasts and Where to Find Them-Fantastic Beasts: The Crimes of Grindelwald-Fantastic Beasts: The Secrets of Dumbledore');

INSERT INTO writer (name, birthyear, movies)
VALUES ('Gary Scott Thompson', 1959, 'Split Second-88 Minutes-Fast');

INSERT INTO writer (name, birthyear, movies)
VALUES ('Michael Brandt', 1958, 'Wanted-The Double-Overdrive');

INSERT INTO writer (name, birthyear, movies)
VALUES ('Derek Haas', 1970, 'Catch That Kid-Wanted-The Double');

INSERT INTO writer (name, birthyear, movies)
VALUES ('Chris Morgan', 1970, 'Wanted-Fast-47 Ronin');

INSERT INTO writer (name, birthyear, movies)
VALUES ('Chris Morgan', 1970, 'Wanted-Fast-47 Ronin');
