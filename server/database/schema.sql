CREATE TABLE account (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  teacher_1 VARCHAR(50) DEFAULT "Fantine",
  teacher_2 VARCHAR(50) DEFAULT "Soufiane"
);

CREATE TABLE room (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  boss_name VARCHAR(50) NOT NULL,
  img_src TEXT NOT NULL,
  gif_src TEXT NOT NULL
);

CREATE TABLE challenge (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(50) NOT NULL,
  guideline TEXT NOT NULL,
  hint TEXT NOT NULL,
  soluce VARCHAR(255) NOT NULL,
  type VARCHAR(10) NOT NULL,
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
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES account(id) ON DELETE CASCADE,
  CONSTRAINT fk_room FOREIGN KEY (room_id) REFERENCES room(id),
  CONSTRAINT fk_challenge FOREIGN KEY (challenge_id) REFERENCES challenge(id)
);

INSERT INTO account (username, email, password, isAdmin)
VALUES
  ("admin", "admin@gmail.com", "admin", 1),
  ("user1", "user1@gmail.com", "user1", 0);

INSERT INTO room (boss_name, img_src, gif_src)
VALUES
  ("Le seigneur des balises", "../../src/assets/images/boss/boss-html.png", "../../src/assets/images/boss/boss-html.gif"),
  ("Gridzilla", "../../src/assets/images/boss/boss-css.png", "../../src/assets/images/boss/boss-css.gif"),
  ("DOM-inator", "../../src/assets/images/boss/boss-js.png", "../../src/assets/images/boss/boss-js.gif"),
  ("Captain Hook", "../../src/assets/images/boss/boss-react.png", "../../src/assets/images/boss/boss-react.gif"),
  ("Nodeferatus", "../../src/assets/images/boss/boss-node.png", "../../src/assets/images/boss/boss-node.gif"),
  ("Soufiane Maski", "../../src/assets/images/boss/boss-sql.png", "../../src/assets/images/boss/boss-sql.gif");

INSERT INTO challenge (title, guideline, hint, soluce, type, question, rep1, rep2, rep3, rep4)
VALUES
  ("HTML", "guideline", "C'est un raccourci pour 'image' en anglais.", "<img>", "quizz", "Quel est l’élément HTML utilisé pour insérer une image dans une page web ?", "<img>", "<image>", "<picture>", "<media>"),
  ("HTML", "guideline", "Cette balise est comme une porte vers une autre page. Elle utilise une lettre simple, souvent associée à 'adresse' ou 'ancre' en anglais.", "<a>", "quizz", "Quelle est la balise correcte pour créer un lien hypertexte", "<link>", "<href>", "<a>", "<anchor>"),
  ("CSS", "guideline", "Cette propriété est aussi simple que son nom. Elle correspond au mot anglais pour 'couleur'.", "color", "quizz", "Quelle propriété CSS est utilisée pour changer la couleur du texte ?", "background-color", "text-color", "font-color", "color");

INSERT INTO progress (level, user_id, room_id, challenge_id)
VALUES
  (1, 1, 1, 1),
  (1, 1, 2, 1);
