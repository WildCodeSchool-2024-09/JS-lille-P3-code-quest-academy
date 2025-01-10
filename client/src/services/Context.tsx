import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface ContextValue {
  challenge: ChallengeProps[];
  setChallenge: React.Dispatch<React.SetStateAction<ChallengeProps[]>>;
  account: AccountProps[];
  setAccount: React.Dispatch<React.SetStateAction<AccountProps[]>>;
  progress: ProgressProps[];
  setProgress: React.Dispatch<React.SetStateAction<ProgressProps[]>>;
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
  room1Status: string;
  setRoom1Status: React.Dispatch<React.SetStateAction<string>>;
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
}

interface ProgressProps {
  level: number;
  user_id: number;
  room_id: number;
  challenge_id: number;
}

interface ProviderProps {
  children: ReactNode;
}

export const Context = createContext<ContextValue | null>(null);

export const Provider = ({ children }: ProviderProps) => {
  const [challenge, setChallenge] = useState([] as ChallengeProps[]);
  const [account, setAccount] = useState([] as AccountProps[]);
  const [progress, setProgress] = useState([] as ProgressProps[]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentType, setCurrentType] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [answerStyles, setAnswerStyles] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [buttonStyles, setButtonStyles] = useState({});
  const [room1Status, setRoom1Status] = useState("");

  //----------------------------------------------------------
  // FETCH DE LA TABLE CHALLENGE
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/challenges`)
      .then((response) => response.json())
      .then((data: ChallengeProps[]) => {
        setChallenge(data);
      });
  }, []);

  //----------------------------------------------------------
  // FETCH DE LA TABLE ACCOUNT
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/account`)
      .then((response) => response.json())
      .then((data: AccountProps[]) => {
        setAccount(data);
      });
  }, []);

  //----------------------------------------------------------
  // FETCH DE LA TABLE PROGRESS
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/progress`)
      .then((response) => response.json())
      .then((data: ProgressProps[]) => {
        setProgress(data);
      });
  }, []);

  return (
    <Context.Provider
      value={{
        challenge,
        setChallenge,
        account,
        setAccount,
        progress,
        setProgress,
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
        room1Status,
        setRoom1Status,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGameContext must be used within a Provider");
  }
  return context;
};
