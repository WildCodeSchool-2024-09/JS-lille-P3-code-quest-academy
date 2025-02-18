import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import sprite from "../../assets/images/sprite-admin-page (1).png";
import EditInformations from "../../components/forms/EditInformations";
import EditTeacher from "../../components/forms/EditTeachers";
import Logout from "../../components/logout/Logout";
import "./ProfilPage.css";
import { GameContext } from "../../services/GameContext";
import { UserContext } from "../../services/UserContext";

function AdminPage() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const gameContext = useContext(GameContext);

  if (!userContext || !gameContext) {
    return <div>Loading...</div>;
  }

  const { user, progress } = userContext;
  const { actualChallenge } = gameContext;
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("********");
  const [firstTeacher, setFirstTeacher] = useState(user?.firstTeacher);
  const [secondTeacher, setSecondTeacher] = useState(user?.secondTeacher);
  const [showTeacherPopup, setShowTeacherPopup] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [popupLogout, setPopupLogout] = useState(false);

  useEffect(() => {
    setUsername(user?.username);
    setEmail(user?.email);
    setFirstTeacher(user?.firstTeacher);
    setSecondTeacher(user?.secondTeacher);
  }, [user]);

  const updateTeachers = (newTeacher1: string, newTeacher2: string) => {
    setFirstTeacher(newTeacher1);
    setSecondTeacher(newTeacher2);
    setShowTeacherPopup(false);
  };

  const updateUserInfo = (
    newUsername: string,
    newEmail: string,
    newPassword: string,
  ) => {
    setUsername(newUsername);
    setEmail(newEmail);
    setPassword(newPassword || "********");
    setShowInfoPopup(false);
  };

  return (
    <section className="admin-page">
      <header className="profil-header">
        <img src={logo} alt="Logo" className="logo" />
        <img src={sprite} alt="" className="sprite-admin-page" />
      </header>

      <button
        type="button"
        className="button-type1 logout-button"
        onClick={() => setPopupLogout(true)}
      >
        Déconnexion
      </button>

      {popupLogout && (
        <section className="logout-popup-container">
          <Logout closePopupLogout={() => setPopupLogout(false)} />
        </section>
      )}

      <section className="left-and-right-side">
        <article className="left-side">
          <h2 className="level-quest">
            Salle : {actualChallenge?.room_id} | Question :{" "}
            {progress?.challenge_id}
          </h2>
          <button
            type="button"
            className="button-type2 gestion-button"
            onClick={() => navigate("/admin/manage")}
          >
            Gestion des Utilisateurs
          </button>
          <h2 className="first-pseudo">PSEUDO FORMATEUR 1 : {firstTeacher}</h2>
          <h2 className="second-pseudo">
            PSEUDO FORMATEUR 2 : {secondTeacher}
          </h2>
          <button
            type="button"
            className="button-type2 left-modification-button"
            onClick={() => setShowTeacherPopup(true)}
          >
            Modifier mes formateurs
          </button>
        </article>

        <article className="right-side">
          <button
            type="button"
            className="button-type2 button-modification-challenge"
          >
            MODIFIER MA PROGRESSION
          </button>
          <h2 className="pseudo">PSEUDO: {username}</h2>
          <h2 className="password">MOT DE PASSE: {password}</h2>
          <h2 className="email">EMAIL: {email}</h2>
          <button
            type="button"
            className="button-type2 right-modification-button"
            onClick={() => setShowInfoPopup(true)}
          >
            Modifier mes informations
          </button>
          <button
            type="button"
            className="button-type1 game-button"
            onClick={() => navigate("/game")}
          >
            Jouer
          </button>
        </article>
      </section>

      {showTeacherPopup && (
        <div
          className="popup-overlay"
          onClick={() => setShowTeacherPopup(false)}
          onKeyUp={(e) => e.key === "Escape" && setShowTeacherPopup(false)}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            onKeyUp={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close-button"
              onClick={() => setShowTeacherPopup(false)}
            >
              ×
            </button>
            <EditTeacher updateTeacherInformation={updateTeachers} />
          </div>
        </div>
      )}

      {showInfoPopup && (
        <div
          className="popup-overlay"
          onClick={() => setShowInfoPopup(false)}
          onKeyUp={(e) => e.key === "Escape" && setShowInfoPopup(false)}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            onKeyUp={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close-button"
              onClick={() => setShowInfoPopup(false)}
            >
              ×
            </button>
            <EditInformations updateUserInformation={updateUserInfo} />
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminPage;
