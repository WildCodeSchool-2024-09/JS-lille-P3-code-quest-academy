import "./GameDisplay.css";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../services/GameContext";
import type { RoomProps } from "../../../types/user";
import FinalDialog from "./FInalDialog";
import SoufianeDialog from "./SoufianeDialog";

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
    fetchUserProgress,
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

  return (
    <>
      <div className="gamedisplay-container">
        {/* If challenge's type is "boss", we display the boss's vidéo*/}
        {actualChallenge?.type === "boss" ? (
          <video
            className="gamedisplay-video"
            ref={videoRef}
            src={roomInfos?.fight_video_src}
          >
            <track kind="captions" />
          </video>
        ) : (
          // If challenge's type is not "boss", we display the room's img
          // This img change depending on challenge's "title" and "type"
          <>
            <img
              className="gamedisplay-img"
              src={roomInfos?.room_img_src}
              alt="plateau de jeu"
              onClick={handleRoomSelection}
              onKeyDown={handleRoomSelection}
            />
            {/* If challenge's title is not "Transition", we display the player character on top of room img*/}
            {actualChallenge?.title !== "Transition" ? (
              <div className="player-character-container">
                <img
                  src="./src/assets/images/profil.png"
                  alt=""
                  className="player-character"
                />
              </div>
            ) : (
              // Otherwise, player's character is not displayed
              ""
            )}
            {actualChallenge?.type === "boss-spawn" ? (
              // If challenge's type is "boss-span", we display the boss's img on top of room's img
              // (during the phase preceding the boss fight)
              <div className="boss-character-container">
                <img
                  src={roomInfos?.boss_img_src}
                  alt=""
                  className="boss-character"
                />
              </div>
            ) : actualChallenge?.type === "soufiane" ? (
              // If challenge's type is "soufiane", we display Soufiane' character on top of the room's img
              // (after the fight against the SQL boss)
              <SoufianeDialog />
            ) : actualChallenge?.type === "final" ? (
              <FinalDialog />
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </>
  );
}

export default GameDisplay;
