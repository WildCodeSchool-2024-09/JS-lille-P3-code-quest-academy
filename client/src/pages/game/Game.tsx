import "./Game.css";
import GameBoard from "../../components/gameBoard/GameBoard";
import GameInstructions from "../../components/gameInstructions/GameInstructions";
import GameProfil from "../../components/gameProfil/GameProfil";

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
