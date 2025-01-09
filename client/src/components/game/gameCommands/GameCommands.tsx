import { Context } from "../../../services/Context";
import "./GameCommands.css";
import { useContext } from "react";

function GameCommands() {

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
    answerStyles,
    setAnswerStyles,
    feedbackMessage,
    setFeedbackMessage,
    setButtonStyles,
  } = context;

  /* LOGIQUE DU QUIZZ */
  /* lOGIQUE DU QUIZZ */

  //Selectionne la réponse et change le style en fonction de la réponse
  const handleQuizz = (
    e:
      | React.MouseEvent<HTMLParagraphElement>
      | React.KeyboardEvent<HTMLParagraphElement>,
    index: number,
  ) => {
    const isCorrect =
      (e.target as HTMLParagraphElement).innerText ===
      challenge[currentIndex]?.soluce;

    //Ajoute la backgroundColor en fonction de la réponse
    setAnswerStyles((prev) => ({
      ...prev,
      [index]: isCorrect ? "correct" : "wrong",
    }));

    //Ajoute un message en fonction de la réponse en dessous du quizz
    setFeedbackMessage(
      isCorrect ? "Bonne réponse ! 🎉" : "Mauvaise réponse. 😢",
    );

    //Active le bouton suivant si la réponse est correcte et change son style
    if (isCorrect) {
      setIsButtonEnabled(true);
      setButtonStyles("button-enabled");
    }
  };

  /* lOGIQUE DU PROMPT */
  /* lOGIQUE DU PROMPT */

  const handlePrompt = () => {
    let answer = prompt("tapez le mot manquant");
    if (answer === challenge[currentIndex]?.soluce) {
      setIsButtonEnabled(true);
      setButtonStyles("button-enabled");
      setFeedbackMessage("Bonne réponse ! 🎉");
    } else {
      setFeedbackMessage("Mauvaise réponse. 😢");
    }
  }

  return (
    <>
      {challenge[currentIndex]?.type === "quizz" ? (
        <div className="command-container quizz">
          <h2>{challenge[currentIndex]?.question}</h2>
          <div className="answer-container">
            {[
              challenge[currentIndex]?.rep1,
              challenge[currentIndex]?.rep2,
              challenge[currentIndex]?.rep3,
              challenge[currentIndex]?.rep4,
            ].map((answer, index) => (
              <p
                key={answer}
                className={`answer ${answerStyles[index] || ""}`}
                onClick={(e) => handleQuizz(e, index)}
                onKeyDown={(e) => handleQuizz(e, index)}
              >
                {answer}
              </p>
            ))}
          </div>
          {feedbackMessage && (
            <p className="feedback-message">{feedbackMessage}</p>
          )}
        </div>
      ) : challenge[currentIndex]?.type === "prompt" ? (
        <div className="command-container prompt">
          <h2>{challenge[currentIndex]?.question}</h2>
          <button type="button" className="prompt-button" onClick={handlePrompt}>Clique ici pour taper la réponse</button>
          {feedbackMessage && (
            <p className="feedback-message">{feedbackMessage}</p>
          )}
        </div>
      ) : null}
    </>
  );
}

export default GameCommands;
