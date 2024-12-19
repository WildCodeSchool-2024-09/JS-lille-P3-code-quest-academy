import "./Game.css";
import GameBoard from "../../components/gameBoard/GameBoard";
import GameProfil from "../../components/gameProfil/GameProfil";
import GameInstructions from "../../components/gameInstructions/GameInstructions";

function Game() {
  return (
    <>
      <GameBoard />
      <GameProfil />
      <GameInstructions />
    </>
  );
}

export default Game;
