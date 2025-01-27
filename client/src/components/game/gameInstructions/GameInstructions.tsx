import { useContext } from "react";
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
    setProgress,
    isButtonEnabled,
    setIsButtonEnabled,
    buttonStyles,
    setButtonStyles,
    setFeedbackMessage,
    setAnswerStyles,
  } = gameContext;

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

      // Forcer le rechargement via une réinitialisation du contexte ou des dépendances
      setActualChallenge(newChallenge);

      // Recharge le contexte utilisateur
      await fetchUserProgress();
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour ou récupération du progrès :",
        error,
      );
    }
  };

  const fetchUserProgress = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/progress/${user?.id}`,
      );

      const progressData = await response.json();
      setProgress(progressData);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la progression :",
        error,
      );
    }
  };

  return (
    <>
      {/* verifie si actualChallenge existe pour afficher le reste */}
      {/* remplace le if (!actualChallenge) */}
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
