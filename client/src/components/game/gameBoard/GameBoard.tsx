import "./GameBoard.css";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../services/Context";

function GameBoard() {
  const Navigate = useNavigate();
  //Importation du contexte
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  //Importation des variables du contexte utilisées sur la page
  const { challenge, currentIndex, room1Status, setCurrentIndex } = context;
  const [room, setRoom] = useState("./src/assets/images/game-background.jpeg");
  const [roomStyle, setRoomStyle] = useState("");

  const handleRoom = () => {
    setCurrentIndex(currentIndex + 1);
    setRoom("./src/assets/images/html-room.png");
    setRoomStyle("html room");
    setTimeout(() => Navigate("/game/room1"), 0);
  };

  return (
    <>
      {challenge[currentIndex]?.title === "HTML" ? (
        <div className={`gameboard-container ${roomStyle}`}>
          <img className="game-img" src={room} alt="plateau de jeu" />
        </div>
      ) : challenge[currentIndex]?.title === "Boss" ? (
        <div className="gameboard-container">
          <img
            src="../src/assets/images/boss-html.gif"
            alt="plateau de jeu"
            className="game-img"
          />
        </div>
      ) : (
        <div className={`gameboard-container ${roomStyle}`}>
          <img className="game-img" src={room} alt="plateau de jeu" />
          {/* Éléments superposés pour selectionner la salle */}
          <div className="overlay-item item1" />
          <div className="overlay-item item2" />
          <div className="overlay-item item3" />
          <div className="overlay-item item4" />
          <div className="overlay-item item5" />
          <div
            className={`overlay-item item6 ${room1Status}`}
            onClick={handleRoom}
            onKeyDown={handleRoom}
          />
          <div className="overlay-item item7" />
          <div className="overlay-item item8" />
          <div className="overlay-item item9" />
        </div>
      )}
    </>
  );
}

export default GameBoard;
