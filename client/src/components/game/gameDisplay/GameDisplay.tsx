import "./GameDisplay.css";
import { useContext } from "react";
import { GameContext } from "../../../services/GameContext";

function GameDisplay() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return (
      <div>
        Error: gameContext is not available
      </div>
    );
  }

  return (
    <>
      <div className="gamedisplay-container">
        <img
          className="gamedisplay-img"
          src="../src/assets/images/game-background-level0.png"
          alt="plateau de jeu"
        />
      </div>
    </>
  );
}

export default GameDisplay;
