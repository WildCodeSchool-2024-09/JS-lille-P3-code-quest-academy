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
  fetchUserProgress: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const GameContext = createContext<ContextValue | null>(null);

export const Provider = ({ children }: ProviderProps) => {
  const [actualChallenge, setActualChallenge] = useState<ChallengeProps | null>(
    null,
  );
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); //boolean for game button activation
  const [answerStyles, setAnswerStyles] = useState({}); //set the color green or red for the quizz answers
  const [feedbackMessage, setFeedbackMessage] = useState(""); //set message if the reponse is correct or not
  const [buttonStyles, setButtonStyles] = useState({}); // set the color to the game button if enabled
  const videoRef = useRef(null); //reference to the video element

  // get challenge and room from actual user
  const userContext = useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const { user, progress, setProgress } = userContext;
  //----------------------------------------------------------
  // FETCH CONNECTED USER'S PROGRESS BY IS ID, ROOM AND CHALLENGE
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

  //----GameDisplay --- GameInstructions --------------------------
  // Fetch user progress after challenge incrementation with the button in game
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
  //----------------------------------------------------------------

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
        fetchUserProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
