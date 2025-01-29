import "./GameDisplay.css";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../services/GameContext";

type ChallengeInfosProps = {
  fight_video_src: string;
  room_img_src: string;
};

function GameDisplay() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return <div>Error: gameContext is not available</div>;
  }

  const { actualChallenge, user, progress, videoRef } = gameContext;
  const [challengeInfos, setChallengeInfos] =
    useState<ChallengeInfosProps | null>(null);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/progress/${user?.id}/${
        progress?.room_id
      }/${progress?.challenge_id}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setChallengeInfos(data);
      });
  }, [user, progress]);

  return (
    <>
      <div className="gamedisplay-container">
        {actualChallenge?.type === "boss" ? (
          <video
            className="gamedisplay-video"
            ref={videoRef}
            src={challengeInfos?.fight_video_src}
          >
            <track kind="captions" />
          </video>
        ) : (
          <img
            className="gamedisplay-img"
            src={challengeInfos?.room_img_src}
            alt="plateau de jeu"
          />
        )}
      </div>
    </>
  );
}

export default GameDisplay;
