import "./GameProfil.css";
import { useContext } from "react";
import { Context } from "../../../services/Context";

function GameProfil() {
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  const { account, progress } = context;

  return (
    <>
      <div className="profil-container">
        <div className="profil-text">
          <h2>{account[1]?.username}</h2>
          <p>Level {progress[1]?.level}</p>
          <button className="profil-button" type="button">
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
