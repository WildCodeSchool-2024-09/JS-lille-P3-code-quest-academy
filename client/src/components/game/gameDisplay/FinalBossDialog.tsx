import { useState } from "react";
import { useContext } from "react";
import { GameContext } from "../../../services/GameContext";

function FinalBossDialog() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return <div>Error: gameContext is not available</div>;
  }

  const { setButtonStyles, setIsButtonEnabled } = gameContext;

  const finalBossDialog = [
    "Bonjour, je suis à l'origine de tout ceci",
    "Je recherche un developpeur pour rejoindre mon équipe",
    "Je demande la maitrîse de 20 technologies et framework différents, ainsi que 5 ans d'expérience minimum.",
    "Je ne crois pas que tu as les qualités requises, mais je vais te donner une chance de me montrer ce que tu sais faire !",
  ];
  const [dialogIndex, setDialogIndex] = useState(0);

  const handleFinalBossDialog = () => {
    if (dialogIndex < finalBossDialog.length - 1) {
      setDialogIndex(dialogIndex + 1);
    }
    if (dialogIndex === 2) {
      setIsButtonEnabled(true);
      setButtonStyles("button-enabled");
    }
  };

  return (
    <>
      <div className="final-character-container">
        <p className="final-bd">{finalBossDialog[dialogIndex]}</p>
        <img
          src="./src/assets/images/boss/final-boss.png"
          alt=""
          className="final-character"
          onClick={handleFinalBossDialog}
          onKeyUp={handleFinalBossDialog}
        />
      </div>
    </>
  );
}

export default FinalBossDialog;
