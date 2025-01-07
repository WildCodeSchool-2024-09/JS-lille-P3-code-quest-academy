import { Context } from "../../services/Context";
import "./GameInstructions.css";
import { useContext } from "react";

function GameInstructions() {

  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  const {challenge, currentIndex, setCurrentIndex} = context;

  const handleChange = () => {
    if (currentIndex < challenge.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  
  return (
    <>
      <div className="instructions-container">
        <p className="instructions-text">
          {challenge[currentIndex]?.guideline}
        </p>
          <button className="instructions-button" onClick={handleChange} type="button">Suivant</button>
          
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
