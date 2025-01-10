import { Context } from "../../../../../services/Context";
import "./Quizz.css";
import { useContext } from "react";

function Quizz() {
  const context = useContext(Context);
  if (!context) {
    return <div>Error: Context is not available</div>;
  }

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

  return (
    <>
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
    </>
  );
}

export default Quizz;
