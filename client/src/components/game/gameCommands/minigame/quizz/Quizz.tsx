import { GameContext } from "../../../../../services/GameContext";
import "./Quizz.css";
import { useContext } from "react";

function Quizz() {
  const gameContext = useContext(GameContext);
  if (!gameContext) {
    return <div>Error: Context is not available</div>;
  }

  const handleQuizz = (
    e:
      | React.MouseEvent<HTMLParagraphElement>
      | React.KeyboardEvent<HTMLParagraphElement>,
    index: number,
  ) => {
    const isCorrect =
      (e.target as HTMLParagraphElement).innerText === actualChallenge?.soluce;

    //Add background color to the answer if it's correct or wrong
    setAnswerStyles((prev) => ({
      ...prev,
      [index]: isCorrect ? "correct" : "wrong",
    }));

    //Add message feedback if the answer is correct or wrong
    setFeedbackMessage(
      isCorrect ? "Bonne réponse ! 🎉" : "Mauvaise réponse. 😢",
    );

    //Enable the button if the answer is correct
    if (isCorrect) {
      setIsButtonEnabled(true);
      setButtonStyles("button-enabled");
    }
  };

  const {
    actualChallenge,
    setIsButtonEnabled,
    feedbackMessage,
    setFeedbackMessage,
    setButtonStyles,
    answerStyles,
    setAnswerStyles,
  } = gameContext;

  return (
    <>
      <div className="command-container quizz">
        <h2>{actualChallenge?.question}</h2>
        <div className="answer-container">
          {[
            actualChallenge?.rep1,
            actualChallenge?.rep2,
            actualChallenge?.rep3,
            actualChallenge?.rep4,
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
