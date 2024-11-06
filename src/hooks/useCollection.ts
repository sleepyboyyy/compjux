import {useEffect, useState} from "react";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import {projectFirestore} from "../firebase/firebase";

export const useCollection = (collectionPath: string, _orderBy: null | string, direction: "asc" | "desc") => {
    // State
    const [documents, setDocuments] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let ref = collection(projectFirestore, collectionPath);
        let refQ = _orderBy ? query(ref, orderBy(_orderBy, direction)) : ref;

        // Grab snapshot
        const unsub = onSnapshot(refQ, (refSnapshot) => {
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

    }, [collectionPath, _orderBy, direction]);

    return { documents, error };
}