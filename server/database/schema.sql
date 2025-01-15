CREATE TABLE account (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
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

INSERT INTO account (username, email, password)
VALUES
  ("admin", "admin@gmail.com", "admin"),
  ("user1", "user1@gmail.com", "user1"),
  ("user2", "user2@gmail.com", "user2"),
  ("user3", "user3@gmail.com", "user3"),
  ("user4", "user4@gmail.com", "user4"),
  ("user5", "user5@gmail.com", "user5");

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
  ("HTML", "guideline", "hint", "<img>", "quizz", "Quel est l’élément HTML utilisé pour insérer une image dans une page web ?", "<img>", "<image>", "<picture>", "<media>"),
  ("HTML", "guideline", "hint", "<a>", "quizz", "Quelle est la balise correcte pour créer un lien hypertexte", "<link>", "<href>", "<a>", "<anchor>"),
  ("HTML", "guideline", "hint", "id", "prompt", "Quel attribut est utilisé pour spécifier un identifiant unique à un élément HTML ?", "null", "null", "null", "null"),
  ("HTML", "guideline", "hint", "Fournir une description alternative pour l’image si elle ne peut pas être affichée", "prompt",  "Quelle est la signification de l’attribut alt dans la balise <img> ?", "description", "alternative", "null", "null"),
  ("CSS", "guideline", "hint", "color", "quizz", "Quelle propriété CSS est utilisée pour changer la couleur du texte ?", "background-color", "text-color", "font-color", "color"),
  ("CSS", "guideline", "hint", "z-index", "quizz", "Quelle propriété CSS permet de contrôler l’ordre d’affichage des éléments empilés les uns sur les autres ?", "stack-order", "z-index", "order", "visibility"), 
  ("CSS", "guideline", "hint", "var(--nom-de-la-variable)", "quizz", "Quelle syntaxe est correcte pour utiliser une variable CSS ?", "$nom-de-la-variable", "var(--nom-de-la-variable)", "variable(--nom-de-la-variable)", "%nom-de-la-variable"),
  ("CSS", "guideline", "hint", "fixed", "prompt", "Quelle valeur de la propriété position permet de fixer un élément par rapport à la fenêtre, même lors du défilement de la page ?", "null", "null", "null", "null"),
  ("Javascript", "guideline", "hint", "console.log('hello')", "quizz", "Quelle est la syntaxe correcte pour afficher un message dans la console ?", "print('hello')", "console.log('hello')", "echo('hello')", "console.log(hello)"),
  ("Javascript", "guideline", "hint", "parseInt()", "quizz", "Quelle méthode est utilisée pour transformer une chaîne en nombre entier ?", "TransformToNumber()", "Number()", "String()", "parseInt()"),
  ("Javascript", "guideline", "hint", "stocker donnée", "prompt", "Qu'est-ce qu'une variable en JavaScript ?", "null", "null", "null", "null"),
  ("Javascript", "guideline", "hint", "const let var", "prompt", "Quels mots-clés peuvent être utilisés pour déclarer une variable ?", "null", "null", "null", "null"),
  ("Javascript", "guideline", "hint", "document object model", "prompt", "Que signifie DOM ?", "null", "null", "null", "null"),
  ("Javascript", "guideline", "hint", "undefined", "prompt", "Quel est le type par défaut d'une variable non initialisée ?", "null", "null", "null", "null");

INSERT INTO progress (level, user_id, room_id, challenge_id)
VALUES
  (1, 1, 1, 1),
  (1, 2, 1, 1),
  (1, 3, 1, 1),
  (1, 4, 1, 1),
  (1, 5, 1, 1);