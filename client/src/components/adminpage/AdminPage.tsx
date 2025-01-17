import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import sprite from "../../assets/images/sprite-admin-page (1).png";
import EditInformations from "../../components/forms/EditInformations";
import EditTeacher from "../../components/forms/EditTeachers";
import "./AdminPage.css";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  teacher_1: string;
  teacher_2: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Chargement...");
  const [email, setEmail] = useState("Chargement...");
  const [password, setPassword] = useState("********");
  const [teacher_1, setTeacher_1] = useState("Chargement...");
  const [teacher_2, setTeacher_2] = useState("Chargement...");
  const [showTeacherPopup, setShowTeacherPopup] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const userId = 1;
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accounts/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        return response.json();
      })
      .then((data: User) => {
        setUsername(data.username);
        setEmail(data.email);
        setPassword(data.password);
        setTeacher_1(data.teacher_1);
        setTeacher_2(data.teacher_2);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        alert("Impossible de charger les informations utilisateur.");
      });
  }, []);

  const handleClosePopup = () => {
    setShowTeacherPopup(false);
    setShowInfoPopup(false);
  };

  return (
    <div className="admin-page">
      {/* En-tête */}
      <div className="admin-header">
        <img src={logo} alt="Logo" className="logo" />
        <img
          src={sprite}
          alt="sprite-admin-page"
          className="sprite-admin-page"
        />
      </div>

      <div className="left-and-right-side">
        {/* Colonne gauche */}
        <div className="left-side">
          <h2 className="level-quest">Level 2 Quête 3</h2>
          <button
            type="button"
            className="gestion-button"
            onClick={() => navigate("/profile/admin/manage")}
          >
            Gestion des Utilisateurs
          </button>
          <button
            type="button"
            className="information-button"
            onClick={() => navigate("/profile/information")}
          >
            Mes informations
          </button>
          <h1 className="first-pseudo">PSEUDO FORMATEUR 1 : {teacher_1}</h1>
          <h1 className="second-pseudo">PSEUDO FORMATEUR 2 : {teacher_2}</h1>
          <button
            type="button"
            className="left-modification-button"
            onClick={() => setShowTeacherPopup(true)}
          >
            Modifier mes formateurs
          </button>
        </div>

        {/* Colonne droite */}
        <div className="right-side">
          <button
            type="button"
            className="button-modification-photo"
            onClick={() => navigate("/profile/admin/upload")}
          >
            MODIFIER MA PHOTO DE PROFIL
          </button>
          <h1 className="pseudo">PSEUDO : {username}</h1>
          <h1 className="password">
            MOT DE PASSE : <span>{password}</span>
          </h1>
          <h1 className="email">EMAIL : {email}</h1>
          <button
            type="button"
            className="right-modification-button"
            onClick={() => setShowInfoPopup(true)}
          >
            Modifier mes informations
          </button>
        </div>
      </div>
      {showTeacherPopup && (
        <div
          className="popup-overlay"
          onClick={handleClosePopup}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleClosePopup();
            }
          }}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            onKeyUp={(e) => {
              if (e.key === "Escape") {
                handleClosePopup();
              }
            }}
          >
            <button
              type="button"
              className="close-button"
              onClick={handleClosePopup}
            >
              ×
            </button>
            <EditTeacher />
          </div>
        </div>
      )}

      {/* Modale pour modifier les informations */}
      {showInfoPopup && (
        <div
          className="popup-overlay"
          onClick={handleClosePopup}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleClosePopup();
            }
          }}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            onKeyUp={(e) => {
              if (e.key === "Escape") {
                handleClosePopup();
              }
            }}
          >
            <button
              type="button"
              className="close-button"
              onClick={handleClosePopup}
            >
              ×
            </button>
            <EditInformations />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
