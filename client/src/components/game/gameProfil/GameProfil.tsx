import "./GameProfil.css";
import { Context } from "../../../services/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function GameProfil() {

  let navigate = useNavigate();

  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  const {
    account,
    progress,
  } = context;

  return (
    <>
      <div className="profil-container">
        <div className="profil-text">
          <h2>{account[1]?.username}</h2>
          <p>Level {progress[1]?.level}</p>
          <button className="profil-button" type="button" onClick={() => navigate("/welcome")}>
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
