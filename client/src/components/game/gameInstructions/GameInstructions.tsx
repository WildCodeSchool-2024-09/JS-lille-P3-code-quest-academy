import { Context } from "../../../services/Context";
import "./GameInstructions.css";
import { useContext } from "react";

function GameInstructions() {
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

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
    setButtonStyles
  } = context;

  const handleChange = () => {
    if (currentIndex < challenge.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentType(currentType + 1);
      setAnswerStyles("");
      setFeedbackMessage("");
      setIsButtonEnabled(false);
      setButtonStyles("");
    } else {
      setCurrentIndex(0);
      setCurrentType(0);
    }
  };

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
