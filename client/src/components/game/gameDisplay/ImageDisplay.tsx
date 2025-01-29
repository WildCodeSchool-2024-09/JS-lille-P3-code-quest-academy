import { useEffect, useState } from "react";
import { useContext } from "react";
import { GameContext } from "../../../services/GameContext";

function ImageDisplay() {

    const gameContext = useContext(GameContext);
    const [imgSrc, setImgSrc] = useState("");

    if (!gameContext) {
        return <div>Error: gameContext is not available</div>;
    }

    const { actualChallenge } = gameContext;

    useEffect(() => {
        if (actualChallenge?.title === "HTML") {
          setImgSrc("./src/assets/images/html-room.png");
        } else if (actualChallenge?.title === "CSS") {
          setImgSrc("./src/assets/images/css-room.png");
        } else if (actualChallenge?.title === "Javascript") {
          setImgSrc("./src/assets/images/js-room.png");
        } else if (actualChallenge?.title === "React") {
          setImgSrc("./src/assets/images/node-room.png");
        } else if (actualChallenge?.title === "Node") {
          setImgSrc("./src/assets/images/sql-room.png");
        } 
      }, [actualChallenge]);

    return ( 
        <>
        <img
            className="gamedisplay-img"
            src={imgSrc}
            alt="plateau de jeu"
          />
        </>
     );
}

export default ImageDisplay;