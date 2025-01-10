import { Context } from "../../../../../services/Context";
import "./Prompt.css";
import { useContext } from "react";

function Prompt() {
  //Importation du contexte
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  //Importation des variables du contexte utilisées sur la page
  const {
    challenge,
    currentIndex,
    setIsButtonEnabled,
    feedbackMessage,
    setFeedbackMessage,
    setButtonStyles,
  } = context;

  const handlePrompt = () => {
    const answer = prompt("tapez le mot manquant");
    if (answer === challenge[currentIndex]?.soluce) {
      setIsButtonEnabled(true);
      setButtonStyles("button-enabled");
      setFeedbackMessage("Bonne réponse ! 🎉");
    } else {
      setFeedbackMessage("Mauvaise réponse. 😢");
    }
  };

  return (
    <>
      <div className="command-container prompt">
        <h2>{challenge[currentIndex]?.question}</h2>
        <button type="button" className="prompt-button" onClick={handlePrompt}>
          Clique ici pour taper la réponse
        </button>
        {feedbackMessage && (
          <p className="feedback-message">{feedbackMessage}</p>
        )}
      </div>
    </>
  );
}

export default Prompt;
