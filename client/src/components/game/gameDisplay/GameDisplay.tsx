import "./GameDisplay.css";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../services/GameContext";

function GameDisplay() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return <div>Error: gameContext is not available</div>;
  }

  const { actualChallenge } = gameContext;

  const [imgSrc, setImgSrc] = useState(
    "./src/assets/images/game-background-level0.png",
  );

  useEffect(() => {
    if (actualChallenge) {
      if (actualChallenge?.title === "HTML") {
        setImgSrc("./src/assets/images/html-room.png");
      } else {
        setImgSrc("./src/assets/images/game-background-level0.png");
      }
    }
  }, [actualChallenge]);

  return (
    <>
      <div className="gamedisplay-container">
        <img className="gamedisplay-img" src={imgSrc} alt="plateau de jeu" />
      </div>
    </>
  );
}

export default GameDisplay;
