import "../GameBoard.css";
import { useState } from "react";
import { useContext, useEffect } from "react";
import bossHtml from "../../../../assets/images/boss-html.gif";
import htmlBackground from "../../../../assets/images/html-room.png";
import { Context } from "../../../../services/Context";

function Boss() {
  //Importation du contexte
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  //Importation des variables du contexte utilisées sur la page
  const { challenge, currentIndex } = context;

  const [bossImg, setBossImg] = useState(htmlBackground);

  //Fais apparaitre le gif du boss pendant 13s puis remet l'image d'origine
  useEffect(() => {
    if (challenge[currentIndex]?.id === 8) {
      setBossImg(bossHtml);
      setTimeout(() => {
        setBossImg(htmlBackground);
        alert("Tu as vaincu le boss  HTML! clique sur suivant pour continuer");
      }, 13000);
    }
  }, [challenge, currentIndex]);

  return (
    <>
      <div className="gameboard-container">
        <img className="game-img" src={bossImg} alt="plateau de jeu" />
      </div>
    </>
  );
}

export default Boss;
