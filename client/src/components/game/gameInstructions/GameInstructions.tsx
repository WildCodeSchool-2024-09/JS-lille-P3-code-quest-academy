import { useContext } from "react";
import { Context } from "../../../services/Context";
import "./GameInstructions.css";
import { useNavigate } from "react-router-dom";

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
    setRoom2Status,
  } = context;

  const navigate = useNavigate();

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
        
      if (challenge[currentIndex].id === 9) {
        navigate("/game");
        setRoom2Status("unlocked");
      }
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
        {/* <div>
        <button type="button" onClick={handleLevel1}>Lvl 1</button>
        <button type="button" onClick={handleLevel2}>Lvl 2</button>
        <button type="button" onClick={handleLevel3}>Lvl 3</button>
        <button type="button" onClick={handleLevel4}>Lvl 4</button>
        <button type="button" onClick={handleLevel5}>Lvl 5</button>
        <button type="button" onClick={handleLevel6}>Lvl 6</button>
        </div> */}

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
