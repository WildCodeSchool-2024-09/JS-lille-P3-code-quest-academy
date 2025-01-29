import "./GameDisplay.css";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../services/GameContext";

type RoomProps = {
  boss_name: string;
  boss_img_src: string;
  fight_video_src: string;
  room_img_src: string;
};

function GameDisplay() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return <div>Error: gameContext is not available</div>;
  }

  const { actualChallenge, videoRef } = gameContext;
  const [roomInfos, setRoomInfos] = useState<RoomProps | null>(null);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/room/${actualChallenge?.room_id}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setRoomInfos(data);
      });
  }, [actualChallenge]);

  return (
    <>
      <div className="gamedisplay-container">
        {actualChallenge?.type === "boss" ? (
          <video
            className="gamedisplay-video"
            ref={videoRef}
            src={roomInfos?.fight_video_src}
          >
            <track kind="captions" />
          </video>
        ) : (
          <img
            className="gamedisplay-img"
            src={roomInfos?.room_img_src}
            alt="plateau de jeu"
          />
        )}
      </div>
    </>
  );
}

export default GameDisplay;
