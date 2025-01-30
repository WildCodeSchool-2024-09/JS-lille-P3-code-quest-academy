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

  const {
    actualChallenge,
    videoRef,
    user,
    progress,
    setProgress,
    setActualChallenge,
  } = gameContext;
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

  const handleRoomSelection = async () => {
    if (actualChallenge?.title === "Transition") {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/progress/${user?.id}/${
            progress?.room_id
          }/${progress?.challenge_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) {
          throw new Error("Échec de la mise à jour du progrès");
        }

        const newChallenge = await response.json();

        //reload actualchallenge in the context to update the challenge
        setActualChallenge(newChallenge);

        await fetchUserProgress();
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour ou récupération du progrès :",
          error,
        );
      }
    }
  };

  const fetchUserProgress = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/progress/${user?.id}`,
      );

      const progressData = await response.json();
      setProgress(progressData);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la progression :",
        error,
      );
    }
  };

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
            onClick={handleRoomSelection}
            onKeyDown={handleRoomSelection}
          />
        )}
      </div>
    </>
  );
}

export default GameDisplay;
