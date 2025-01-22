import "./GameBoard.css";
import GameDisplay from "../../components/game/gameDisplay/GameDisplay";
import GameCommands from "../../components/game/gameCommands/GameCommands";
import GameInstructions from "../../components/game/gameInstructions/GameInstructions";
import GameProfil from "../../components/game/gameProfil/GameProfil";

function GameBoard() {
  return (
    <>
      <div className="gameboard-page">
        <GameDisplay />
        <GameProfil />
        <GameInstructions />
        <GameCommands />
      </div>
    </>
  );
}

export default GameBoard;
