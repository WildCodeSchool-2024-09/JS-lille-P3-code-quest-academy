import { GameContext } from "../../../services/GameContext";
import "./GameCommands.css";
import { useContext } from "react";
import Quizz from "./minigame/quizz/Quizz";
import Prompt from "./minigame/prompt/Prompt";

function GameCommands() {

  //Importation du gameContext
  const context = useContext(GameContext);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  //Importation des variables du gameContext utilisées sur la page
  const { challenge, currentIndex } = context;

  return (
    <>
      {challenge[currentIndex]?.type === "quizz" ? (
        <Quizz />
      ) : challenge[currentIndex]?.type === "prompt" ? (
        <Prompt />
      ) : ( <div className="command-container"/> )}
    </>
  );
}

export default GameCommands;
