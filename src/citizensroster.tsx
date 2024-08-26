import React, {useEffect, useState} from "react";
import {db} from './firebaseConfig';
import {collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';
import firebase from './firebase';
import './App.css';

type Users = {
    id: string;
    name: string; 
    mail: string; 
    safety: string; 
};

interface Figure { 
  id: string;
  name?: string; 
  mail?: string; 
  safety?: string; 
};

function App() {
  const [users, setUsers] = useState<Users[]>([]);
  const [figure, setFigure] = useState<Figure>({
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Figure) => {
    setFigure({
      ...figure,
      [field]: event.target.value
    });
  };

  return (
      <div>
        <header className="header"></header>
        <div className="button-container">
          <button className="map">地図情報</button>
          <button className="safetyInfo">安否情報</button>
        </div>
        <div className="name-order">
          <button className="alpha-order">五十音順</button>
          <button className="old-order">年齢順</button>
          </div>
          {/*<h2>町民</h2>*/}
          <div>
            <label>
              名前:{" "}
              <input
                type="text"
                value={figure.name} //緯度
                onChange={(event) => handleInputChange(event, 'name')} 
              />
            </label>
            <label>
              メールアドレス: {" "}
              <input
                type="text"
                value={figure.mail} //経度
                onChange={(event) => handleInputChange(event, 'mail')}
              />
            </label>
            <label>
              危険度: {" "}
              <input
                type="text"
                value={figure.safety} //危険度
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
                  <td className="usersafety">{user.mail}</td> 
                  <td className="userposition">{user.safety}</td> 
                </tr>
              ))}
            </tbody>
          </table>
      </div>
  );
}

export default App;
