import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './MainApp';
import { containerStyle, center } from './MainApp';
import { GoogleMap, Marker } from "@react-google-maps/api";
import '../component/GoogleMapComponent';
import { DocumentCounter } from './countDocuments'

type UserWithPosition = {
    id: string;
    name?: string;
    safety?: string;
    latitude: number;
    longitude: number;
    district: string;
}

type RescuePosition = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    doing: string;
}

type PublicServantPosition = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    doing: string;
}

const mapchange: { [key: string]: { lat: number; lng: number } } = {
    "神領": { lat: 33.96725162, lng: 134.35047543},
    "上分": { lat: 33.964313, lng: 134.2590853},
    "下分": { lat: 33.9598865, lng: 134.3070941},
    "阿野": { lat: 34.005311, lng: 134.355696},
    "鬼籠野": { lat: 33.9869602, lng: 134.371021}
};

const ListApp: React.FC = () => {
    const [usersWithPositions, setUsersWithPositions] = useState<UserWithPosition[]>([]);
    const [rescuePositions, setRescuePositions] = useState<RescuePosition[]>([]);
    const [publicservantPositions, setPublicServantPositions] = useState<PublicServantPosition[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterDistrict, setFilterDistrict] = useState<string>("");
    const [mapCenter, setMapCenter] = useState<{ lat: number, lng: number }>(center);
    const [isSafetyView, setIsSafetyView] = useState<boolean>(false);
    const [isMapView, setIsMapView] = useState<boolean>(false);
    const [isRescueView, setIsRescueView] = useState<boolean>(false);
    const [isPublicServantView, setIsPublicServantView] = useState<boolean>(false);
    const [selectedUserPosition, setSelectedUserPosition] = useState<{ lat: number, lng: number } | null>(null);
    
    const fetchUsersWithPositionsData = async () => {
        try {
            const usersCollection = collection(db, "citizen");
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as UserWithPosition[];

            console.log("Fetched Users With Positions:", usersList);

            const sameUsers: { [key: string]: UserWithPosition } = {};
            usersList.forEach(user => {
                if (user.id) {
                    sameUsers[user.id] = user;
                }
            });

        const sortedUsers = Object.values(sameUsers).sort((a, b) => {
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

    const fetchRescuePositionsData = async () => {
        try {
            const rescueCollection = collection(db, "rescue");
            const rescueSnapshot = await getDocs(rescueCollection);
            const rescueList = rescueSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as RescuePosition[];

            setRescuePositions(rescueList);
    }catch (error) {
        console.error("データの取得に失敗しました: ", error);
    }
    };

    const fetchPublicServantPositionsData = async () => {
        try {
            const publicservantCollection = collection(db, "publicservant");
            const publicservantSnapshot = await getDocs(publicservantCollection);
            const publicservantList = publicservantSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as PublicServantPosition[];

            setPublicServantPositions(publicservantList);
        }catch (error) {
            console.error("データの取得に失敗しました: ", error);
        }
    };

    const handleUserClick = async (latitude: number, longitude: number) => {
        setSelectedUserPosition({ lat: latitude, lng: longitude});
        setMapCenter({lat: latitude, lng:longitude});
        setIsMapView(true);
    }

    useEffect(() => {
        fetchUsersWithPositionsData();
        fetchRescuePositionsData();
        fetchPublicServantPositionsData();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterByDistrictSafety = (district: string) => {
        setFilterDistrict(district);
        setIsSafetyView(true);
        setIsMapView(false);
        setIsRescueView(false);
        setIsPublicServantView(false);
    };

    const handleFilterByDistrictMap = (district: string) => {
        setFilterDistrict(district);
        setIsSafetyView(false);
        setIsMapView(true);
        setIsRescueView(false);
        setIsPublicServantView(false);

        const location = mapchange[district];
        if (location) {
            setMapCenter(location);
        }
    };

    const filteredUsers = usersWithPositions.filter(user => {
        return (
            (!filterDistrict || user.district === filterDistrict) &&
            ((user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (user.safety && typeof user.safety === 'string' && user.safety.toLowerCase().includes(searchTerm.toLowerCase())))
    );
});

    const getMarkerIcon = (safety?: string) => {
        return {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: 'red',
            fillOpacity: 1,
            strokeColor: 'black',
            strokeWeight: 0
        };
    };

    const handleToggleRescueView = () => {
        setIsRescueView(!isRescueView);
    };

    const handleTogglePublicServantView = () => {
        setIsPublicServantView(!isPublicServantView);
    }

    return (
        <div>
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
                <button onClick={() => handleFilterByDistrictSafety("神領")}>神領</button>
                <button onClick={() => handleFilterByDistrictSafety("上分")}>上分</button>
                <button onClick={() => handleFilterByDistrictSafety("下分")}>下分</button>
                <button onClick={() => handleFilterByDistrictSafety("阿野")}>阿野</button>
                <button onClick={() => handleFilterByDistrictSafety("鬼籠野")}>鬼籠野</button>
            </div>
            <div className="mapdistrict">
                <label>地図</label>
                <button onClick={() => handleFilterByDistrictMap("神領")}>神領</button>
                <button onClick={() => handleFilterByDistrictMap("上分")}>上分</button>
                <button onClick={() => handleFilterByDistrictMap("下分")}>下分</button>
                <button onClick={() => handleFilterByDistrictMap("阿野")}>阿野</button>
                <button onClick={() => handleFilterByDistrictMap("鬼籠野")}>鬼籠野</button>
            </div>

            <div>
            <button onClick={handleToggleRescueView}>
                救助隊を表示
            </button>
            <button onClick={handleTogglePublicServantView}>
                役場職員を表示
            </button>
            </div>

            {isSafetyView && (
            <table border={1}>
                <thead>
                    <tr>
                        <th className="label">Name</th>
                        <th className="label">Safety</th>
                        <th className="label">Position</th>
                    </tr>
                </thead>
                <tbody className="citizentable">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td className="username">{user.name}</td>
                            <td className="usersafety">{user.safety}</td>
                            <td className="userposition">
                                <button onClick={() => handleUserClick(user.latitude, user.longitude)}>
                                    位置情報
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td colSpan={2}>該当する町民は見つかりません。</td>
                        </tr>
                )}
                </tbody>
            </table>
            )}
        
        {isMapView && (
            <div>
            <GoogleMap
                mapContainerStyle = {containerStyle}
                center = {selectedUserPosition || mapCenter}
                zoom = {15}
            >
                {usersWithPositions.map((position) => (
                    position.safety && position.safety !== "無事" ? (
                        <Marker
                            key = {position.id}
                            position = {{lat: position.latitude, lng: position.longitude}}
                            icon = {getMarkerIcon(position.safety!)}
                        />
                    ) : null
                ))}

                {filteredUsers.map((position) => (
                    <Marker 
                        key = {position.id}
                        position = {{lat: position.latitude, lng: position.longitude}} 
                        icon = {getMarkerIcon(position.safety)}
                    />
                ))}

                {isRescueView && (
                    rescuePositions.map(rescue => (
                        <Marker
                            key={rescue.id}
                            position={{ lat: rescue.latitude, lng: rescue.longitude }}
                        />
                    ))
                )}

                {isPublicServantView && (
                    publicservantPositions.map(publicservant => (
                        <Marker     
                            key={publicservant.id}
                            position={{ lat: publicservant.latitude, lng: publicservant.longitude }}
                        />

                    ))
                )}
            </GoogleMap> 

            <DocumentCounter />
            </div>
        )}
        </div>
    </div>
    )
};

export default ListApp;
