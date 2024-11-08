import React, { createContext, ReactNode, useEffect, useReducer } from "react";
import { User } from "firebase/auth";
import { userStateListener } from "../firebase/firebase";
import {unsubscribe} from "node:diagnostics_channel";

// Interfaces
// AuthProvider children props
interface Props {
    children?: ReactNode;
}

// Auth State interface
interface authState {
    user: User | null;
    authIsReady: boolean;
}

// Auth Reducer actions
interface LoginAction {
    type: 'LOGIN';
    payload: User;
}

interface LogoutAction {
    type: 'LOGOUT';
}

interface AuthIsReadyAction {
    type: 'AUTH_IS_READY';
    payload: User | null;
}

// Context props
interface AuthContextProps {
    state: authState;
    dispatch: React.Dispatch<AuthAction>;
}

type AuthAction = LoginAction | LogoutAction | AuthIsReadyAction;

// Auth Context
export const AuthContext = createContext<AuthContextProps>({
    state: { user: null, authIsReady: false },
    dispatch: () => {},
});

// Auth Reducer
export const authReducer = (state: authState, action: AuthAction) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { user: action.payload, authIsReady: true }
        default:
            return state;
    }
}

// Auth Provider
export const AuthProvider = ({ children }: Props) => {
    // Auth Provider State
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
    } as authState)

    // Listen to auth state change
    useEffect(() => {
        const unsubscribe = userStateListener((user) => {
            dispatch({ type: "AUTH_IS_READY", payload: user });
            unsubscribe();
        });
    }, [])

    console.log("State: ", state);
    console.log("render");

    // return Auth Provider
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}