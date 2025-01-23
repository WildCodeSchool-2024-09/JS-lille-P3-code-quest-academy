import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import sprite from "../../assets/images/sprite-admin-page (1).png";
import EditInformations from "../../components/forms/EditInformations";
import EditTeacher from "../../components/forms/EditTeachers";
import "./ProfilPage.css";

// Type pour les données utilisateur
type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  teacher_1: string;
  teacher_2: string;
};

function ProfilPage() {
  const navigate = useNavigate(); // Permet la navigation vers d'autres pages
  const [username, setUsername] = useState("Chargement..."); // État pour le pseudo
  const [email, setEmail] = useState("Chargement..."); // État pour l'email
  const [password, setPassword] = useState("********"); // État pour le mot de passe
  const [teacher_1, setTeacher_1] = useState("Chargement..."); // État pour le formateur 1
  const [teacher_2, setTeacher_2] = useState("Chargement..."); // État pour le formateur 2
  const [showTeacherPopup, setShowTeacherPopup] = useState(false); // État pour afficher ou masquer la popup des formateurs
  const [showInfoPopup, setShowInfoPopup] = useState(false); // État pour afficher ou masquer la popup des informations
  const userId = 1;

  // Chargement des informations utilisateur lors du montage du composant
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accounts/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        return response.json();
      })
      .then((data: User) => {
        // Mise à jour des états avec les données récupérées
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

  // Fonction pour mettre à jour les informations utilisateur
  const updateUserInfo = (
    newUsername: string,
    newEmail: string,
    newPassword: string,
  ) => {
    setUsername(newUsername); // Met à jour le pseudo
    setEmail(newEmail); // Met à jour l'email
    setPassword(newPassword); // Met à jour le mot de passe
    setShowInfoPopup(false); // Ferme la popup des informations
  };

  // Fonction pour mettre à jour les formateurs
  const updateTeachers = (newTeacher1: string, newTeacher2: string) => {
    setTeacher_1(newTeacher1); // Met à jour le formateur 1
    setTeacher_2(newTeacher2); // Met à jour le formateur 2
    setShowTeacherPopup(false); // Ferme la popup des formateurs
  };

  // Fonction pour fermer les popups
  const handleClosePopup = () => {
    setShowTeacherPopup(false);
    setShowInfoPopup(false);
  };

  return (
    <div className="profil-page">
      {/* En-tête de la page avec le logo et le sprite */}
      <div className="profile-header">
        <img src={logo} alt="Logo" className="logo" />
        <img
          src={sprite}
          alt="Sprite Admin Page"
          className="sprite-admin-page"
        />
      </div>

      {/* Contenu principal divisé en deux colonnes */}
      <div className="left-and-right-side">
        {/* Colonne gauche */}
        <div className="left-side">
          <h2 className="level-quest">Level 2 Quête 3</h2>
          <button
            type="button"
            className="information-button"
            onClick={() => navigate("/profile/information")}
          >
            Mes informations
          </button>
          <h2 className="first-pseudo">
            PSEUDO FORMATEUR 1 : <h3>{teacher_1}</h3>
          </h2>
          <h2 className="second-pseudo">
            PSEUDO FORMATEUR 2 : <h3>{teacher_2}</h3>
          </h2>
          <button
            type="button"
            className="left-modification-button"
            onClick={() => setShowTeacherPopup(true)} // Affiche la popup des formateurs
          >
            Modifier mes formateurs
          </button>
        </div>

        {/* Colonne droite */}
        <div className="right-side">
          <button
            type="button"
            className="button-modification-photo"
            onClick={() => navigate("/profile/modification-photo")}
          >
            MODIFIER MA PHOTO DE PROFIL
          </button>
          <h2 className="pseudo">
            PSEUDO:
            <h3>{username}</h3>
          </h2>
          <h2 className="email">
            EMAIL: <h3> {email}</h3>
          </h2>
          <h2 className="password">{password}</h2>
          <button
            type="button"
            className="right-modification-button"
            onClick={() => setShowInfoPopup(true)} // Affiche la popup des informations
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

      {/* Popup pour modifier les formateurs */}
      {showTeacherPopup && (
        <div
          className="popup-overlay"
          onClick={handleClosePopup}
          onKeyUp={(e) => e.key === "Escape" && handleClosePopup()}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            onKeyUp={(e) => e.key === "Escape" && handleClosePopup()}
          >
            <button
              type="button"
              className="close-button"
              onClick={handleClosePopup} // Bouton pour fermer la popup
            >
              ×
            </button>
            <EditTeacher updateTeacherInformation={updateTeachers} />
          </div>
        </div>
      )}

      {/* Popup pour modifier les informations utilisateur */}
      {showInfoPopup && (
        <div
          className="popup-overlay"
          onClick={handleClosePopup}
          onKeyUp={(e) => e.key === "Escape" && handleClosePopup()}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            onKeyUp={(e) => e.key === "Escape" && handleClosePopup()}
          >
            <button
              type="button"
              className="close-button"
              onClick={handleClosePopup}
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

export default ProfilPage;
