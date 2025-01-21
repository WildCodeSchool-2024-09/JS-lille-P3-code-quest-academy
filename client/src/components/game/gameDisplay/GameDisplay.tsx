import "./GameDisplay.css";
import { useContext } from "react";
import { GameContext } from "../../../services/GameContext";

function GameDisplay() {
  const context = useContext(GameContext);
  // const progress = context ? context.progress : null;

  if (!context) {
    return (
      <div>
        Error: Je ne sais pas le progess de mon joueur wesh is not available
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
