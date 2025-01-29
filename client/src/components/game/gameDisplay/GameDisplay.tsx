import "./GameDisplay.css";
import { useContext } from "react";
import { GameContext } from "../../../services/GameContext";
import ImageDisplay from "./ImageDisplay";
import VideoDisplay from "./VideoDisplay";



function GameDisplay() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return <div>Error: gameContext is not available</div>;
  }

  const { actualChallenge } = gameContext;
  // const [challengeInfos, setChallengeInfos] =
  //   useState<ChallengeInfosProps | null>(null);

  // useEffect(() => {
  //   fetch(
  //     `${import.meta.env.VITE_API_URL}/api/progress/${user?.id}/${
  //       progress?.room_id
  //     }/${progress?.challenge_id}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setChallengeInfos(data);
  //     });
  // }, [user, progress, actualChallenge]);

  return (
    <>
      <div className="gamedisplay-container">
        {actualChallenge?.type === "boss" ? (
          <VideoDisplay />
        ) : (
          <ImageDisplay />
        )}
      </div>
    </>
  );
}

export default GameDisplay;
