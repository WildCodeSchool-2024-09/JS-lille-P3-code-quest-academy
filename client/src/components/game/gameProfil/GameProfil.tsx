import "./GameProfil.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../../services/GameContext";
import { UserContext } from "../../../services/UserContext";

function GameProfil() {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const gameContext = useContext(GameContext);

  if (!userContext) {
    return <div>Error: userContext is not available</div>;
  }

  if (!gameContext) {
    return <div>Error: gameContext is not available</div>;
  }

  const { user } = userContext;
  const { actualChallenge } = gameContext;

  return (
    <>
      <div className="profil-container">
        <div className="profil-text">
          <h2>{user?.username}</h2>
          <p>Niveau {actualChallenge?.room_id}</p>
          <button
            className="profil-button"
            type="button"
            onClick={() => navigate("/profile")}
          >
            Profil
          </button>
        </div>
        <img
          className="profil-img"
          src="../src/assets/images/profil.png"
          alt="avatar boy"
        />
      </div>
    </>
  );
}

export default GameProfil;
