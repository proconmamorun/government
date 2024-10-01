import React, { useEffect, useState, useCallback} from 'react';
import { collection, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function  sendAlert(message:string){
    return async ()=>{
        await deleteDoc(db, doc, "alert", id);
    }
}

const SendAlert: React.FC = () => {
    const [inputText, setInputText] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const saveSendAlert = async () => {
        if (!inputText.trim()) {
            setStatus("文を入力してください。");
            return;
        }

        try {
            await addDoc(collection(db, 'alert'), {
                text: inputText,
                createdAt: new Date()
            });
        setInputText("");
        setStatus("正常に保存されました。");
    } catch (error) {
        console.error("Error fetching positions: ", error);
        setStatus("エラーが発生しました。もう一度お試しください。")
    }
};

return (
    <div>
            <label>
                文を入力してください:{" "}
                <input
                    type="string"
                    value={inputText}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputText(event.target.value)}
                />
            </label>
                <button onClick={saveSendAlert}>保存</button>
    </div>
);
};

export default SendAlert;