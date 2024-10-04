import React, { useEffect, useState, useCallback} from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './MainApp.css';
import '../component/GoogleMapComponent';
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useJsApiLoader } from '@react-google-maps/api';

type Position = {
    id: string;
    latitude: number;
    longitude: number;
    dangerlevel: number;
    dangerkinds: number;
};

interface Figure {
    latitude: number;
    longitude: number;
    dangerlevel: number;
    dangerkinds: number;
}

const containerStyle = {
    width: '100%',
    height: '70vh'
  };

const center = {
    lat: 33.96725162, 
    lng: 134.35047543
};

const MainApp: React.FC = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [markerPosition, setMarkerPosition] =useState<google.maps.LatLngLiteral | null>(null);
    const [figure, setFigure] = useState<Figure>({
        latitude: 0,
        longitude: 0,
        dangerlevel: 0,
        dangerkinds: 0
    });

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
    });

    //ピンの情報を取得
    const fetchPositionsData = async () => {
        try {
        const positionsCollection = collection(db, "positions");
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
        fetchPositionsData();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Figure) => {
        setFigure({
            ...figure,
            [field]: parseInt(event.target.value)
        });
    };

      const handleMapClick = useCallback(async (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          try {
            const newFigure = {
                latitude: position.lat,
                longitude: position.lng,
                dangerlevel: figure.dangerlevel,
                dangerkinds: figure.dangerkinds
            };
            if (newFigure.dangerlevel === 0 || newFigure.dangerkinds === 0) {
                alert("危険度と危険の種類を設定してください");
                return;
            }
            await addDoc(collection(db, "positions"), newFigure);
            fetchPositionsData()
            setFigure({
                latitude: 0,
                longitude: 0,
                dangerlevel: 0,
                dangerkinds: 0
            });
            }catch (error) {
            console.error("Error adding document: ", error);
          }
        }
      }, [figure]);


    if (!isLoaded) {
        return <div>Loading...</div>;
      }

    return (
        <div className="citizen_map">
            <GoogleMap
                mapContainerStyle = {containerStyle}
                center = {center}
                zoom = {15}
                onClick={handleMapClick}
            >
                {positions.map((position) => (
                    <Marker 
                        key = {position.id}
                        position = {{lat: position.latitude, lng: position.longitude}} 
                        label={{
                            text: String(position.dangerlevel),
                            fontSize: "16px",
                            color: "black"
                        }}
                    />
                ))}
            </GoogleMap>
        <div>
            <h2>位置情報の追加</h2>
            <label>
                危険度:{" "}
                <input
                    type="number"
                    value={figure.dangerlevel}
                    onChange={(event) => handleInputChange(event, 'dangerlevel')}
                />
            </label>
            <label>
                危険の種類:{" "}
                <input
                    type="number"
                    value={figure.dangerkinds}
                    onChange={(event) => handleInputChange(event,'dangerkinds')}
                />
            </label>
    </div>
         </div>
    );
};

export default MainApp;
export { containerStyle, center };