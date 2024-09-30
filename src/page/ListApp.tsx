import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './ListApp.css';
import InputwithIcon from '../component/InputwithIcon';

type Users = {
    id: string;
    name: string;
    safety: string;
};

const ListApp: React.FC = () => {
    const [users, setUsers] = useState<Users[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    const fetchUsersData = async () => {
        try {
            const usersCollection = collection(db, "citizen");
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Users[];
            setUsers(usersList);
        } catch (error) {
            console.error("データの取得に失敗しました: ", error);
        }
    };
    
    console.log(...users);

    useEffect(() => {
        fetchUsersData();
    }, []);

    const handleAlphabeticalOrder = () => {
        const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name, 'ja'));
        setUsers(sortedUsers);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.safety.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
        <div>
            <div className="name-order">
                <label htmlFor="search">検索: </label>
                <input
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="検索" 
                />
                <button className="alpha-order" onClick={handleAlphabeticalOrder}>五十音順</button>
            </div>
            <table border={1}>
                <thead>
                    <tr>
                        <th className="label">Name</th>
                        <th className="label">Safety</th>
                    </tr>
                </thead>
                <tbody className="citizentable">
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="username">{user.name}</td>
                            <td className="usersafety">{user.safety}</td>
                        </tr>
                    ))}
                </tbody>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.safety}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>該当する町民は見つかりません。</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <InputwithIcon />
        </div>
    );
};

export default ListApp;
