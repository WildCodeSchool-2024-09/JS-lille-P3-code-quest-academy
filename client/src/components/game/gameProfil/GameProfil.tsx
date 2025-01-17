import "./GameProfil.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../services/UserContext";

function GameProfil() {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Error: Context is not available</div>;
  }

  const { account, progress } = userContext;

  return (
    <>
      <div className="profil-container">
        <div className="profil-text">
          <h2>{account?.[0]?.username}</h2>
          <p>Niveau {progress?.[0]?.level}</p>
          <button
            className="profil-button"
            type="button"
            onClick={() => navigate("/profile")}
          >
            Accueil
          </button>
        </div>
        <img
          className="profil-img"
          src="./src/assets/images/profil.png"
          alt="avatar boy"
        />
      </div>
    </>
  );
}

export default GameProfil;
