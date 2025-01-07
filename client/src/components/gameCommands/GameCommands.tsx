import { Context } from "../../services/Context";
import "./GameCommands.css";
import { useContext } from "react";

function GameCommands() {
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  const { challenge, currentIndex } = context;

  return (
    <>
      <div className="command-container">
        <p>{challenge[currentIndex]?.soluce}</p>
      </div>
      
      {/* <div className="command-container quizz">          QUIZZ
                         <p className="answer-a">Réponse A</p>
                         <p className="answer-b">Réponse B</p>
                         <p className="answer-c">Réponse C</p>
                         <p className="answer-d">Réponse D</p>
                     </div> */}
    </>
  );
}

export default GameCommands;
