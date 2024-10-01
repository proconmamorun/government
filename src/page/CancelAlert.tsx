import React, { useEffect, useState, useCallback} from 'react';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import 'sendAlert';

const CancelAlert: React.FC = () => {
const handleDelete = async (id: string) => {
    if (window.confirm("削除してもよろしいですか？")) {
      try {
        const alertDocRef = doc(db, "alert", id);
        await deleteDoc(alertDocRef);
        alert("削除しました");
      } catch (error) {
        alert("失敗しました");
      }
    }
};

return (
    <div>
        <button onClick={() => handleDelete}>
        削除
        </button>
    </div>
)
};

export default CancelAlert;