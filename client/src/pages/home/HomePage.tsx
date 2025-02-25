import { useState } from "react";
import "./HomePage.css";
import LoginForm from "../../components/forms/LoginForm";
import SignupForm from "../../components/forms/SignupForm";
import trainerlogo from "./../../assets/images/SoufianeetFantine.png";

// Type for the active form
type activeForm = "login" | "signup" | null;

function HomePage() {
  // Manage the active form to display login, signup or nothing and the close button
  const [activeForm, setActiveForm] = useState<activeForm>(null);
  const closeForm = () => setActiveForm(null);

  return (
    <section className="homepage">
      <header className="homepage-logo-container">
        <img
          className="homepage-logo"
          src="./src/assets/images/logo.svg"
          alt="Code Quest Academy"
        />
      </header>
      <article className="homepage-text">
        <div className="text-content">
          <img
            src={trainerlogo}
            alt="Soufiane et Fantine"
            className="soufiane-fantine"
          />
          <p className="text-homepage">
            Code Quest Academy est un jeu où vous progressez en résolvant des
            énigmes de programmation. Vous serez testé sur plusieurs langages
            tout au long de l'aventure avec des questions à la complexité
            variable. Transformez l’apprentissage du code en une aventure épique
            et devenez un maître du développement !
          </p>
        </div>
      </article>
      <section className="homepage-buttons-container">
        <button
          type="button"
          className="button-type1 homepage-button login-button"
          onClick={() => setActiveForm("login")}
        >
          Connexion
        </button>
        <button
          type="button"
          className="button-type2 homepage-button register-button"
          onClick={() => setActiveForm("signup")}
        >
          Inscription
        </button>
      </section>

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

      <footer className="homepage-footer">
        Développé par les dev's de la{/**/}
        <a
          href="https://www.wildcodeschool.com/"
          className="wcs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wild Code School
        </a>
      </footer>
    </section>
  );
}

export default HomePage;
