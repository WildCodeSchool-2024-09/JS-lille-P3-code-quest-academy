import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import sprite from "../../assets/images/sprite-admin-page (1).png";
import EditInformations from "../../components/forms/EditInformations";
import EditTeacher from "../../components/forms/EditTeachers";
import SelfEditChallenge from "../../components/forms/SelfEditChallenge";
import Logout from "../../components/logout/Logout";
import { UserContext } from "../../services/UserContext";
import "./ProfilPage.css";
import { GameContext } from "../../services/GameContext";

function ProfilPage() {
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
  const [challengeId, setChallengeId] = useState(progress?.challenge_id);
  const [showTeacherPopup, setShowTeacherPopup] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showProgressPopup, setShowProgressPopup] = useState(false);
  const [popupLogout, setPopupLogout] = useState(false);

  useEffect(() => {
    setUsername(user?.username);
    setEmail(user?.email);
    setFirstTeacher(user?.firstTeacher);
    setSecondTeacher(user?.secondTeacher);
    setChallengeId(progress?.challenge_id);
  }, [user, progress]);

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

  const updateChallenge = (newChallengeId: number) => {
    setChallengeId(newChallengeId);
    setShowProgressPopup(false);
  };

  return (
    <>
      <header className="profil-header">
        <img src={logo} alt="Logo" className="logo" />
        <img src={sprite} alt="" className="sprite-admin-page" />
        <button
          type="button"
          className="button-type1 logout-button"
          onClick={() => setPopupLogout(true)}
        >
          Déconnexion
        </button>
      </header>

      {popupLogout && (
        <section className="logout-popup-container">
          <Logout closePopupLogout={() => setPopupLogout(false)} />
        </section>
      )}

      <main className="main-container">
        {/* LEFT SIDE */}
        <section className="left-side">
          <article className="article artcile1">
            <h2 className="pseudo">
              Pseudo : {username} <br /> Email : {email}
            </h2>
            <h2 className="password">Mot de passe : {password}</h2>
          </article>

          <article className="article article2">
            <button
              type="button"
              className="button-type2"
              onClick={() => setShowInfoPopup(true)}
            >
              Modifier mes informations
            </button>
          </article>

          <article className="article article3">
            <h2 className="profil-teacher">
              Pseudo formateur 1 : {firstTeacher} <br />
              Pseudo formateur 2 : {secondTeacher}
            </h2>
          </article>

          <article className="article article4">
            <button
              type="button"
              className="button-type2"
              onClick={() => setShowTeacherPopup(true)}
            >
              Modifier mes formateurs
            </button>
          </article>
        </section>

        {/* RIGHT SIDE */}

        <section className="right-side">
          <article className="article article1">
            <h2 className="level-quest">
              Salle : {actualChallenge?.room_id} | Question : {challengeId}
            </h2>
          </article>

          <article className="article article2">
            <button
              type="button"
              className="button-type2"
              onClick={() => setShowProgressPopup(true)}
            >
              Modifier ma progression
            </button>
          </article>

          <article className="article article3" />

          <article className="article article4">
            <button
              type="button"
              className="button-type1"
              onClick={() => navigate("/game")}
            >
              Jouer
            </button>
          </article>
        </section>
      </main>

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
              className="close-form-button"
              onClick={() => setShowInfoPopup(false)}
            >
              ×
            </button>
            <EditInformations updateUserInformation={updateUserInfo} />
          </div>
        </div>
      )}

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
              className="close-form-button"
              onClick={() => setShowTeacherPopup(false)}
            >
              ×
            </button>
            <EditTeacher updateTeacherInformation={updateTeachers} />
          </div>
        </div>
      )}

      {showProgressPopup && (
        <div
          className="popup-overlay"
          onClick={() => setShowProgressPopup(false)}
          onKeyUp={(e) => e.key === "Escape" && setShowProgressPopup(false)}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            onKeyUp={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close-form-button"
              onClick={() => setShowProgressPopup(false)}
            >
              ×
            </button>
            <SelfEditChallenge updateChallenge={updateChallenge} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilPage;
