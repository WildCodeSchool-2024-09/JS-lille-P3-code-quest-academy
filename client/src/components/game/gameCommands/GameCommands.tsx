import { GameContext } from "../../../services/GameContext";
import "./GameCommands.css";
import { useContext } from "react";
import Prompt from "./minigame/prompt/Prompt";
import Quizz from "./minigame/quizz/Quizz";

function GameCommands() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return <div>Error: gameContext is not available</div>;
  }

  const { actualChallenge } = gameContext;

  return (
    <>
      {actualChallenge?.type === "quizz" ? (
        <Quizz />
      ) : actualChallenge?.type === "prompt" ? (
        <Prompt />
      ) : (
        <div className="command-container" />
      )}
    </>
  );
}

export default GameCommands;
