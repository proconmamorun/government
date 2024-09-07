import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './ListApp.css';
import InputwithIcon from '../component/InputwithIcon';

type Users = {
    id: string;
    name: string;
    safety: string;
    position: string;
};

interface ListFigure {
    id: string;
    name?: string;
    safety?: string;
    position?: string;
}

const ListApp: React.FC = () => {
    const [users, setUsers] = useState<Users[]>([]);
    {/*const [figure, setFigure] = useState<ListFigure>({
        id: '',
        name: '',
        safety: '',
        position: '',
    });*/}

    const fetchUsersData = async () => {
        try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))as Users[];
        setUsers(usersList);
    }catch (error) {
        console.error("データの取得に失敗しました: ", error);
    }
};

    useEffect(() => {
        fetchUsersData();
    }, []);

    return (
        <div>
            <div className="name-order">
                <button className="alpha-order">五十音順</button>
                <button className="old-order">年齢順</button>
            </div>
            <thead>
            <tr>
                <th className={"label"}>Name</th>
                <th className={"label"}>Safety</th>
                <th className={"label"}>Position</th>
            </tr>
            </thead>
        <div>
            <table border={1}>
                <tbody className="citizentable">
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="username">{user.name}</td>
                            <td className="usersafety">{user.safety}</td>
                            <td className="userposition">{user.position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

            <InputwithIcon />
        </div>
    );
};

export default ListApp;
