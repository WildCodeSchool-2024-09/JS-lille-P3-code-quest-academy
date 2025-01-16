import "./GameProfil.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../services/UserContext";

function GameProfil() {
  const navigate = useNavigate();

  const context = useContext(UserContext);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  return (
    <>
      <div className="profil-container">
        <div className="profil-text">
          <h2>username</h2>
          <p>Level</p>
          <button
            className="profil-button"
            type="button"
            onClick={() => navigate("/welcome")}
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
