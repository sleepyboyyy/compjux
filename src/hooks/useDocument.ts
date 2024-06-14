import {useEffect, useState} from "react";
import {doc, onSnapshot, DocumentSnapshot} from "firebase/firestore";
import {projectFirestore} from "../firebase/firebase";
import {AdminData} from "../developer_pages/createAdministrator/CreateAdministrator";
import {ClientData} from "../pages/Signup/Signup";

export const useDocument = (collection:string, id:string | undefined) => {
    const [document, setDocument] = useState<AdminData | ClientData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        if(id) {
            // get document ref
            const docRef = doc(projectFirestore, collection, id);

            const unsub = onSnapshot(docRef, (snapshot) => {
                if (snapshot.data()) {
                    const data = snapshot.data() as AdminData | ClientData | undefined;

                    // Check if properties in "data" match AdminData interface
                    if (data && 'firstName' in data && 'lastName' in data && 'embg' in data) {
                        setDocument({ ...data } as AdminData);
                        setError(null);
                    }

                    // Check if properties in "data" match ClientData interface
                    else if (data && 'username' in data) {
                        setDocument({ ...data } as ClientData);
                        setError(null);
                    }

                    // If no match found, invalid document format
                    else {
                        setError("Invalid document format!");
                    }
                } else {
                    setError("No such document exists");
                }
                setIsLoading(false);
            }, (err) => {
                setError("Failed to get document");
                setIsLoading(false);
                console.log(err.message);
            });

            return () => unsub();
        }

        setIsLoading(false);
    }, [collection, id]);

    return { document, isLoading, error }
}