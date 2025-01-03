import "./Game.css";
import GameBoard from "../../components/gameBoard/GameBoard";
import GameInstructions from "../../components/gameInstructions/GameInstructions";
import GameProfil from "../../components/gameProfil/GameProfil";
import GameCommands from "../../components/gameCommands/GameCommands";

function Game() {
  return (
    <>
    <div className="game-page">
      <GameBoard />
      <GameProfil />
      <GameInstructions />
      <GameCommands />
    </div>
    </>
  );
}

export default Game;
