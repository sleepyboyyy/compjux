import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { projectAuth } from "../firebase/firebase";
import { useAuthContext } from "./useAuthContext";

export const useSignOut = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCancelled, setIsCancelled] = useState(false);

    //Context
    const { dispatch } = useAuthContext();

    const signUserOut = async () => {
        setIsPending(true);
        setError(null);

        try {
            await signOut(projectAuth);
            dispatch({ type: 'LOGOUT' });

            if(!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch (error) {
            // Setup cleanup function
            if (!isCancelled) {
                // Set pending to false
                setIsPending(false);
                // Set error message
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

    return { isPending, error, signUserOut }
}