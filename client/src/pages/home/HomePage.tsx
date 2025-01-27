import { useState } from "react";
import "./HomePage.css";
import LoginForm from "../../components/forms/LoginForm";
import SignupForm from "../../components/forms/SignupForm";

// Type for the active form
type activeForm = "login" | "signup" | null;

function HomePage() {
  // Manage the active form to display login, signup or nothing and the close button
  const [activeForm, setActiveForm] = useState<activeForm>(null);
  const closeForm = () => setActiveForm(null);

  return (
    <div className="home-page">
      <div className="logo-container">
        <img
          className="logo"
          src="./src/assets/images/logo.svg"
          alt="Code Quest Academy"
        />
      </div>
      <div className="home-page-text">
        <p>
          Code Quest Academy est un jeu où vous progressez en résolvant des
          énigmes de programmation. Vous serez testé sur plusieurs langages tout
          au long de l'aventure avec des questions à la complexité variable.
          Transformez l’apprentissage du code en une aventure épique et devenez
          un maître du développement !
        </p>
      </div>
      <div className="home-page-buttons-container">
        <button
          type="button"
          className="sign-in-button"
          onClick={() => setActiveForm("login")}
        >
          Connexion
        </button>
        <button
          type="button"
          className="subscribe-button"
          onClick={() => setActiveForm("signup")}
        >
          Inscription
        </button>
      </div>

      {activeForm === "login" && (
        <div className="form-container">
          <LoginForm closeForm={closeForm} />
        </div>
      )}
      {activeForm === "signup" && (
        <div className="form-container">
          <SignupForm closeForm={closeForm} />
        </div>
      )}

      <div className="home-page-footer">
        Développé par les dev's de la {/**/}
        <a
          href="https://www.wildcodeschool.com/"
          className="wcs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wild Code School
        </a>
      </div>
    </div>
  );
}

export default HomePage;
