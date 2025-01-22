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
      (e.target as HTMLParagraphElement).innerText ===
      challenge[currentIndex]?.soluce;

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
    challenge,
    currentIndex,
    setIsButtonEnabled,
    answerStyles,
    setAnswerStyles,
    feedbackMessage,
    setFeedbackMessage,
    setButtonStyles,
  } = gameContext;

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
