import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface ContextValue {
  challenge: ChallengeProps[];
  setChallenge: React.Dispatch<React.SetStateAction<ChallengeProps[]>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  currentType: number;
  setCurrentType: React.Dispatch<React.SetStateAction<number>>;
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
}

interface ChallengeProps {
  id: number;
  title: string;
  guideline: string;
  hint: string;
  soluce: string;
  type: string;
  question: string;
  rep1: string;
  rep2: string;
  rep3: string;
  rep4: string;
  room_id: number;
}

interface ProviderProps {
  children: ReactNode;
}

export const GameContext = createContext<ContextValue | null>(null);

export const Provider = ({ children }: ProviderProps) => {
  const [challenge, setChallenge] = useState([] as ChallengeProps[]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentType, setCurrentType] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [answerStyles, setAnswerStyles] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [buttonStyles, setButtonStyles] = useState({});

  //----------------------------------------------------------
  // FETCH DE LA TABLE CHALLENGE
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/challenges`)
      .then((response) => response.json())
      .then((data: ChallengeProps[]) => {
        setChallenge(data);
      });
  }, []);

  return (
    <GameContext.Provider
      value={{
        challenge,
        setChallenge,
        currentIndex,
        setCurrentIndex,
        currentType,
        setCurrentType,
        isButtonEnabled,
        setIsButtonEnabled,
        answerStyles,
        setAnswerStyles,
        feedbackMessage,
        setFeedbackMessage,
        buttonStyles,
        setButtonStyles,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const gameContext = useContext(GameContext);
  if (!gameContext) {
    throw new Error("useGameContext must be used within a Provider");
  }
  return gameContext;
};
