import "./GameDisplay.css";
import { useContext } from "react";
import { GameContext } from "../../../services/GameContext";

function GameDisplay() {
  //Importation du gameContext
  const context = useContext(GameContext);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  //Importation des variables du gameContext utilisées sur la page

  return (
    <>
      <div className="gamedisplay-container">
        <img
          className="gamedisplay-img"
          src="./src/assets/images/game-background-level0.png"
          alt="plateau de jeu"
        />
      </div>
    </>
  );
}

export default GameDisplay;
