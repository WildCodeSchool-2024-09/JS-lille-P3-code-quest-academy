import { useContext } from "react";
import { GameContext } from "../../../services/GameContext";
import "./GameInstructions.css";

function GameInstructions() {
  //Importation du gameContext
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return <div>Error: Context is not available</div>;
  }

  //Importation des variables du gameContext utilisées sur la page
  const { challenge, currentIndex, setCurrentIndex, setCurrentType } =
    gameContext;

  const handleChange = () => {
    if (currentIndex < challenge.length - 1) {
      //Passe à la question suivante
      setCurrentIndex(currentIndex + 1);
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
          className={"instructions-button"}
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
