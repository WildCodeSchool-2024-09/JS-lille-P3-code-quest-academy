import { Context } from "../../services/Context";
import "./GameInstructions.css";
import { useContext } from "react";

function GameInstructions() {

  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  const {instructions, gameType, currentType, setCurrentType} = context;

  const handleChangeType = () => {
  if (currentType !== null) {
    const nextIndex = (gameType.indexOf(currentType) + 1) % gameType.length;
    setCurrentType(gameType[nextIndex]);
  }
};

  return (
    <>
      <div className="instructions-container">
        <p className="instructions-text">
          {instructions[0]}
        </p>
          <button className="instructions-button" type="button" onClick={handleChangeType}>Suivant</button>
          
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
