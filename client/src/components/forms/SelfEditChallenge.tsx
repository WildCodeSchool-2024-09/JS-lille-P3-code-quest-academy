import { useContext, useState } from "react";
import { UserContext } from "../../services/UserContext";
import "./SelfEditChallenge.css";

type UpdateChallengeProps = {
  updateChallenge: (newChallengeId: number) => void;
};

function SelfEditChallenge({ updateChallenge }: UpdateChallengeProps) {
  const [newChallengeId, setNewChallengeId] = useState("");
  const userContext = useContext(UserContext);

  const userId = userContext?.user?.id;

  const handleChangeProgress = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId || !newChallengeId) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/selfupdate/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ challengeId: newChallengeId }),
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du challenge");
      }

      // Typage en cas de valeures nulles
      const updatedProgress = {
        ...userContext.progress,
        challenge_id: Number(newChallengeId),
        id: userContext.progress?.id || 0,
        user_id: userContext.progress?.user_id || 0,
        room_id: userContext.progress?.room_id || 0,
      };

      userContext.setProgress(updatedProgress); // Met à jour directement

      updateChallenge(Number(newChallengeId));
      setNewChallengeId("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form
        className="form-update-challenge"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="UpdateChallenge" className="update-challenge-label">
          Choisi ta progression
        </label>
        <select
          className="form-update-challenge"
          value={newChallengeId}
          onChange={(e) => setNewChallengeId(e.target.value)}
        >
          <option value="">Sélectionne une progression</option>
          <option value="1">Recommencer le jeu</option>
          <option value="3">Début de la salle HTML</option>
          <option value="8">Combat contre : Le Seigneur des Balises</option>
          <option value="10">Début de la salle CSS</option>
          <option value="15">Combat contre : Gridzilla</option>
          <option value="17">Début de la salle JS</option>
          <option value="24">Combat contre : DOM-inator</option>
          <option value="26">Début de la salle REACT</option>
          <option value="31">Combat contre : Captain Hook</option>
          <option value="33">Début de la salle Node</option>
          <option value="38">Combat contre : Nodeferatus</option>
          <option value="40">Début de la salle SQL</option>
          <option value="46">Combat contre : JOIN Snow</option>
          <option value="48">Combat contre : Le Recruteur</option>
        </select>
        <button
          type="button"
          className="button-type1"
          onClick={handleChangeProgress}
        >
          Mettre à jour
        </button>
      </form>
    </>
  );
}

export default SelfEditChallenge;
