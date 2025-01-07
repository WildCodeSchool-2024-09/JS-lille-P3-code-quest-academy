import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface ContextValue {
    challenge: ChallengeProps[];
    setChallenge: React.Dispatch<React.SetStateAction<ChallengeProps[]>>;
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface ChallengeProps {
    id: number;
    title: string;
    guideline: string;
    hint: string;
    soluce: string;
    type: string;
    room_id: number;
}

interface ProviderProps {
    children: ReactNode;
}

export const Context = createContext<ContextValue | null>(null);

export const Provider = ({ children }: ProviderProps) => {

    const [challenge, setChallenge] = useState([] as ChallengeProps[]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/challenges`)
          .then((response) => response.json())
          .then((data: ChallengeProps[]) => {
            setChallenge(data);
          });
      }, []);


    return (
        <Context.Provider value={{ challenge, setChallenge, currentIndex, setCurrentIndex}}>
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