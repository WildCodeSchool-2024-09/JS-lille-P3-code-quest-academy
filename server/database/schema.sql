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
  rep4 VARCHAR(100),
  room_id INT,
  CONSTRAINT fk_room FOREIGN KEY (room_id) REFERENCES room(id),
  );

CREATE TABLE progress (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
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

INSERT INTO challenge (title, guideline, hint, soluce, type, question, rep1, rep2, rep3, rep4, room_id)
VALUES
   ("HTML", "guideline", "C'est un raccourci pour 'image' en anglais.", "<img>", "quizz", "Quel est l’élément HTML utilisé pour insérer une image dans une page web ?", "<img>", "<image>", "<picture>", "<media>", 1),
  ("HTML", "guideline", "Cette balise est comme une porte vers une autre page. Elle utilise une lettre simple, souvent associée à 'adresse' ou 'ancre' en anglais.", "<a>", "quizz", "Quelle est la balise correcte pour créer un lien hypertexte", "<link>", "<href>", "<a>", "<anchor>", 1),
  ("HTML", "guideline", "Cet attribut est composé de deux lettres simples et est souvent utilisé pour dire 'identité'.", "id", "prompt", "Quel attribut est utilisé pour spécifier un identifiant unique à un élément HTML ?", "null", "null", "null", "null", 1),
  ("HTML", "guideline", "Cet attribut sert à 'parler' de l'image quand elle ne peut pas être vue. Pensez au mot 'alternative'.", "Fournir une description alternative pour l’image si elle ne peut pas être affichée.", "prompt",  "Quelle est la signification de l’attribut alt dans la balise <img> ?", "description", "alternative", "null", "null", 1),
  ("CSS", "guideline", "Cette propriété est aussi simple que son nom. Elle correspond au mot anglais pour 'couleur'.", "color", "quizz", "Quelle propriété CSS est utilisée pour changer la couleur du texte ?", "background-color", "text-color", "font-color", "color", 2),
  ("CSS", "guideline", "Cette propriété commence par la dernière lettre de l'alphabet et indique un 'niveau' ou un 'index' pour gérer la superposition des éléments.", "z-index", "quizz", "Quelle propriété CSS permet de contrôler l’ordre d’affichage des éléments empilés les uns sur les autres ?", "stack-order", "z-index", "order", "visibility", 2), 
  ("CSS", "guideline", "Cette syntaxe utilise le mot 'var' pour indiquer qu'il s'agit d'une variable, suivi d'un nom entre parenthèses qui commence toujours par deux tirets '--'.", "var(--nom-de-la-variable)", "quizz", "Quelle syntaxe est correcte pour utiliser une variable CSS ?", "$nom-de-la-variable", "var(--nom-de-la-variable)", "variable(--nom-de-la-variable)", "%nom-de-la-variable", 2),
  ("CSS", "guideline", "Cette valeur garde l'élément 'fixé' à un endroit précis de la fenêtre, même lorsque tu fais défiler la page. Son nom est le même que l'idée de rester immobile.", "fixed", "prompt", "Quelle valeur de la propriété position permet de fixer un élément par rapport à la fenêtre, même lors du défilement de la page ?", "null", "null", "null", "null", 2),
  ("Javascript", "guideline", "Utilise 'console.log' pour afficher un message dans la console, et n'oublie pas de mettre ton texte entre des apostrophes.", "console.log('hello')", "quizz", "Quelle est la syntaxe correcte pour afficher un message dans la console ?", "print('hello')", "console.log('hello')", "echo('hello')", "console.log(hello)", 3),
  ("Javascript", "guideline", "Cette méthode commence par 'parse' et est utilisée pour transformer une chaîne de caractères en un entier. Pense à l'idée de 'décortiquer' pour obtenir un nombre !", "parseInt()", "quizz", "Quelle méthode est utilisée pour transformer une chaîne en nombre entier ?", "TransformToNumber()", "Number()", "String()", "parseInt()", 3),
  ("Javascript", "guideline", "Une variable en JavaScript sert à 'stocker' des données, un peu comme un coffre où tu ranges des informations que tu veux utiliser plus tard.", "stocker donnée", "prompt", "Qu'est-ce qu'une variable en JavaScript ?", "null", "null", "null", "null", 3),
  ("Javascript", "guideline", "Pour déclarer une variable, tu peux utiliser les mots-clés 'let', 'const' ou 'var', qui sont comme des étiquettes pour identifier et gérer tes données.", "const let var", "prompt", "Quels mots-clés peuvent être utilisés pour déclarer une variable ?", "null", "null", "null", "null", 3),
  ("Javascript", "guideline", "Le DOM signifie 'Document Object Model'. C'est une structure qui permet d'accéder et de manipuler les éléments d'une page web, un peu comme une carte des objets qui composent la page.", "document object model", "prompt", "Que signifie DOM ?", "null", "null", "null", "null", 3),
  ("Javascript", "guideline", "Si une variable n'est pas initialisée, c'est comme si elle n'a pas encore été définie et n'a donc pas de valeur spécifique.", "undefined", "prompt", "Quel est le type par défaut d'une variable non initialisée ?", "null", "null", "null", "null", 3);

INSERT INTO progress (user_id, room_id, challenge_id)
VALUES
  (1, 1, 1),
  (2, 2, 5);
