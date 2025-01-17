import "./GameDisplay.css";
import { useContext } from "react";
import { UserContext } from "../../../services/UserContext";

function GameDisplay() {
  const context = useContext(UserContext);
  const progress = context ? context.progress : null;

  if (!progress) {
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
          src="./src/assets/images/game-background-level0.png"
          alt="plateau de jeu"
        />
      </div>
    </>
  );
}

export default GameDisplay;
