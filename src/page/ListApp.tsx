import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './MainApp';
import { containerStyle, center } from './MainApp';
import { GoogleMap, Marker } from "@react-google-maps/api";
import '../component/GoogleMapComponent';

type Users = {
    id: string;
    name: string;
    safety: string;
};

type Position = {
    id: string;
    latitude: number;
    longitude: number;
    safety: string;
}

const ListApp: React.FC = () => {
    const [users, setUsers] = useState<Users[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);
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

    const fetchPositionsData = async () => {
        try {
        const positionsCollection = collection(db, "ume");
        const positionsSnapshot = await getDocs(positionsCollection);
        const positionsList = positionsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Position[];
        setPositions(positionsList);
    } catch (error) {
        console.error("Error fetching positions: ", error);
    }
};

    useEffect(() => {
        fetchUsersData();
        fetchPositionsData();
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

    {/*const getMarkerColor = (safety: string) => {
        if (safety === "救助が必要") {
            return purple;
        } else {
            return undefined;
        }
    };*/}

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
                    {searchTerm ? (
                        filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td className="username">{user.name}</td>
                            <td className="usersafety">{user.safety}</td>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td colSpan={3}>該当する町民は見つかりません。</td>
                        </tr>
                )
                ) : (
                    users.map(user => (
                        <tr key={user.id}>
                            <td className="username">{user.name}</td>
                            <td className="usersafety">{user.safety}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            <GoogleMap
                mapContainerStyle = {containerStyle}
                center = {center}
                zoom = {15}
                //onClick={handleMapClick}
            >
                {positions.map((position) => (
                    <Marker 
                        key = {position.id}
                        position = {{lat: position.latitude, lng: position.longitude}} 
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default ListApp;
