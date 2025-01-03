CREATE TABLE account (
  user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE progress (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT,
  challenge_id INT,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES account(user_id),
  CONSTRAINT fk_challenge FOREIGN KEY (challenge_id) REFERENCES challenge(id)
);

CREATE TABLE challenge (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(50) NOT NULL,
  guideline TEXT NOT NULL,
  hint TEXT NOT NULL,
  soluce TEXT NOT NULL,
  room_id INT,
  CONSTRAINT fk_room FOREIGN KEY (room_id) REFERENCES room(id)
);

CREATE TABLE room (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  boss_name VARCHAR(50) NOT NULL,
  img_url TEXT NOT NULL
);

INSERT INTO account (username, email, password)
VALUES
  ("admin", "admin@gmail.com", "admin");

INSERT INTO progress (user_id, challenge_id)
VALUES
  (1, 1);

INSERT INTO challenge (id, title, guideline, hint, soluce, room_id)
VALUES
  (1, "HTML", "Tu dois récupérer les bonnes balises", "Une balise est composée comme ceci : <main/>", "<main/>", 1),
  (2, "CSS", "Change la couleur du fond d'écran en rouge", "TU dois modifier la propriété background-color", "background-color: red;", 2),
  (3, "Javascript", "Initialise une variable dont la valeur restera inchangée", "Utilise const", "const test = 2;", 3),
  (4, "React", "Tu dois créer un composant", "Un composant ressemble à une balise", "< Composant/>", 4),
  (5, "Node.js", "Tu dois créer un serveur", "Un serveur est composé de plusieurs fichiers", "server.js", 5),
  (6, "SQL", "Tu dois créer une base de données", "Une base de données est composée d'entités et relations", "database", 6);

INSERT INTO room (id, boss_name, img_url)
VALUES
  (1, "Le seigneur des balises", "https://www.exemple.com"),
  (2, "Gridzilla", "https://www.exemple.com"),
  (3, "DOM-inator", "https://www.exemple.com"),
  (4, "Componentus Rex", "https://www.exemple.com"),
  (5, "JSONator", "https://www.exemple.com"),
  (6, "Soufiane Maski", "https://www.exemple.com");
