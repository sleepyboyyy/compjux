import {useCallback, useEffect, useState} from 'react';
import { doc, getDoc } from 'firebase/firestore';
import {projectFirestore} from "../firebase/firebase";

const useMultipleDocuments = (collection: string, ids: string[]) => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDocuments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedDocuments = await Promise.all(
                ids.map(async (id) => {
                    const docRef = doc(projectFirestore, collection, id);
                    const docSnap = await getDoc(docRef);
                    return docSnap.exists() ? { id, ...docSnap.data() } : null;
                })
            );
            setDocuments(fetchedDocuments.filter((doc) => doc !== null));
        } catch (err) {
            setError('Failed to load documents');
        } finally {
            setLoading(false);
        }
    }, [collection, ids]);

    useEffect(() => {
        if (ids.length > 0) {
            fetchDocuments();
        } else {
            setDocuments([]);
            setLoading(false);
        }
    }, [fetchDocuments]);

    return { documents, loading, error };
};

export default useMultipleDocuments;
