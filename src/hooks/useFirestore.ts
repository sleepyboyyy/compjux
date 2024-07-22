import {addDoc, collection, doc, updateDoc, deleteDoc} from "firebase/firestore";
import {useEffect, useReducer, useState} from "react";
import {projectFirestore, timestamp} from "../firebase/firebase";

interface firestoreState {
    document: any // TODO: create all the types of documents that can exist in db
    isPending: boolean,
    success: boolean | null,
    error: any
}

interface isPendingAction {
    type: 'IS_PENDING';
}

interface errorAction {
    type: 'ERROR';
    payload: any;
}

interface addedDocumentAction {
    type: 'ADDED_DOCUMENT';
    payload: any; // This should contain the different document types
}

interface deletedDocumentAction {
    type: 'DELETED_DOCUMENT';
}

interface updatedDocumentAction {
    type: 'UPDATED_DOCUMENT';
    payload: any; // This should contain the different document types
}

type actionState = isPendingAction | errorAction | addedDocumentAction | deletedDocumentAction | updatedDocumentAction;

let initialState = {
    document: null,
    isPending: false,
    success: null,
    error: null
}

const firestoreReducer = (state: firestoreState, action: actionState) => {
    switch(action.type) {
        case 'IS_PENDING':
            return {document: null, isPending: true, success: false, error: null}
        case 'ERROR':
            return {document: null, isPending: false, success: false, error: action.payload}
        case 'ADDED_DOCUMENT':
            return {document: action.payload, isPending: false, success: true, error: null}
        case 'DELETED_DOCUMENT':
            return {document: null, isPending: false, success: true, error: null}
        case 'UPDATED_DOCUMENT':
            return {document: action.payload, isPending: false, success: true, error: null}
        default:
            return state;
    }
}

// collectionPath = collection
export const useFirestore = (collectionPath: string) => {
    // State
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    // db reference is projectFirestore

    // dispatch helper cleanup function
    const dispatchIfNotCancelled = (action:any) => {
        if (!isCancelled) {
            dispatch(action);
        }
    }

    // ADD DOCUMENT
    const addDocument = async (doc:any) => {
        // begin pending
        dispatch({ type: 'IS_PENDING' });

        try {
            // timestamp
            const createdAt = timestamp.fromDate(new Date());

            // add to collection
            const addedDocument = await addDoc(collection(projectFirestore, collectionPath), {...doc, createdAt});

            // manage cleanup dispatch
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
        }
        catch(err:any) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    // UPDATE DOCUMENT
    const updateDocument = async (id: string, updates: any) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            const docToUpdate = doc(projectFirestore, collectionPath, id);
            await updateDoc(docToUpdate, updates);
            dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: docToUpdate });
            return docToUpdate;
        }
        catch(err:any) {
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message});
            return null;
        }
    }

    // DELETE DOCUMENT
    const deleteDocument = async (id: string) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            await deleteDoc(doc(projectFirestore, collectionPath, id));

            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
        }
        catch(err:any) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete item' });
        }
    }

    // CLEANUP
    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { addDocument, updateDocument, deleteDocument, response }
}