import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import type {
  AccountProps,
  ChallengeProps,
  ProgressProps,
} from "../types/user";
import { UserContext } from "./UserContext";

interface ContextValue {
  actualChallenge: ChallengeProps | null;
  setActualChallenge: React.Dispatch<
    React.SetStateAction<ChallengeProps | null>
  >;
  isButtonEnabled: boolean;
  setIsButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  answerStyles: { [key: number]: string };
  setAnswerStyles: React.Dispatch<
    React.SetStateAction<{ [key: number]: string }>
  >;
  feedbackMessage: string;
  setFeedbackMessage: React.Dispatch<React.SetStateAction<string>>;
  buttonStyles: { [key: number]: string };
  setButtonStyles: React.Dispatch<
    React.SetStateAction<{ [key: number]: string }>
  >;
  user: AccountProps | null;
  progress: ProgressProps | null;
  setProgress: React.Dispatch<React.SetStateAction<ProgressProps | null>>;
  videoRef: React.RefObject<HTMLVideoElement>;
}

interface ProviderProps {
  children: ReactNode;
}

export const GameContext = createContext<ContextValue | null>(null);

export const Provider = ({ children }: ProviderProps) => {
  const [actualChallenge, setActualChallenge] = useState<ChallengeProps | null>(
    null,
  );
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [answerStyles, setAnswerStyles] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [buttonStyles, setButtonStyles] = useState({});
  const videoRef = useRef(null);

  // récuperer le challenge et la room du user actuel
  const userContext = useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const { user, progress, setProgress } = userContext;
  //----------------------------------------------------------
  // FETCH DU PROGRESS DE L'UTILISATEUR CONNECTE SELON SON ID, LA ROOM ET LE CHALLENGE
  useEffect(() => {
    if (progress && user) {
      fetch(
        `${import.meta.env.VITE_API_URL}/api/challenge/${
          progress?.challenge_id
        }`,
      )
        .then((response) => response.json())
        .then((data: ChallengeProps) => {
          setActualChallenge(data);
        });
    }
  }, [user, progress]);

  return (
    <GameContext.Provider
      value={{
        actualChallenge,
        setActualChallenge,
        isButtonEnabled,
        setIsButtonEnabled,
        answerStyles,
        setAnswerStyles,
        feedbackMessage,
        setFeedbackMessage,
        buttonStyles,
        setButtonStyles,
        user,
        progress,
        setProgress,
        videoRef,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
