import "./HomePage.css";

import ConnexionButton from "../../components/buttons/SignInButton";
import SubscribeButton from "../../components/buttons/SubscribeButton";
import LoginForm from "../../components/forms/LoginForm";

function HomePage() {
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
          énigmes de programmation, avec des requêtes SQL, pour débloquer des
          compétences et affronter des défis de plus en plus complexes.
          Transformez l’apprentissage du code en une aventure épique et devenez
          un maître du développement !
        </p>
      </div>
      <div className="home-page-buttons-container">
        <ConnexionButton />
        <SubscribeButton />
      </div>
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
      <LoginForm />
    </div>
  );
}

export default HomePage;
