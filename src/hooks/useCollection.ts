import {useEffect, useState} from "react";
import { collection, doc, onSnapshot  } from "firebase/firestore";
import {projectFirestore} from "../firebase/firebase";

export const useCollection = (collectionPath: string) => {
    // State
    const [documents, setDocuments] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let ref = collection(projectFirestore, collectionPath);

        // Grab snapshot
        const unsub = onSnapshot(ref, (refSnapshot) => {
            // Initialize results
            let results: any = [];

            // Grab documents and push to results
            refSnapshot.docs.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id });
            })

            // Update state
            setDocuments(results);
            setError(null);
        }, error => {
            setError('Could not fetch data');
            console.log(error);
        });

        // Cleanup func
        return () => unsub();

    }, [collectionPath]);

    return { documents, error };
}