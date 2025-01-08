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
  ("admin", "admin@gmail.com", "admin"),
  ("user1", "user1@gmail.com", "user1"),
  ("user2", "user2@gmail.com", "user2"),
  ("user3", "user3@gmail.com", "user3"),
  ("user4", "user4@gmail.com", "user4"),
  ("user5", "user5@gmail.com", "user5");

INSERT INTO room (id, boss_name, img_url)
VALUES
  (1, "Le seigneur des balises", "https://www.exemple.com"),
  (2, "Gridzilla", "https://www.exemple.com"),
  (3, "DOM-inator", "https://www.exemple.com"),
  (4, "Componentus Rex", "https://www.exemple.com"),
  (5, "JSONator", "https://www.exemple.com"),
  (6, "Soufiane", "https://www.exemple.com");


INSERT INTO challenge (id, title, guideline, hint, soluce, type, room_id)
VALUES
  (1, "HTML", "question 1", "reponse 1", "quizz", 1),
  (2, "HTML", "question 2", "reponse 2", "quizz", 1),
  (3, "HTML", "question 3", "reponse 3", "quizz", 1),
  (4, "CSS", "question 1", "reponse 1", "quizz", 2),
  (5, "CSS", "question 2", "reponse 2", "quizz", 2),
  (6, "CSS", "question 3", "reponse 3", "quizz", 2),
  (7, "Javascript", "question 1", "reponse 1", "quizz", 3),
  (8, "Javascript", "question 2", "reponse 2", "quizz", 3),
  (9, "Javascript", "question 3", "reponse 3", "quizz", 3),
  (10, "React", "question 1", "reponse 1","quizz", 4),
  (11, "React", "question 2", "reponse 2","quizz", 4),
  (12, "React", "question 3", "reponse 3","quizz", 4),
  (13, "Node.js", "question 1", "reponse 1","quizz", 5),
  (14, "Node.js", "question 2", "reponse 2","quizz", 5),
  (15, "Node.js", "question 3", "reponse 3","quizz", 5),
  (16, "SQL", "question 1", "reponse 1","quizz", 6),
  (17, "SQL", "question 2", "reponse 2","quizz", 6),
  (18, "SQL", "question 3", "reponse 3","quizz", 6);

INSERT INTO progress (user_id, challenge_id)
VALUES
  (1, 1);
