import "./GameBoard.css";
import { useState } from "react";

function GameBoard() {
  const [room, setRoom] = useState("./src/assets/images/game-background.jpeg");
  const [roomStyle, setRoomStyle] = useState("");

  const handleRoom = () => {
    setRoom("./src/assets/images/html-room.png");
    setRoomStyle("html room");
  };

  return (
    <>
      <div className={`gameboard-container ${roomStyle}`}>
        <img className="game-img" src={room} alt="plateau de jeu" />
        {/* Éléments superposés pour selectionner la salle */}
        <div className="overlay-item item1" />
        <div className="overlay-item item2" />
        <div className="overlay-item item3" />
        <div className="overlay-item item4" />
        <div className="overlay-item item5" />
        <div className="overlay-item item6" onClick={handleRoom} onKeyDown={handleRoom} />
        <div className="overlay-item item7" />
        <div className="overlay-item item8" />
        <div className="overlay-item item9" />
      </div>
    </>
  );
}

export default GameBoard;
