import "./GameProfil.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../../services/GameContext";
import { UserContext } from "../../../services/UserContext";

function GameProfil() {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const gameContext = useContext(GameContext);

  if (!userContext) {
    return <div>Error: userContext is not available</div>;
  }

  if (!gameContext) {
    return <div>Error: gameContext is not available</div>;
  }

  const { user } = userContext;
  const { actualChallenge, level, setLevel } = gameContext;

  useEffect(() => {
    if (actualChallenge && actualChallenge.id >= 9 && actualChallenge.id < 16) {
      setLevel(2);
    } else if (
      actualChallenge &&
      actualChallenge.id >= 16 &&
      actualChallenge.id < 25
    ) {
      setLevel(3);
    } else if (
      actualChallenge &&
      actualChallenge.id >= 25 &&
      actualChallenge.id < 32
    ) {
      setLevel(4);
    } else if (
      actualChallenge &&
      actualChallenge.id >= 32 &&
      actualChallenge.id < 39
    ) {
      setLevel(5);
    } else if (
      actualChallenge &&
      actualChallenge.id >= 39 &&
      actualChallenge.id < 47
    ) {
      setLevel(6);
    } else if (actualChallenge && actualChallenge.id >= 47) {
      setLevel(7);
    }
  }, [actualChallenge, setLevel]);

  return (
    <>
      <div className="profil-container">
        <div className="profil-text">
          <h2>{user?.username}</h2>
          <p>NIveau {level}</p>
          <button
            className="profil-button"
            type="button"
            onClick={() => navigate("/profile")}
          >
            Profil
          </button>
        </div>
        <img
          className="profil-img"
          src="../src/assets/images/profil.png"
          alt="avatar boy"
        />
      </div>
    </>
  );
}

export default GameProfil;
