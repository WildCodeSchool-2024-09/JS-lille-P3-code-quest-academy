import "./AdminPage.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/logo.svg";
import sprite from "../../assets/images/sprite-admin-page (1).png";

function AdminPage() {
  const navigate = useNavigate();
  return (
    <div className="admin-page">
      <div className="admin-header">
        <img src={logo} alt="Logo" className="logo" />
        <img
          src={sprite}
          alt="sprite-admin-page"
          className="sprite-admin-page"
        />
      </div>
      <div className="left-and-right-side">
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
          <h1 className="first-pseudo">PSEUDO FORMATEUR 1 : XXXXXX</h1>
          <h1 className="second-pseudo">PSEUDO FORMATEUR 2 : XXXXXX</h1>
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
          <h1 className="pseudo">PSEUDO: XXXXXX</h1>
          <h1 className="password">MOT DE PASSE: XXXXX</h1>
          <h1 className="email">EMAIL: XXXXXX</h1>
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
export default AdminPage;
