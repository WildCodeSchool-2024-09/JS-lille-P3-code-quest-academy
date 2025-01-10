import { Context } from "../../../services/Context";
import "./GameCommands.css";
import { useContext } from "react";
import Prompt from "./minigame/prompt/Prompt";
import Quizz from "./minigame/quizz/Quizz";

function GameCommands() {
  //Importation du contexte
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  //Importation des variables du contexte utilisées sur la page
  const { challenge, currentIndex, setIsButtonEnabled, setButtonStyles } =
    context;

  // Active le bouton pendant les phases de transition
  if (
    challenge[currentIndex] &&
    challenge[currentIndex].type === "transition" &&
    challenge[currentIndex].title !== "RoomSelection"
  ) {
    setIsButtonEnabled(true);
    setButtonStyles("button-enabled");
  }

  return (
    <>
      {challenge[currentIndex]?.type === "quizz" ? (
        <Quizz />
      ) : challenge[currentIndex]?.type === "prompt" ? (
        <Prompt />
      ) : challenge[currentIndex]?.type === "transition" ||
        challenge[currentIndex]?.title === "Boss" ? (
        <div className="command-container" />
      ) : null}
    </>
  );
}

export default GameCommands;
