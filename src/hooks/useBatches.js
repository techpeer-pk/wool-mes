import { useState, useEffect } from 'react';
import {
    collection,
    query,
    onSnapshot,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp,
    orderBy
} from 'firebase/firestore';
import { db } from '../firebase';

export const useBatches = () => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'batches'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const batchData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBatches(batchData);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const addBatch = async (batch) => {
        return await addDoc(collection(db, 'batches'), {
            ...batch,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    };

    const updateBatch = async (batchId, updates) => {
        const batchRef = doc(db, 'batches', batchId);
        return await updateDoc(batchRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    };

    return { batches, loading, addBatch, updateBatch };
};
