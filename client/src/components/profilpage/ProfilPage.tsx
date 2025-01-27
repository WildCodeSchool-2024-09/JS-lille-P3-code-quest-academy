import { useContext } from "react";
import { GameContext } from "../../services/GameContext";
import { UserContext } from "../../services/UserContext";
import "./ProfilPage.css";
import { useNavigate } from "react-router-dom";

function ProfilPage() {
  const userContext = useContext(UserContext);
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    throw new Error("GameContext is null");
  }

  if (!userContext) {
    throw new Error("UserContext is null");
  }
  const { user, progress } = userContext;
  const { actualChallenge } = gameContext;

  const navigate = useNavigate();

  return (
    <div className="profil-page">
      <div className="profile-header">
        <img src="./public/logo.svg" alt="Logo" className="logo" />
        <img
          src=".\src\assets\images\sprite-admin-page (1).png"
          alt="sprite-admin-page"
          className="sprite-admin-page"
        />
      </div>
      <div className="left-and-right-side">
        <div className="left-side">
          <h2 className="level-quest">
            {" "}
            ROOM : {actualChallenge?.room_id} CHALLENGE :{" "}
            {progress?.challenge_id}
          </h2>

          <button
            type="button"
            className="information-button"
            onClick={() => navigate("/profile/information")}
          >
            Mes informations
          </button>
          <button type="button" onClick={() => navigate("/game")}>
            game
          </button>
          <h1 className="first-pseudo">
            PSEUDO FORMATEUR 1 : {user?.teacher_1}{" "}
          </h1>
          <h1 className="second-pseudo">
            PSEUDO FORMATEUR 2 : {user?.teacher_2}
          </h1>
          <button
            type="button"
            className="left-modification-button"
            onClick={() => navigate("/profile/modification-trainers")}
          >
            Modifier mes formateurs
          </button>
        </div>
        <div className="right-side">
          <button
            type="button"
            className="button-modification-photo"
            onClick={() => navigate("/profile/modification-photo")}
          >
            MODIFIER MA PHOTO DE PROFIL
          </button>
          <h1 className="pseudo">PSEUDO: {user?.username}</h1>
          <h1 className="password">MOT DE PASSE: XXXXX</h1>
          <h1 className="email">EMAIL: {user?.email}</h1>
          <button
            type="button"
            className="right-modification-button"
            onClick={() => navigate("/profile/modification-information")}
          >
            Modifier mes informations
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfilPage;
