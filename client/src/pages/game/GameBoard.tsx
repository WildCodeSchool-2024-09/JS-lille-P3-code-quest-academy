import "./GameBoard.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameCommands from "../../components/game/gameCommands/GameCommands";
import GameDisplay from "../../components/game/gameDisplay/GameDisplay";
import GameInstructions from "../../components/game/gameInstructions/GameInstructions";
import GameProfil from "../../components/game/gameProfil/GameProfil";
import { GameContext } from "../../services/GameContext";

function GameBoard() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return <div>Error: gameContext is not available</div>;
  }

  const { endGameTransition, showEnding } = gameContext;
  const navigate = useNavigate();

  return (
    <>
      {/* if showEnding is false, display the game. Otherwise, display the ending video.
    ----------------show display is true only on the last challenge------------------ 
    ---------------------------------------------------------------------------------*/}
      {showEnding === false ? (
        <div className={`gameboard-page ${endGameTransition}`}>
          <GameDisplay />
          <GameProfil />
          <GameInstructions />
          <GameCommands />
        </div>
      ) : (
        <>
          <video
            className="ending-video"
            src="./src/assets/videos/Ending.mp4"
            autoPlay
            onEnded={() => navigate("/profile")}
          >
            <track
              kind="captions"
              srcLang="en"
              src="./src/assets/videos/Ending_captions.vtt"
            />
          </video>
          <button
            className="video-button"
            type="button"
            onClick={() => navigate("/profile")}
          >
            Passer la vidéo
          </button>
        </>
      )}
    </>
  );
}

export default GameBoard;
