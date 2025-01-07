import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ContextValue {
    gameType: string[];
    instructions: string[];
    currentType: string | null;
    setCurrentType: (type: string) => void;
}

interface ProviderProps {
    children: ReactNode;
}

export const Context = createContext<ContextValue | null>(null);

export const Provider = ({ children }: ProviderProps) => {

    const [currentType, setCurrentType] = useState<string | null>("");

    const instructions = ["Bienvenue à la Code Quest Academy ! Un mystérieux bug a infecté le campus, qui empêche les étudiants de continuer leur apprentissage…  Aide-nous à Résoudre ce mystère !"]
   
        const gameType = ["quizz", "text", "checkbox"];


    return (
        <Context.Provider value={{ gameType, instructions, currentType, setCurrentType }}>
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