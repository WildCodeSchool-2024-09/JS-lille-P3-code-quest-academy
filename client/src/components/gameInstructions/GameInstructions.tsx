import "./GameInstructions.css";

function GameInstructions() {
  return (
    <>
      <div className="instructions-container">
        <p className="instructions-text">
          Bienvenue à la Code Quest Academy ! Un mystérieux bug a infecté le
          campus, qui empêche les étudiants de continuer leur apprentissage…
          Aide-nous à Résoudre ce mystère !
        </p>
        <img
          className="help-img"
          src="./src/assets/images/fantine.png"
          alt="Fantine la formatrice"
        />
      </div>
    </>
  );
}

export default GameInstructions;
