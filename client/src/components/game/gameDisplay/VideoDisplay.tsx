import { useEffect, useState } from "react";
import { useContext } from "react";
import { GameContext } from "../../../services/GameContext";

function ImageDisplay() {

    const gameContext = useContext(GameContext);
    const [videoSrc, setVideoSrc] = useState("");

    if (!gameContext) {
        return <div>Error: gameContext is not available</div>;
    }

    const { actualChallenge, videoRef } = gameContext;

    useEffect(() => {
        if (actualChallenge?.title === "HTML" && actualChallenge?.type === "boss") {
          setVideoSrc("./src/assets/videos/html-boss-fight.mp4");
        } else if (actualChallenge?.title === "CSS" && actualChallenge?.type === "boss") {
          setVideoSrc("../src/assets/videos/css-boss-fight.mp4");
        } else if (actualChallenge?.title === "Javascript" && actualChallenge?.type === "boss") {
          setVideoSrc("../src/assets/videos/js-boss-fight.mp4" );
        } else if (actualChallenge?.title === "React" && actualChallenge?.type === "boss") {
          setVideoSrc("../src/assets/videos/node-boss-fight.mp4");
        } else if (actualChallenge?.title === "Node" && actualChallenge?.type === "boss") {
          setVideoSrc("../src/assets/videos/sql-boss-fight.mp4");
        } 
      }, [actualChallenge]);

    return ( 
        <>
        <video
            className="gamedisplay-video"
            ref={videoRef}
            src={videoSrc}
          >
          <track kind="captions" />
          </video>
        </>
     );
}

export default ImageDisplay;