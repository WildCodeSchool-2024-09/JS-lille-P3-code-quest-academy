import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../services/UserContext";
import "./Logout.css";

interface closePopupLogoutProps {
  closePopupLogout: () => void;
}

function Logout({ closePopupLogout }: closePopupLogoutProps) {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  if (!userContext) {
    throw new Error("UserContext is null");
  }
  const { setUser } = userContext;

  const confirmLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <section className="logout-form">
      <h2>Voulez-vous vraiment vous déconnecter ?</h2>
      <section className="logout-buttons-container">
        <button type="button" className="logout-button" onClick={confirmLogout}>
          Se déconnecter
        </button>
        <button
          type="button"
          className="cancel-logout-button"
          onClick={closePopupLogout}
        >
          Annuler
        </button>
      </section>
    </section>
  );
}

export default Logout;
