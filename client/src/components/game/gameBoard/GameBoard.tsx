import "./GameBoard.css";
import { useContext } from "react";
import { Context } from "../../../services/Context";
import Boss from "./room/Boss";
import Html from "./room/Html";
import Main from "./room/Main";

function GameBoard() {
  //Importation du contexte
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  //Importation des variables du contexte utilisées sur la page
  const { challenge, currentIndex } = context;

  return (
    <>
      {challenge[currentIndex]?.title === "HTML" ? (
        <Html />
      ) : challenge[currentIndex]?.title === "Boss" ? (
        <Boss />
      ) : (
        <Main />
      )}
    </>
  );
}

export default GameBoard;
