create table account (
  user_id int primary key auto_increment not null,
  username varchar(50) not null unique,
  email varchar(100) not_null unique,
  password varchar(100) not null unique
);

create table progress (
  id int primary key auto_increment not null,
  user_id int,
  challenge_id int
);

create table challenge (
  id int primary key auto_increment not null,
  title varchar(50) not null,
  guideline text not null,
  hint text not null,
  soluce text not null,
  room_id int
);

create table room (
  id int primary key auto_increment not null,
  boss_name varchar(50) not null,
  img_url text not null
);

insert into account(user_id, username, email, password)
values
  (1, "admin", "admin@gmail.com", "admin");

insert into progress(id, user_id, challenge_id)
values
  (1, 1, 1);

insert into challenge (id, title, guideline, hint, soluce, room_id)
values (1, "HTML", "Tu dois récupérer les bonnes balises", "Une balise est composée comme ceci : <main/>", "<main/>", 1),
  (2, "CSS", "Change la couleur du fond d'écran en rouge", "TU dois modifier la propriété background-color", "background-color: red;", 2),
  (3, "Javascript", "Initialise une variable dont la valeur restera inchangée", "Utilise const", "const test = 2;", 3),
  (4, "React", "Tu dois créer un composant", "Un composant ressemble à une balise", "< Composant/>", 4),
  (5, "Node.js", "Tu dois créer un serveur", "Un serveur est composé de plusieurs fichiers", "server.js", 5),
  (6, "SQL", "Tu dois créer une base de données", "Une base de données est composée d'entités et relations'", "database", 6);

insert into room (id, boss_name, img_url)
values (1, "Le seigneur des balises", "https://www.exemple.com"),
  (2, "Gridzilla", "https://www.exemple.com"),
  (3, "DOM-inator", "https://www.exemple.com"),
  (4, "Componentus Rex", "https://www.exemple.com"),
  (5, "JSONator", "https://www.exemple.com"),
  (6, "Soufiane Maski", "https://www.exemple.com");
