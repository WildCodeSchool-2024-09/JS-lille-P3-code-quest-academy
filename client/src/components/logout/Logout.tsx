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
  const { setUser, setToken } = userContext;

  const confirmLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <section
      className="logout-form"
      onClick={closePopupLogout}
      onKeyUp={(e) => e.key === "Escape" && closePopupLogout()}
    >
      <h2>Voulez-vous vraiment vous déconnecter ?</h2>
      <article className="logout-buttons-container">
        <button
          type="button"
          className="logout-form-button"
          onClick={confirmLogout}
        >
          Se déconnecter
        </button>
        <button
          type="button"
          className="cancel-logout-button"
          onClick={closePopupLogout}
        >
          Annuler
        </button>
      </article>
    </section>
  );
}

export default Logout;
