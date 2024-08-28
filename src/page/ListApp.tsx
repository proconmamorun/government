import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './ListApp.css';
import '../component/InputwithIcon';
import InputwithIcon from '../component/InputwithIcon';

type Users = {
    id: string;
    name: string;
    mail: string;
    safety: string;
};

interface ListFigure {
    id: string;
    name?: string;
    mail?: string;
    safety?: string;
}

const ListApp: React.FC = () => {
    const [users, setUsers] = useState<Users[]>([]);
    const [figure, setFigure] = useState<ListFigure>({
        id: '',
        name: '',
        mail: '',
        safety: '',
    });

    const handleDelete = async (id: string) => {
        if (window.confirm("削除してもよろしいですか？")) {
            try {
                await deleteDoc(doc(db, "users", id));
                fetchUsersData();
                alert("削除しました");
            } catch (error) {
                alert("失敗しました");
            }
        }
    };

    const fetchUsersData = async () => {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Users[];
        setUsers(usersList);
    };

    useEffect(() => {
        fetchUsersData();
    }, []);

    const handleAdd = async () => {
        if (window.confirm("追加してもよろしいですか？")) {
            try {
                await addDoc(collection(db, "users"), {
                    name: figure.name,
                    mail: figure.mail,
                    safety: figure.safety,
                });
                fetchUsersData();
                setFigure({
                    id: '',
                    name: '',
                    mail: '',
                    safety: '',
                });

                alert("追加しました");
            } catch (error) {
                alert("失敗しました");
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof ListFigure) => {
        setFigure({
            ...figure,
            [field]: event.target.value
        });
    };

    return (
        <div>
            <div className="name-order">
                <button className="alpha-order">五十音順</button>
                <button className="old-order">年齢順</button>
            </div>
            <thead>
            <tr>
                <th className={"label"}>Name</th><th className={"label"}>Mail</th><th className={"label"}>Safety</th>
            </tr>
            </thead>
            <div>
                <label>
                    名前:{" "}
                    <input
                        type="text"
                        value={figure.name}
                        onChange={(event) => handleInputChange(event, 'name')}
                    />
                </label>
                <label>
                    メールアドレス: {" "}
                    <input
                        type="text"
                        value={figure.mail}
                        onChange={(event) => handleInputChange(event, 'mail')}
                    />
                </label>
                <label>
                    危険度: {" "}
                    <input
                        type="text"
                        value={figure.safety}
                        onChange={(event) => handleInputChange(event, 'safety')}
                    />
                </label>
                <button onClick={() => handleAdd()}>追加</button>
            </div>

            <table border={1}>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="username">{user.name}</td>
                            <td className="usermail">{user.mail}</td>
                            <td className="usersafety">{user.safety}</td>
                            <td>
                                <button onClick={() => handleDelete(user.id)}>削除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <InputwithIcon />
        </div>
    );
};

export default ListApp;
