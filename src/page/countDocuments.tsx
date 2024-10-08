import React, { useEffect, useState} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const DocumentCounter: React.FC = () => {
    const [docCount, setDocCount] = useState<number | null>(null);
    const citizenNumber = 5000; //町民の人数

const countDocuments = async (collectionName: string): Promise<number> => {
    try {
        const quetySnapshot = await getDocs(collection(db, 'citizen'));
        return quetySnapshot.size;
    } catch (error) {
        console.error("Error counting documents: ", error);
        return 0;
    }
};

    useEffect(() => {
        const fetchDocumentCount = async () => {
            const count = await countDocuments("citizen");
            setDocCount(count);
        };

        fetchDocumentCount();
    }, []);

return (
    <div>
        {docCount !== null ? (
            <p>未回答者: {citizenNumber - docCount}</p>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    );
};

export default DocumentCounter;
export { DocumentCounter };

