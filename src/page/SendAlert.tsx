import React, { useEffect, useState, useCallback} from 'react';
import { doc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const SendAlert = async (action: 'save' | 'delete', message: string, id?: string) => {
    if (action === 'save' && message) {
        if (!message.trim()) {
            console.log("文を入力してください。");
            return;
        }
        try {
            await addDoc(collection(db, 'alert'), {
                text: message,
                createdAt: new Date()
        });
        console.log("保存しました");
    } catch (error) {
        console.log("保存に失敗しました");
    }
}else if (action === 'delete' && id) {
    try {
        const alertDocRef = doc(db, "alert", id);
        await deleteDoc(alertDocRef);
        console.log("削除しました");
    }catch (error) {
        console.error("Error deleting positions: ", error);
        console.log("削除に失敗しました");
    }
    }
};


export default SendAlert;