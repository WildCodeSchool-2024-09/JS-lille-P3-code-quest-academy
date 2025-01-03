import "./Game.css";
import GameBoard from "../../components/gameBoard/GameBoard";
import GameCommands from "../../components/gameCommands/GameCommands";
import GameInstructions from "../../components/gameInstructions/GameInstructions";
import GameProfil from "../../components/gameProfil/GameProfil";

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
