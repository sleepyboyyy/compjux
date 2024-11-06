import {useEffect, useState} from "react";
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {projectAuth, projectFirestore} from "../firebase/firebase";
import {AdminData} from "../pages/create-administrator/CreateAdministrator";
import {ClientData} from "../pages/signup/Signup";

export interface registerData {
    type: "Admin" | "Client",
    data: AdminData | ClientData,
}

export const useSignUp = () => {
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signUserUp = async (inputData: registerData) => {
        setIsPending(true);
        setError(null);

        try {
            // Get response after creating user
            const res = await createUserWithEmailAndPassword(projectAuth, inputData.data.email, inputData.data.password);

            // Create documentation for user
            await setDoc(doc(projectFirestore, "users", res.user.uid), {});

            // If admin add role "admin"
            if (inputData.type === "Admin") {
                // Type define the admin data and create a displayName from first and last name
                const adminData = inputData.data as AdminData;
                const displayName = adminData.firstName + " " + adminData.lastName;

                // Create data object for doc ( Have to create separate object to avoid holding the password )
                const dataObject = {
                    firstName: adminData.firstName,
                    lastName: adminData.lastName,
                    email: adminData.email,
                    embg: adminData.embg,
                    displayName,
                    role: adminData.role,
                }

                // Update the created profile's display name
                await updateProfile(res.user, {displayName});

                // Update the documentation by adding a role nad displayName
                await updateDoc(doc(projectFirestore, "users", res.user.uid), dataObject);
            }

            // If client add role "client"
            else if (inputData.type === "Client") {
                // Type define the client data
                const clientData = inputData.data as ClientData;

                // Create data object for doc ( Have to create separate object to avoid holding the password )
                const dataObject = {
                    displayName: clientData.username,
                    email: clientData.email,
                    username: clientData.username,
                    role: clientData.role,
                }

                // Update the created profile's display name
                await updateProfile(res.user, {displayName: clientData.username});

                // Update the documentation by adding a role nad displayName
                await updateDoc(doc(projectFirestore, "users", res.user.uid), dataObject);
            }

            // Manage state in cleanup function
            if(!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch(error) {
            // Manage state inside cleanup function
            if(!isCancelled) {
                setIsPending(false);
                if(error instanceof Error) {
                    setError(error.message);
                }
            }
        }
    }

    // Cleanup function
    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { isPending, error, signUserUp }
}