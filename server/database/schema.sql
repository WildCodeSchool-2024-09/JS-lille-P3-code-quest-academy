CREATE TABLE account (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  firstTeacher VARCHAR(50) DEFAULT 'Fantine',
  secondTeacher VARCHAR(50) DEFAULT 'Soufiane'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE room (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  boss_name VARCHAR(50) NOT NULL,
  img_src TEXT NOT NULL,
  gif_src TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  rep4 VARCHAR(100),
  room_id INT,
  CONSTRAINT fk_room_challenge FOREIGN KEY (room_id) REFERENCES room(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE progress (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT,
  room_id INT,
  challenge_id INT,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES account(id) ON DELETE CASCADE,
  CONSTRAINT fk_room_progress FOREIGN KEY (room_id) REFERENCES room(id),
  CONSTRAINT fk_challenge FOREIGN KEY (challenge_id) REFERENCES challenge(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO account (username, email, hashed_password, is_admin)
VALUES
  ('admin', 'admin@gmail.com', 'admin', 1),
  ('user1', 'user1@gmail.com', 'user1', 0);

INSERT INTO room (boss_name, img_src, gif_src)
VALUES
  ('Le seigneur des balises', '../../src/assets/images/boss/boss-html.png', '../../src/assets/images/boss/boss-html.gif'),
  ('Gridzilla', '../../src/assets/images/boss/boss-css.png', '../../src/assets/images/boss/boss-css.gif'),
  ('DOM-inator', '../../src/assets/images/boss/boss-js.png', '../../src/assets/images/boss/boss-js.gif'),
  ('Captain Hook', '../../src/assets/images/boss/boss-react.png', '../../src/assets/images/boss/boss-react.gif'),
  ('Nodeferatus', '../../src/assets/images/boss/boss-node.png', '../../src/assets/images/boss/boss-node.gif'),
  ('Soufiane Maski', '../../src/assets/images/boss/boss-sql.png', '../../src/assets/images/boss/boss-sql.gif');

INSERT INTO challenge (title, guideline, hint, soluce, type, question, rep1, rep2, rep3, rep4, room_id)
VALUES
  ('HTML', 'guideline', 'C\'est un raccourci pour "image" en anglais.', '<img>', 'quizz', 'Quel est l’élément HTML utilisé pour insérer une image dans une page web ?', '<img>', '<image>', '<picture>', '<media>', 1),
  ('HTML', 'guideline', 'Cette balise est comme une porte vers une autre page.', '<a>', 'quizz', 'Quelle est la balise correcte pour créer un lien hypertexte ?', '<link>', '<href>', '<a>', '<anchor>', 1),
  ('HTML', 'guideline', 'Cet attribut est composé de deux lettres simples.', 'id', 'prompt', 'Quel attribut est utilisé pour spécifier un identifiant unique à un élément HTML ?', NULL, NULL, NULL, NULL, 1),
  ('HTML', 'guideline', 'Cet attribut sert à "parler" de l\'image quand elle ne peut pas être vue.', 'alt', 'prompt', 'Quelle est la signification de l’attribut alt dans la balise <img> ?', 'description', 'alternative', NULL, NULL, 1),
  ('CSS', 'guideline', 'Cette propriété est aussi simple que son nom.', 'color', 'quizz', 'Quelle propriété CSS est utilisée pour changer la couleur du texte ?', 'background-color', 'text-color', 'font-color', 'color', 2),
  ('CSS', 'guideline', 'Cette propriété commence par la dernière lettre de l\'alphabet.', 'z-index', 'quizz', 'Quelle propriété CSS permet de contrôler l’ordre d’affichage des éléments ?', 'stack-order', 'z-index', 'order', 'visibility', 2), 
  ('CSS', 'guideline', 'Cette syntaxe utilise le mot "var" pour indiquer une variable.', 'var(--nom-de-la-variable)', 'quizz', 'Quelle syntaxe est correcte pour utiliser une variable CSS ?', '$nom-de-la-variable', 'var(--nom-de-la-variable)', 'variable(--nom-de-la-variable)', '%nom-de-la-variable', 2),
  ('CSS', 'guideline', 'Cette valeur garde l\'élément "fixé" à un endroit précis.', 'fixed', 'prompt', 'Quelle valeur de la propriété position permet de fixer un élément ?', NULL, NULL, NULL, NULL, 2),
  ('Javascript', 'guideline', 'Utilise "console.log" pour afficher un message.', 'console.log("hello")', 'quizz', 'Quelle est la syntaxe correcte pour afficher un message dans la console ?', 'print("hello")', 'console.log("hello")', 'echo("hello")', 'console.log(hello)', 3),
  ('Javascript', 'guideline', 'Cette méthode commence par "parse" et est utilisée pour transformer une chaîne.', 'parseInt()', 'quizz', 'Quelle méthode est utilisée pour transformer une chaîne en nombre entier ?', 'TransformToNumber()', 'Number()', 'String()', 'parseInt()', 3),
  ('Javascript', 'guideline', 'Une variable en JavaScript sert à "stocker" des données.', 'stocker donnée', 'prompt', 'Qu\'est-ce qu\'une variable en JavaScript ?', NULL, NULL, NULL, NULL, 3),
  ('Javascript', 'guideline', 'Pour déclarer une variable, tu peux utiliser "let", "const" ou "var".', 'const let var', 'prompt', 'Quels mots-clés peuvent être utilisés pour déclarer une variable ?', NULL, NULL, NULL, NULL, 3),
  ('Javascript', 'guideline', 'Le DOM signifie "Document Object Model".', 'document object model', 'prompt', 'Que signifie DOM ?', NULL, NULL, NULL, NULL, 3),
  ('Javascript', 'guideline', 'Si une variable n\'est pas initialisée, elle n\'a pas encore été définie.', 'undefined', 'prompt', 'Quel est le type par défaut d\'une variable non initialisée ?', NULL, NULL, NULL, NULL, 3);

INSERT INTO progress (user_id, room_id, challenge_id)
VALUES
  (1, 1, 1),
  (2, 2, 5);
