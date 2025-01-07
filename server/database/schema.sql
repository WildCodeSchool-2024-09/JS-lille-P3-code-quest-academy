CREATE TABLE account (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE room (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  boss_name VARCHAR(50) NOT NULL,
  img_url TEXT NOT NULL
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

CREATE TABLE progress (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT,
  challenge_id INT,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES account(id) ON DELETE CASCADE,
  CONSTRAINT fk_challenge FOREIGN KEY (challenge_id) REFERENCES challenge(id)
);

INSERT INTO account (username, email, password)
VALUES
  ("user1", "user1@example.com", "password1"),
  ("user2", "user2@example.com", "password2"),
  ("user3", "user3@example.com", "password3"),
  ("user4", "user4@example.com", "password4"),
  ("user5", "user5@example.com", "password5"),
  ("user6", "user6@example.com", "password6"),
  ("user7", "user7@example.com", "password7"),
  ("user8", "user8@example.com", "password8"),
  ("user9", "user9@example.com", "password9"),
  ("user10", "user10@example.com", "password1"),
  ("user12", "user13@example.com", "password12"),
  ("user13", "user14@example.com", "password13"),
  ("user14", "user15@example.com", "password14"),
  ("user15", "user16@example.com", "password15");

INSERT INTO room (id, boss_name, img_url)
VALUES
  (1, "Le seigneur des balises", "https://www.exemple.com"),
  (2, "Gridzilla", "https://www.exemple.com"),
  (3, "DOM-inator", "https://www.exemple.com"),
  (4, "Componentus Rex", "https://www.exemple.com"),
  (5, "JSONator", "https://www.exemple.com"),
  (6, "Soufiane", "https://www.exemple.com");

INSERT INTO challenge (id, title, guideline, hint, soluce, room_id)
VALUES
  (1, "HTML", "Tu dois récupérer les bonnes balises", "Une balise est composée comme ceci : <main/>", "<main/>", 1),
  (2, "CSS", "Change la couleur du fond d'écran en rouge", "TU dois modifier la propriété background-color", "background-color: red;", 2),
  (3, "Javascript", "Initialise une variable dont la valeur restera inchangée", "Utilise const", "const test = 2;", 3),
  (4, "React", "Tu dois créer un composant", "Un composant ressemble à une balise", "< Composant/>", 4),
  (5, "Node.js", "Tu dois créer un serveur", "Un serveur est composé de plusieurs fichiers", "server.js", 5),
  (6, "SQL", "Tu dois créer une base de données", "Une base de données est composée d'entités et relations", "database", 6);

INSERT INTO progress (user_id, challenge_id)
VALUES
  (1, 1),
  (2, 1);
