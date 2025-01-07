import { Context } from "../../services/Context";
import "./GameCommands.css";
import { useContext } from "react";

function GameCommands() {

    const context = useContext(Context);

    if (!context) {
      return <div>Error: Context is not available</div>;
    }
  
    const {currentType} = context;

  return (
    
    <>
         {currentType === "quizz" ? (
                <div className="command-container quizz">
                    <p className="answer-a">Réponse A</p>
                    <p className="answer-b">Réponse B</p>
                    <p className="answer-c">Réponse C</p>
                    <p className="answer-d">Réponse D</p>
                </div>
            ) : currentType === "text" ? (
                <div className="command-container">
                    <p className="command-text">Tu pourra taper tes réponses ici !</p>
                </div>
            ) : currentType === "checkbox" ? (
                <div className="command-container">
                    <p className="command-checkbox">Choisissez vos options ici !</p>
                </div>
            ) : null}
        </>
    );
};

export default GameCommands;
