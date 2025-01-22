import { useContext } from "react";
import { GameContext } from "../../../services/GameContext";
import "./GameInstructions.css";

function GameInstructions() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return <div>Error: Context is not available</div>;
  }

  const { currentIndex, challenge, setCurrentIndex } = gameContext;

  const handleChange = () => {
    if (currentIndex < challenge.length - 1) {
      //Next row in db
      setCurrentIndex(currentIndex + 1);
    } else {
      //Get back to the first row
      setCurrentIndex(0);
    }
  };

  return (
    <>
      <div className="instructions-container">
        <p className="instructions-text">
          {challenge.length > 0
            ? challenge[0].guideline
            : "No guidelines available"}
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
