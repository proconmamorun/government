import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './MainApp';
import { containerStyle, center } from './MainApp';
import { GoogleMap, Marker } from "@react-google-maps/api";
import '../component/GoogleMapComponent';

type UserWithPosition = {
    id: string;
    name?: string;
    safety?: string;
    latitude: number;
    longitude: number;
    district: string;
}

const 

const ListApp: React.FC = () => {
    const [usersWithPositions, setUsersWithPositions] = useState<UserWithPosition[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterDistrict, setFilterDistrict] = useState<string>("");
    
    const fetchUsersWithPositionsData = async () => {
        try {
            const usersCollection = collection(db, "citizen");
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as UserWithPosition[];

            console.log("Fetched Users With Positions:", usersList);

        const sortedUsers = usersList.sort((a, b) => {
        if (a.safety === "救助が必要" && b.safety !== "救助が必要") return -1;
        if (a.safety !== "救助が必要" && b.safety === "救助が必要") return 1;
        if (a.safety === "無事" && b.safety !== "無事") return -1;
        if (a.safety !== "無事" && b.safety === "無事") return 1;
        return 0;
    });
        setUsersWithPositions(sortedUsers);
    }catch (error) {
        console.error("データの取得に失敗しました: ", error);
    }
    };

    useEffect(() => {
        fetchUsersWithPositionsData();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterByDistrict = (district: string) => {
        setFilterDistrict(district);
    };

    const filteredUsers = usersWithPositions.filter(user => {
        return (
            (!filterDistrict || user.district === filterDistrict) &&
            ((user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (user.safety && user.safety.toLowerCase().includes(searchTerm.toLowerCase())))
    );
});

    {/*
    const getMarkerColor = (safety: string) => {
        if (safety === "救助が必要") {
            return 'purple';
        } else {
            return undefined;
        }
    };
*/}

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
            </div>
            <div className="safetydistrict">
                <label>安否</label>
                <button onClick={() => handleFilterByDistrict("神領")}>神領</button>
                <button onClick={() => handleFilterByDistrict("上分")}>上分</button>
                <button onClick={() => handleFilterByDistrict("下分")}>下分</button>
                <button onClick={() => handleFilterByDistrict("阿野")}>阿野</button>
                <button onClick={() => handleFilterByDistrict("鬼籠野")}>鬼籠野</button>
            </div>
            <div className="mapdistrict">
                <label>地図</label>
                
            </div>

            <table border={1}>
                <thead>
                    <tr>
                        <th className="label">Name</th>
                        <th className="label">Safety</th>
                    </tr>
                </thead>
                <tbody className="citizentable">
                        {filteredUsers.length > 0 ? (
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
                )}
                </tbody>
            </table>

            <GoogleMap
                mapContainerStyle = {containerStyle}
                center = {center}
                zoom = {15}
            >
                {filteredUsers.map((position) => (
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
