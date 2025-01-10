import { Context } from "../../../services/Context";
import { useContext } from "react";
import "./GameInstructions.css";

function GameInstructions() {
  //Importation du contexte
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  //Importation des variables du contexte utilisées sur la page
  const {
    challenge,
    currentIndex,
    setCurrentIndex,
    currentType,
    setCurrentType,
    isButtonEnabled,
    setIsButtonEnabled,
    setAnswerStyles,
    setFeedbackMessage,
    buttonStyles,
    setButtonStyles,
    setRoom1Status,
  } = context;

  const handleChange = () => {
    if (currentIndex < challenge.length - 1) {
      setRoom1Status("unlocked");
      //Passe à la question suivante
      setCurrentIndex(currentIndex + 1);
      //Passe au type suivant
      setCurrentType(currentType + 1);
      //Réinitialise le style des réponses
      setAnswerStyles("");
      //Réinitialise le message de feedback
      setFeedbackMessage("");
      //Désactive le bouton suivant
      setIsButtonEnabled(false);
      //Réinitialise le style du bouton suivant
      setButtonStyles("");
    } else {
      setCurrentIndex(0);
      setCurrentType(0);
    }
  };

  if (
    challenge[currentIndex] &&
    challenge[currentIndex].title === "RoomSelection"
  ) {
    setButtonStyles("button-invisible");
  }

  return (
    <>
      <div className="instructions-container">
        <p className="instructions-text">
          {challenge[currentIndex]?.guideline}
        </p>
        <button
          disabled={!isButtonEnabled}
          className={`instructions-button ${buttonStyles}`}
          onClick={handleChange}
          type="button"
        >
          Suivant
        </button>

        <img
          className="help-img"
          src="./src/assets/images/fantine.png"
          alt="Fantine la formatrice"
        />
      </div>
    </>
  );
}

export default GameInstructions;
