import React, {createContext, ReactNode, useEffect, useState} from "react";
import {User} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { userStateListener } from "../firebase/firebase";
import {useSignOut} from "../hooks/useSignOut";

// TODO: go back to using useReducer and reset all auth guards
// TODO: authIsRead is a needed property to wait out auth setup
// TODO: good luck :)

// Interfaces
interface Props {
    children?: ReactNode;
}

export const AuthContext = createContext({
    currentUser: {} as User | null,
    setCurrentUser: (_user: User) => {},
    signOut: () => {}
});

export const AuthProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // Destructure custom signout hook
    const { signUserOut } = useSignOut();

    console.log("Current user: ",currentUser);

    useEffect(() => {
        const unsubscribe = userStateListener((user) => {
            if (user) {
                setCurrentUser(user)
            }
        });

        return unsubscribe;
    }, [setCurrentUser])

    // As soon as setting the current user to null,
    // the user will be redirected to the home page
    const signOut = async () => {
        await signUserOut();
        setCurrentUser(null);
    }

    const value = {
        currentUser,
        setCurrentUser,
        signOut,
    }

    return <AuthContext.Provider value={value}>{
        children
    }</AuthContext.Provider>;
}