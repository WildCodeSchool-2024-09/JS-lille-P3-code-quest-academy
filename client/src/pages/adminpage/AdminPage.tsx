import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import sprite from "../../assets/images/sprite-admin-page (1).png";
import EditInformations from "../../components/forms/EditInformations";
import EditTeacher from "../../components/forms/EditTeachers";
import Logout from "../../components/logout/Logout";
import "./AdminPage.css";
import { GameContext } from "../../services/GameContext";
import { UserContext } from "../../services/UserContext";

function AdminPage() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const gameContext = useContext(GameContext);

  if (!userContext?.user || !gameContext?.actualChallenge) {
    return <div>Loading...</div>;
  }

  const { user, progress } = userContext;
  const { actualChallenge } = gameContext;

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("********");
  const [firstTeacher, setFirstTeacher] = useState(user.firstTeacher);
  const [secondTeacher, setSecondTeacher] = useState(user.secondTeacher);

  const [showTeacherPopup, setShowTeacherPopup] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [popupLogout, setPopupLogout] = useState(false);

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setFirstTeacher(user.firstTeacher);
    setSecondTeacher(user.secondTeacher);
  }, [user]);

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

  const updateTeachers = (newTeacher1: string, newTeacher2: string) => {
    setFirstTeacher(newTeacher1);
    setSecondTeacher(newTeacher2);
    setShowTeacherPopup(false);
  };

  return (
    <div className="Admin-page">
      <div className="Admin-header">
        <img src={logo} alt="Logo" className="logo" />
        <img
          src={sprite}
          alt="Sprite Admin Page"
          className="sprite-admin-page"
        />
      </div>

      <button
        type="button"
        className="logout-button"
        onClick={() => setPopupLogout(true)}
      >
        Déconnexion
      </button>

      {popupLogout && (
        <section className="logout-popup-container">
          <Logout closePopupLogout={() => setPopupLogout(false)} />
        </section>
      )}

      <div className="left-and-right-side">
        <div className="left-side">
          <h2 className="level-quest">
            ROOM : {actualChallenge.room_id} | CHALLENGE :{" "}
            {progress?.challenge_id}
          </h2>
          <button
            type="button"
            className="gestion-button"
            onClick={() => navigate("/admin/manage")}
          >
            Gestion des Utilisateurs
          </button>
          <button
            type="button"
            className="information-button"
            onClick={() => navigate("/Admine/information")}
          >
            Mes informations
          </button>
          <h1 className="first-pseudo">PSEUDO FORMATEUR 1 : {firstTeacher}</h1>
          <h1 className="second-pseudo">
            PSEUDO FORMATEUR 2 : {secondTeacher}
          </h1>
          <button
            type="button"
            className="left-modification-button"
            onClick={() => setShowTeacherPopup(true)}
          >
            Modifier mes formateurs
          </button>
        </div>

        <div className="right-side">
          <button
            type="button"
            className="button-modification-photo"
            onClick={() => navigate("/Admine/modification-photo")}
          >
            MODIFIER MA PHOTO DE Admin
          </button>
          <h1 className="pseudo">PSEUDO: {username}</h1>
          <h1 className="password">MOT DE PASSE: {password}</h1>
          <h1 className="email">EMAIL: {email}</h1>
          <button
            type="button"
            className="right-modification-button"
            onClick={() => setShowInfoPopup(true)}
          >
            Modifier mes informations
          </button>
          <button
            type="button"
            className="game-button"
            onClick={() => navigate("/game")}
          >
            Jouer
          </button>
        </div>
      </div>

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
    </div>
  );
}

export default AdminPage;
