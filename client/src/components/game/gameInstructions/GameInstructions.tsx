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

  const [bossButtonVisible, setBossButtonVisible] = useState("");

  useEffect(() => {
    if (actualChallenge?.type === "boss") {
      setBossButtonVisible("visible");
    } else {
      setBossButtonVisible("");
    }
  }, [actualChallenge]);

  useEffect(() => {
    if (actualChallenge?.id === 1) {
      setIsButtonEnabled(true);
      setButtonStyles("button-enabled");
    }
  }, [actualChallenge, setIsButtonEnabled, setButtonStyles]);

  const handleLaunchBoss = () => {
    if (videoRef) {
      videoRef.current?.play(); //We use useRef in the context to access the video element
    }
    setBossButtonVisible("");
    setIsButtonEnabled(true);
    setButtonStyles("button-enabled");
  };

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

  return (
    <>
      {/* check if actualChallenge exist to display the content */}
      {/* replace "if (!actualChallenge)" */}
      {actualChallenge && (
        <div className="instructions-container">
          challenge id :{actualChallenge.id} <br />
          room id : {actualChallenge.room_id}
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
          <img
            className="help-img"
            src="./src/assets/images/fantine.png"
            alt="Fantine la formatrice"
          />
        </div>
      )}
    </>
  );
}

export default GameInstructions;
