import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface Member {
    id: string;
    name?: string;
    mail?: string;
    safety?: string;
};

const fetchRoster = async (): Promise<Member[]> => {
    // 'members' コレクションへの参照を取得します
    const membersCollection = collection(db, "members");
    // コレクション内のすべてのドキュメントを取得します
    const memberSnapshot = await getDocs(membersCollection);
    // 取得したドキュメントを Member 型にマッピングします
    const memberList = memberSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            email: data.email,
            safety: data.safety
        } as Member;
    });
    return memberList;
};

export { fetchRoster };