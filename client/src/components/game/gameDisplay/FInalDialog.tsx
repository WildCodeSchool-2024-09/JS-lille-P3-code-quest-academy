import { useState } from "react";
import { useContext } from "react";
import { GameContext } from "../../../services/GameContext";

function FinalDialog() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return <div>Error: gameContext is not available</div>;
  }

  const { setButtonStyles, setIsButtonEnabled } = gameContext;

  const finalDialog = [
    "Bien joué, il semblerait que je t'ai sous-estimé !",
    "C'est moi qui ai causé le bug du campus, je voulais essayer une nouvelle technique de recrutement.",
    "Malgré le peu de temps de formation que tu as eu, tu as acquis de solides compétences !",
    "Que dirais-tu de rejoindre notre équipe ?",
  ];
  const [dialogIndex, setDialogIndex] = useState(0);

  const handleFinalDialog = () => {
    if (dialogIndex < finalDialog.length - 1) {
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
        <p className="final-bd">{finalDialog[dialogIndex]}</p>
        <img
          src="./src/assets/images/boss/final-boss.png"
          alt=""
          className="final-character"
          onClick={handleFinalDialog}
          onKeyUp={handleFinalDialog}
        />
      </div>
    </>
  );
}

export default FinalDialog;
