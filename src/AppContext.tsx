import {createContext, Dispatch, SetStateAction} from "react";

interface UserContextType {
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType>({
    userId: "",
    setUserId: () => {
    },
});