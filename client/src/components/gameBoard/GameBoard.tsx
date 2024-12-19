import "./GameBoard.css"

function GameBoard() {

    return (
        <>
        <div className="gameboard-container">
          <img className="game-img" src="./src/assets/images/game-background.jpeg" alt="plateau de jeu" />
        </div>
        <div className="command-container">
          <p className="command-text"> Tu pourras taper ou selectionner les réponses ici ! </p>
        </div>
        </>
     );
}

export default GameBoard;