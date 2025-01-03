import "./GameBoard.css";

function GameBoard() {
  return (
    <>
      <div className="gameboard-container">
        <img
          className="game-img"
          src="./src/assets/images/game-background.jpeg"
          alt="plateau de jeu"
        />
        {/* Éléments superposés */}
        <div className="overlay-item item1" />
        <div className="overlay-item item2" />
        <div className="overlay-item item3" />
        <div className="overlay-item item4" />
        <div className="overlay-item item5" />
        <div className="overlay-item item6" />
        <div className="overlay-item item7" />
        <div className="overlay-item item8" />
        <div className="overlay-item item9" />
      </div>
      <div className="command-container">
        <p className="command-text">
          Tu pourras taper ou sélectionner les réponses ici !
        </p>
      </div>
    </>
  );
}

export default GameBoard;
