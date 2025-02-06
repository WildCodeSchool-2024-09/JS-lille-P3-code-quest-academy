CREATE TABLE account (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  firstTeacher VARCHAR(50) DEFAULT 'Fantine',
  secondTeacher VARCHAR(50) DEFAULT 'Soufiane'
  );

CREATE TABLE room (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  boss_name VARCHAR(50),
  boss_img_src TEXT,
  fight_video_src TEXT,
  room_img_src TEXT
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
  CONSTRAINT fk_challenge_room FOREIGN KEY (room_id) REFERENCES room(id)
  );

CREATE TABLE progress (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT,
  room_id INT,
  challenge_id INT,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES account(id) ON DELETE CASCADE,
  CONSTRAINT fk_room FOREIGN KEY (room_id) REFERENCES room(id),
  CONSTRAINT fk_progress_challenge FOREIGN KEY (challenge_id) REFERENCES challenge(id)
);

INSERT INTO account (username, email, hashed_password, is_admin)
VALUES
  ("admin", "admin@gmail.com", "$argon2id$v=19$m=19456,t=2,p=1$plUwfAAwGqdtJgSlYyA/yQ$gEmsZmb+wa8RMvEnRHvJhnYP7mZM96PscaAc4tbou7Y", 1),
  ("user1", "user1@gmail.com", "$argon2id$v=19$m=19456,t=2,p=1$OMtvcBoC8Sw1yJRMqeEMBA$+c8sAtpJZ8VcbN52geHzSegdpFIkZunbfT2HH9okLPw", 0);

INSERT INTO room (boss_name, boss_img_src, fight_video_src, room_img_src)
VALUES
  ("Le seigneur des balises", "./src/assets/images/boss/boss-html.png", "./src/assets/videos/html-boss-fight.mp4", "./src/assets/images/html-room.png"),
  ("Gridzilla", "./src/assets/images/boss/boss-css.png", "./src/assets/videos/css-boss-fight.mp4", "./src/assets/images/css-room.png"),
  ("DOM-inator", "./src/assets/images/boss/boss-js.png", "../src/assets/videos/js-boss-fight.mp4", "./src/assets/images/js-room.png"),
  ("Captain Hook", "./src/assets/images/boss/boss-react.png", "./src/assets/videos/react-boss-fight.mp4", "./src/assets/images/react-room.png"),
  ("Nodeferatus", "./src/assets/images/boss/boss-node.png", "./src/assets/videos/node-boss-fight.mp4", "./src/assets/images/node-room.png"),
  ("JOIN Snow", "./src/assets/images/boss/boss-sql.png", "./src/assets/videos/sql-boss-fight.mp4", "./src/assets/images/sql-room.png"),
  (null, null, null, "../src/assets/images/game-background-level0.png"),
  (null, null, null, "../src/assets/images/game-background-level1.gif"),
  (null, null, null, "../src/assets/images/game-background-level2.gif"),
  (null, null, null, "../src/assets/images/game-background-level3.gif"),
  (null, null, null, "../src/assets/images/game-background-level4.gif"),
  (null, null, null, "../src/assets/images/game-background-level5.gif"),
  (null, null, null, "../src/assets/images/game-background-level6.gif"),
  (null, null, null, "../src/assets/images/game-background-level7.gif");

INSERT INTO challenge (title, guideline, hint, soluce, type, question, rep1, rep2, rep3, rep4, room_id)
VALUES
  ("Transition", "Bienvenue à la Code Quest Academy ! Un mystérieux bug est apparu et empêche les étudiants de continuer leur apprentissage. Aides nous à remettre de l'ordre, clique sur le bouton suivant pour commencer.", "Hello ! Moi c'est Fantine, je suis là si tu as besoin d'une astuce !", "soluce", "transition", "question", null, null, null, null, 7),
  ("Transition", "La première salle a été débloquée, tu peut cliquer dessus pour t'y rendre et commencer l'aventure !", "hint", "soluce", "transition", "question", null, null, null, null, 8),
  ("HTML", "guideline", "C'est un raccourci pour 'image' en anglais.", "<img>", "quizz", "Quel est l’élément HTML utilisé pour insérer une image dans une page web ?", "<img>", "<image>", "<picture>", "<media>", 1),
  ("HTML", "guideline", "Cette balise est comme une porte vers une autre page. Elle utilise une lettre simple, souvent associée à 'adresse' ou 'ancre' en anglais.", "<a>", "quizz", "Quelle est la balise correcte pour créer un lien hypertexte", "<link>", "<href>", "<a>", "<anchor>", 1),
  ("HTML", "guideline", "Cet attribut est composé de deux lettres simples et est souvent utilisé pour dire 'identité'.", "id", "prompt", "Quel attribut est utilisé pour spécifier un identifiant unique à un élément HTML ?", "null", "null", "null", "null", 1),
  ("HTML", "guideline", "Cet attribut sert à 'parler' de l'image quand elle ne peut pas être vue. Pensez au mot 'alternative'.", "alternatif", "prompt",  "Quelle est la signification de l’attribut alt dans la balise <img> ?", "description", "alternative", "null", "null", 1),
  ("HTML", "guideline", "html", "", "boss-spawn",  "", "null", "null", "null", "null", 1),
  ("HTML", "Est-tu prêt à combattre le boss HTML ?", "hint", "soluce", "boss", "question", null, null, null, null, 1),
  ("Transition", "Bravo, tu as vaincu Le seigneur des balises et maitrise maintenant le HTML ! Tu as débloqué la salle suivante, clique sur l'image pour t'y rendre.", "hint", "soluce", "transition", "question", null, null, null, null, 9),
  ("CSS", "guideline", "Cette propriété est aussi simple que son nom. Elle correspond au mot anglais pour 'couleur'.", "color", "quizz", "Quelle propriété CSS est utilisée pour changer la couleur du texte ?", "background-color", "text-color", "font-color", "color", 2),
  ("CSS", "guideline", "Cette propriété commence par la dernière lettre de l'alphabet et indique un 'niveau' ou un 'index' pour gérer la superposition des éléments.", "z-index", "quizz", "Quelle propriété CSS permet de contrôler l’ordre d’affichage des éléments empilés les uns sur les autres ?", "stack-order", "z-index", "order", "visibility", 2),
  ("CSS", "guideline", "Cette syntaxe utilise le mot 'var' pour indiquer qu'il s'agit d'une variable, suivi d'un nom entre parenthèses qui commence toujours par deux tirets '--'.", "var(--nom-de-la-variable)", "quizz", "Quelle syntaxe est correcte pour utiliser une variable CSS ?", "$nom-de-la-variable", "var(--nom-de-la-variable)", "variable(--nom-de-la-variable)", "%nom-de-la-variable", 2),
  ("CSS", "guideline", "Cette valeur garde l'élément 'fixé' à un endroit précis de la fenêtre, même lorsque tu fais défiler la page. Son nom est le même que l'idée de rester immobile.", "fixed", "prompt", "Quelle valeur de la propriété position permet de fixer un élément par rapport à la fenêtre, même lors du défilement de la page ?", "null", "null", "null", "null", 2),
  ("CSS", "guideline", "css", "", "boss-spawn",  "", "null", "null", "null", "null", 2),
  ("CSS", "Est-tu prêt à combattre le boss CSS ?", "hint", "soluce", "boss", "question", null, null, null, null, 2),
  ("Transition", "Bravo, tu as vaincu Gridzilla et maitrise maintenant le CSS ! Tu as débloqué la salle suivante, clique sur l'image pour t'y rendre.", "hint", "soluce", "transition", "question", null, null, null, null, 10),
  ("Javascript", "guideline", "Utilise 'console.log' pour afficher un message dans la console, et n'oublie pas de mettre ton texte entre des apostrophes.", "console.log('hello')", "quizz", "Quelle est la syntaxe correcte pour afficher un message dans la console ?", "print('hello')", "console.log('hello')", "echo('hello')", "console.log(hello)", 3),
  ("Javascript", "guideline", "Cette méthode commence par 'parse' et est utilisée pour transformer une chaîne de caractères en un entier. Pense à l'idée de 'décortiquer' pour obtenir un nombre !", "parseInt()", "quizz", "Quelle méthode est utilisée pour transformer une chaîne en nombre entier ?", "TransformToNumber()", "Number()", "String()", "parseInt()", 3),
  ("Javascript", "guideline", "Une variable en JavaScript sert à 'stocker' des données, un peu comme un coffre où tu ranges des informations que tu veux utiliser plus tard.", "stocker donnée", "prompt", "Qu'est-ce qu'une variable en JavaScript ?", "null", "null", "null", "null", 3),
  ("Javascript", "guideline", "Pour déclarer une variable, tu peux utiliser les mots-clés 'let', 'const' ou 'var', qui sont comme des étiquettes pour identifier et gérer tes données.", "const let var", "prompt", "Quels mots-clés peuvent être utilisés pour déclarer une variable ?", "null", "null", "null", "null", 3),
  ("Javascript", "guideline", "Le DOM signifie 'Document Object Model'. C'est une structure qui permet d'accéder et de manipuler les éléments d'une page web, un peu comme une carte des objets qui composent la page.", "document object model", "prompt", "Que signifie DOM ?", "null", "null", "null", "null", 3),
  ("Javascript", "guideline", "Si une variable n'est pas initialisée, c'est comme si elle n'a pas encore été définie et n'a donc pas de valeur spécifique.", "undefined", "prompt", "Quel est le type par défaut d'une variable non initialisée ?", "null", "null", "null", "null", 3),
  ("Javascript", "guideline", "javascript", "", "boss-spawn",  "", "null", "null", "null", "null", 3),
  ("Javascript", "Est-tu prêt à combattre le boss Javascript ?", "hint", "soluce", "boss", "question", null, null, null, null, 3),
  ("Transition", "Bravo, tu as vaincu le DOM-inator et maitrise maintenant le Javascript ! Tu as débloqué la salle suivante, clique sur l'image pour t'y rendre.", "hint", "soluce", "transition", "question", null, null, null, null, 11),
  ("React", "guideline", "Comment on appelle ça déjà ? des bracket ?", "{}", "quizz", "Quelle syntaxe est utilisée pour insérer du JavaScript dans du JSX ?", "<>", "()", "[]", "{}", 4),
  ("React", "guideline", "Cette fonction d’effet secondaire est exécutée après chaque rendu du composant si ses dépendances changent.", "useEffect", "quizz", "Quel Hook React est utilisée pour exécuter du code après le rendu d’un composant ?", "useState", "useMemo", "useEffect", "useRef", 4),
  ("React", "guideline", "Pense aux Etats Unis !", "useState", "prompt", "Quel Hook React est utilisée pour déclarer un état dans un composant fonctionnel ?", "null", "null", "null", "null", 4),
  ("React", "guideline", "ces Objets permettent de passer des données d’un composant parent à un composant enfant. Ils sont immuables et accessibles en argument dans un composant fonctionnel.", "props", "prompt", "Comment appelle-t-on les données passées d’un composant parent à un composant enfant en React ?", "null", "null", "null", "null", 4),
  ("React", "guideline", "react", "", "boss-spawn",  "", "null", "null", "null", "null", 4),
  ("React", "Est-tu prêt à combattre le boss React ?", "hint", "soluce", "boss", "question", null, null, null, null, 4),
  ("Transition", "Bravo, tu as vaincu le Captain Hook et maitrise maintenant React ! Tu as débloqué la salle suivante, clique sur l'image pour t'y rendre.", "hint", "soluce", "transition", "question", null, null, null, null, 12),
  ("Node", "guideline", "Ce framework basé sur Node.js facilite la création d’API en utilisant des routes et des middlewares.", "express", "prompt", "Quel framework est couramment utilisé avec Node.js pour créer des API web ?", "null", "null", "null", "null", 5),
  ("Node", "guideline", "Ce gestionnaire de paquets est installé avec Node.js et permet d’installer des bibliothèques JavaScript.", "npm", "prompt", "Quel est le gestionnaire de paquets par défaut de Node.js ?", "null", "null", "null", "null", 5),
  ("Node", "guideline", "Cette commande est utilisée pour initialiser un projet Node.js en créant un fichier package.json.", "npm init", "quizz", "Quelle commande permet d'initialiser un projet Node.js ?", "npm run db:migrate", "npm run dev", "npm init", "npm run check", 5),
  ("Node", "guideline", "🎵 On aaa parcouruu le cheemin...", "path", "quizz", "Quel module Node.js est utilisé pour travailler avec les chemins de fichiers ?", "path", "fs", "url", "http", 5),
  ("Node", "guideline", "node", "", "boss-spawn",  "", "null", "null", "null", "null", 5),
  ("Node", "Est-tu prêt à combattre le boss Node ?", "hint", "soluce", "boss", "question", null, null, null, null, 5),
  ("Transition", "Bravo, tu as vaincu Nodeferatu et maitrise maintenant Node ! Tu as débloqué la salle suivante, clique sur l'image pour t'y rendre.", "hint", "soluce", "transition", "question", null, null, null, null, 13),
  ("SQL", "guideline", "Cette commande est utilisée pour extraire des données d'une table en SQL.", "SELECT", "quizz", "Quelle commande SQL est utilisée pour récupérer des données d'une table ?", "FETCH", "INNER JOIN", "USE", "SELECT", 6),
  ("SQL", "guideline", "Cette commande est utilisée pour extraire des données d'une table en SQL.", "NOT NULL", "quizz", "Quelle contrainte SQL empêche qu'une colonne contienne des valeurs nulles ?", "DEFAULT", "PRIMARY KEY", "NOT NULL", "UNIQUE", 6),
  ("SQL", "guideline", "Cette clause permet de filtrer les résultats d’une requête SQL en fonction d’une condition spécifique.", "WHERE", "prompt", " Quelle clause SQL permet de filtrer les résultats d’une requête ?", "null", "null", "null", "null", 6),
  ("SQL", "guideline", "C'est la première étape de la conception d'une base de donnée.", "modele conceptuel de donnée", "prompt", " C'est quoi un MCD ?", "null", "null", "null", "null", 6),
  ("SQL", "guideline", "SQL", "", "boss-spawn",  "", "null", "null", "null", "null", 6),
  ("SQL", "Est-tu prêt à combattre le boss SQL ?", "hint", "soluce", "boss", "question", null, null, null, null, 6),
  ("SQL", "Bravo ! tu as battu le boss SQ... mais attends... il y a quelqu'un sous ce costume !", "hint", "soluce", "transition", "question", null, null, null, null, 6),
  ("Transition", "Tu as débloqué la dernière salle ! Clique sur le bouton pour t'y rendre.", "hint", "soluce", "transition", "question", null, null, null, null, 14);
  

INSERT INTO progress (user_id, room_id, challenge_id)
VALUES
  (1, 1, 1),
  (2, 6, 42);