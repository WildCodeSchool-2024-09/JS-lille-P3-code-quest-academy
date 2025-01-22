import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { UserContext } from "./UserContext";

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
  user: AccountProps | null;
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

interface AccountProps {
  id: number;
  username: string;
  email: string;
  password: string;
  teacher_1: string;
  teacher_2: string;
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

  // récuperer le challenge et la room du user actuel
  const userContext = useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const { user } = userContext;
  //----------------------------------------------------------
  // FETCH DE LA TABLE CHALLENGE
  useEffect(() => {
    if (user) {
      fetch(`${import.meta.env.VITE_API_URL}/api/${user.id}/challenge/`)
        .then((response) => response.json())
        .then((data: ChallengeProps[]) => {
          setChallenge(data);
        });
    }
  }, [user]);

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
        user,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
