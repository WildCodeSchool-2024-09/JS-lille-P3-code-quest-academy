import "./Game.css";
import GameBoard from "../../components/game/gameBoard/GameBoard";
import GameCommands from "../../components/game/gameCommands/GameCommands";
import GameInstructions from "../../components/game/gameInstructions/GameInstructions";
import GameProfil from "../../components/game/gameProfil/GameProfil";

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
