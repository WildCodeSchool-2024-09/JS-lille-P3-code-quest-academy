import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../services/GameContext";
import "./GameInstructions.css";

function GameInstructions() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return <div>Error: Context is not available</div>;
  }

  const {
    actualChallenge,
    setActualChallenge,
    user,
    progress,
    fetchUserProgress,
    isButtonEnabled,
    setIsButtonEnabled,
    buttonStyles,
    setButtonStyles,
    setFeedbackMessage,
    setAnswerStyles,
    videoRef,
  } = gameContext;

  //--------------------------------------------------------------------
  // -------------------------BOSS BUTTON-------------------------------
  //-------------appears only when challenge.type = "boss"--------------
  //--------------------------------------------------------------------
  const [bossButtonVisible, setBossButtonVisible] = useState("");

  useEffect(() => {
    if (actualChallenge?.type === "boss") {
      setBossButtonVisible("visible");
    } else {
      setBossButtonVisible("");
    }
  }, [actualChallenge]);

  //---------------------------------------------------------------------
  //--enable the button next for the first challenge as an introduction--
  useEffect(() => {
    if (actualChallenge?.id === 1) {
      setIsButtonEnabled(true);
      setButtonStyles("button-enabled");
    }
  }, [actualChallenge, setIsButtonEnabled, setButtonStyles]);

  //--------------------------------------------------------------------
  // ----------------------BOSS LAUNCH BUTTON---------------------------
  //--------------------------------------------------------------------
  const handleLaunchBoss = () => {
    if (videoRef) {
      videoRef.current?.play(); //We use useRef in the context to access the video element
    }
    setBossButtonVisible("");
    setIsButtonEnabled(true);
    setButtonStyles("button-enabled");
  };

  //--------------------------------------------------------------------
  // --------------------------NEXT BUTTON------------------------------
  //-------------increment challenge table when we click----------------
  //--------------------------------------------------------------------
  const handleProgressUpdate = async () => {
    setFeedbackMessage("");
    setIsButtonEnabled(false);
    setButtonStyles("");
    setAnswerStyles("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/progress/${user?.id}/${
          progress?.room_id
        }/${progress?.challenge_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        throw new Error("Échec de la mise à jour du progrès");
      }

      const newChallenge = await response.json();

      // Force reloading actualChallenge with the incrementation of challenge (put)
      setActualChallenge(newChallenge);

      await fetchUserProgress();
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour ou récupération du progrès :",
        error,
      );
    }
  };

  //--------------------------------------------------------------------
  // ------------------------HINT CONTAINER-----------------------------
  //--------------Set the hint container visible onclick----------------
  //--------------------------------------------------------------------
  const [hintVisibility, setHintVisibility] = useState("");
  const [isHintVisible, setIsHintVisible] = useState(false);

  const handleHintVisibility = () => {
    if (isHintVisible === false) {
      setHintVisibility("hint-visible");
      setIsHintVisible(true);
    } else {
      setHintVisibility("");
      setIsHintVisible(false);
    }
  };
  //--------------------------------------------------------------------

  return (
    <>
      {/* check if actualChallenge exist to display the content */}
      {/* replace "if (!actualChallenge)" */}
      {actualChallenge && (
        <div className="instructions-container">
          <p className="instructions-text">
            {actualChallenge.guideline
              ? actualChallenge.guideline
              : "No guidelines available"}
          </p>
          <button
            className={`instructions-button ${buttonStyles}`}
            onClick={handleProgressUpdate}
            type="button"
            disabled={!isButtonEnabled}
          >
            Suivant
          </button>
          <button
            className={`boss-button ${bossButtonVisible}`}
            type="button"
            onClick={handleLaunchBoss}
          >
            Lancer le combat
          </button>
          <p className={`hint-container ${hintVisibility}`}>
            {actualChallenge?.hint}
          </p>
          <img
            className="help-img"
            src="./src/assets/images/fantine.png"
            alt="Fantine la formatrice"
            onClick={handleHintVisibility}
            onKeyUp={handleHintVisibility}
          />
        </div>
      )}
    </>
  );
}

export default GameInstructions;
