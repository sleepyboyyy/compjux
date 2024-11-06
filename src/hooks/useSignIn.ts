import {useEffect, useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {projectAuth} from "../firebase/firebase";
import {useAuthContext} from "./useAuthContext";

export const useSignIn = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCancelled, setIsCancelled] = useState(false);

    // Context
    const { dispatch } = useAuthContext();

    const signUserIn = async (email: string, password: string) => {
        setIsPending(true);
        setError(null);

        try {
            const res = await signInWithEmailAndPassword(projectAuth, email, password);
            dispatch({ type: 'LOGIN', payload: res.user })

            // Manage state in cleanup function
            if(!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch (error) {
            // Wrap in cleanup function
            if (!isCancelled) {
                // Set pending to false
                setIsPending(false);
                // Set error
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
        }
    }

    // Cleanup function
    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { isPending, error, signUserIn }
}