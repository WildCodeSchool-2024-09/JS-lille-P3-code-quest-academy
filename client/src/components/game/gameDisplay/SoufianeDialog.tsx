import { useState } from "react";
import { useContext } from "react";
import { GameContext } from "../../../services/GameContext";
import { UserContext } from "../../../services/UserContext";

function SoufianeDialog() {
  const gameContext = useContext(GameContext);
  const userContext = useContext(UserContext);

  if (!gameContext || !userContext) {
    return <div>Error: gameContext is not available</div>;
  }

  const { user } = userContext;
  const { setButtonStyles, setIsButtonEnabled } = gameContext;

  const soufianeDialog = [
    `Hello ! c'était bien moi sous ce déguisement, ${user?.secondTeacher}`,
    "Désolé pour cette supercherie, je voulais tester tes connaissances en SQL avant que tu puisse affronter le boss final",
    "Tu as réussi à répondre à toutes mes questions, tu es prêt",
    "Bonne chance !",
  ];
  const [dialogIndex, setDialogIndex] = useState(0);

  const handleSoufianeDialog = () => {
    if (dialogIndex < soufianeDialog.length - 1) {
      setDialogIndex(dialogIndex + 1);
    }
    if (dialogIndex === 2) {
      setIsButtonEnabled(true);
      setButtonStyles("button-enabled");
    }
  };

  return (
    <>
      <div className="soufiane-character-container">
        <p className="soufiane-bd">{soufianeDialog[dialogIndex]}</p>
        <img
          src="./src/assets/images/boss/soufiane.png"
          alt=""
          className="soufiane-character"
          onClick={handleSoufianeDialog}
          onKeyUp={handleSoufianeDialog}
        />
      </div>
    </>
  );
}

export default SoufianeDialog;
