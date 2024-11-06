import {useEffect, useState} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {projectFirestore} from "../firebase/firebase";

export const useDocument = (collectionPath: string, docId: string) => {
    const [document, setDocument] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // get doc ref
        const docRef = doc(projectFirestore, collectionPath, docId);

        const unsub = onSnapshot(docRef, (refSnapshot) => {
            if (refSnapshot.data()) {
                setDocument({ ...refSnapshot.data(), id: refSnapshot.id });
                setError(null);
            } else {
                setError("No such document exists");
            }
        }, (err) => {
            setError("Failed to get document");
            console.log(err.message);
        })

        return () => unsub();
    }, [collectionPath, docId]);

    return { document, error };
}