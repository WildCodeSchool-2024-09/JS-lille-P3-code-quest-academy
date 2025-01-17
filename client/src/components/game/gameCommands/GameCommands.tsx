import { GameContext } from "../../../services/GameContext";
import "./GameCommands.css";
import { useContext } from "react";
import Prompt from "./minigame/prompt/Prompt";
import Quizz from "./minigame/quizz/Quizz";

function GameCommands() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return <div>Error: Context is not available</div>;
  }

  const { challenge, currentIndex } = gameContext;

  return (
    <>
      {challenge[currentIndex]?.type === "quizz" ? (
        <Quizz />
      ) : challenge[currentIndex]?.type === "prompt" ? (
        <Prompt />
      ) : (
        <div className="command-container" />
      )}
    </>
  );
}

export default GameCommands;
