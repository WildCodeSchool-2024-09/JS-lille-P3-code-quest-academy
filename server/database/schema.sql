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
  type TEXT NOT NULL,
  question TEXT NOT NULL,
  rep1 VARCHAR(100),
  rep2 VARCHAR(100),
  rep3 VARCHAR(100),
  rep4 VARCHAR(100)
);

CREATE TABLE progress (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  level INT NOT NULL,
  user_id INT,
  room_id INT,
  challenge_id INT,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES account(id),
  CONSTRAINT fk_room FOREIGN KEY (room_id) REFERENCES room(id),
  CONSTRAINT fk_challenge FOREIGN KEY (challenge_id) REFERENCES challenge(id)
);

INSERT INTO account (username, email, password)
VALUES
  ("admin", "admin@gmail.com", "admin"),
  ("user1", "user1@gmail.com", "user1"),
  ("user2", "user2@gmail.com", "user2"),
  ("user3", "user3@gmail.com", "user3"),
  ("user4", "user4@gmail.com", "user4"),
  ("user5", "user5@gmail.com", "user5");
  

INSERT INTO room (boss_name, img_url)
VALUES
  ("Le seigneur des balises", "https://www.exemple.com"),
  ("Gridzilla", "https://www.exemple.com"),
  ("DOM-inator", "https://www.exemple.com"),
  ("Captain Hook", "https://www.exemple.com"),
  ("Nodeferatus", "https://www.exemple.com"),
  ("Soufiane Maski", "https://www.exemple.com");

INSERT INTO challenge (id, title, guideline, hint, soluce, type, question, rep1, rep2, rep3, rep4)
VALUES
  (1, "Welcome", "Bienvenue sur Code Quest Academy ! Un mystérieux bug a infecté le campus, empếchant les élèves de continuer leurs apprentissage. Peut-tu nous aider ? Clique sur le bouton suivant si tu es prêt !", "null", "null", "transition", "null", "null", "null", "null", "null"),
  (2, "RoomSelection", "La premier niveau a été débloqué, clique dessus pour commencer", "null", "null", "transition", "null", "null", "null", "null", "null"),
  (3, "HTML", "Nous sommes dans la première salle, c'est ici que nous allons apprendre les bases du HTML et résoudre le bug", "null", "null", "transition", "null", "null", "null", "null", "null"),
  (4, "HTML", "Tu vas devoir résoudre les énigmes et mini-jeux dans la partie inférieure gauche de la page pour débloquer la suite", "astuce 1", "Blanc", "quizz", "Quelle est la couleur du cheval blanc d'Henri IV ?", "Noir", "Blanc", "C'est quoi un cheval ?", "La réponse D"),
  (5, "HTML", "Tu vas devoir résoudre les énigmes et mini-jeux dans la partie inférieure gauche de la page pour débloquer la suite", "astuce 2", "markup", "prompt", "HTML signifie Hyper Text Langage ...", "null", "null", "null", "null"),
  (6, "HTML", "Tu vas devoir résoudre les énigmes et mini-jeux dans la partie inférieure gauche de la page pour débloquer la suite", "astuce 3", "ta gueule", "prompt", "Y va faire tout noir !", "null", "null", "null", "null"),
  (7, "Boss", "Bravo ! Tu as surmonté toute les épreuves HTML et acquis la compétence 'Lancer de div'. Attends... Mais qu'est ce que c'est que ce truc ??!", "astuce 3", "null", "prompt", "null", "null", "null", "null", "null"),
  (8, "CSS", "guideline 1", "astuce 1", "reponse 1", "quizz", "question 1", "A", "B", "C", "D"),
  (9, "CSS", "guideline 2", "astuce 2", "reponse 2", "prompt", "question 2", "null", "null", "null", "null"),
  (10, "CSS", "guideline 3", "astuce 3", "reponse 3", "prompt", "question 3", "null", "null", "null", "null"),
  (11, "Javascript", "guideline 1", "astuce 1", "reponse 1", "quizz", "question 1", "A", "B", "C", "D"),
  (12, "Javascript", "guideline 2", "astuce 2", "reponse 2", "prompt", "question 2", "null", "null", "null", "null"),
  (13, "Javascript", "guideline 3", "astuce 3", "reponse 3", "prompt", "question 3", "null", "null", "null", "null"),
  (14,"React", "guideline 1", "astuce 1", "reponse 1","quizz", "question 1", "A", "B", "C", "D"),
  (15, "React", "guideline 2", "astuce 2", "reponse 2","prompt", "question 2", "null", "null", "null", "null"),
  (16, "React", "guideline 3", "astuce 3", "reponse 3","prompt", "question 3", "null", "null", "null", "null"),
  (17, "Node.js", "guideline 1", "astuce 1", "reponse 1","quizz", "question 1", "A", "B", "C", "D"),
  (18, "Node.js", "guideline 2", "astuce 2", "reponse 2","prompt", "question 2", "null", "null", "null", "null"),
  (19, "Node.js", "guideline 3", "astuce 3", "reponse 3","prompt", "question 3", "null", "null", "null", "null"),
  (20, "SQL", "guideline 1", "astuce 1", "reponse 1","quizz", "question 1", "A", "B", "C", "D"),
  (21, "SQL", "guideline 2", "astuce 2", "reponse 2","prompt", "question 2", "null", "null", "null", "null"),
  (22, "SQL", "guideline 3", "astuce 3", "reponse 3","prompt", "question 3", "null", "null", "null", "null");

INSERT INTO progress (level, user_id, room_id, challenge_id)
VALUES
  (1, 1, 1, 1),
  (1, 2, 1, 1),
  (1, 3, 1, 1),
  (1, 4, 1, 1),
  (1, 5, 1, 1);