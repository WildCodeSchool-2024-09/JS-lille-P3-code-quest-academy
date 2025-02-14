import "./GameDisplay.css";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../services/GameContext";
import type { RoomProps } from "../../../types/user";
import SoufianeDialog from "./SoufianeDialog";
import FinalDialog from "./FInalDialog";

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
        {/* Si le "type" du challenge est "boss", alors on affiche la vidéo*/}
        {actualChallenge?.type === "boss" ? (
          <video
            className="gamedisplay-video"
            ref={videoRef}
            src={roomInfos?.fight_video_src}
          >
            <track kind="captions" />
          </video>
        ) : (
          // Si le type n'est pas "boss", on affiche l'image de la salle lié au challenge actuel
          // Cette image change en fonction du "title" et du "type"
          <>
            <img
              className="gamedisplay-img"
              src={roomInfos?.room_img_src}
              alt="plateau de jeu"
              onClick={handleRoomSelection}
              onKeyDown={handleRoomSelection}
            />
            {/* Si le "title" du challenge n'est pas égal à "Transition", on affiche le personnage du joueur 
            par dessus l'image de la salle */}
            {actualChallenge?.title !== "Transition" ? (
              <div className="player-character-container">
                <img
                  src="./src/assets/images/profil.png"
                  alt=""
                  className="player-character"
                />
              </div>
            ) : (
              // Sinon, le personnage n'est pas affiché
              ""
            )}
            {actualChallenge?.type === "boss-spawn" ? (
              // Si le "type" du challenge est "boss-spawn", on affiche l'image du boss par dessus l'image de la salle
              // (pendant les phase précédent le combat contre le boss)
              <div className="boss-character-container">
                <img
                  src={roomInfos?.boss_img_src}
                  alt=""
                  className="boss-character"
                />
              </div>
            ) : actualChallenge?.type === "soufiane" ? (
              // Si le "type" du challenge est "soufiane", on affiche l'image de Soufiane par dessus l'image de la salle
              // (après le combat contre le boss SQL)
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
