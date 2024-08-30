import React, { useEffect, useState, useCallback} from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Map from '../component/Map';
import './MainApp.css';
import '../component/GoogleMapComponent';
import { MapContext } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../component/config';
import { GoogleMap, Marker } from "@react-google-maps/api";
import { DirectionsService, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { initializeApp } from 'firebase/app';

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
    {/*const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
const [clickPosition, setClickPosition] = useState<google.maps.LatLngLiteral | null>(null); // 座標状態追加*/}

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

    const handleAdd = async () => {
        if (window.confirm("追加してもよろしいですか？")) {
            try {
                const newFigure = {
                    latitude: parseFloat(figure.latitude.toString()),
                    longitude: parseFloat(figure.longitude.toString()),
                    dangerlevel: figure.dangerlevel,
                    dangerkinds: figure.dangerkinds
                };
                await addDoc(collection(db, "positions"), newFigure);
                fetchPositionsData();
                setFigure({
                    latitude: figure.latitude,
                    longitude: figure.longitude,
                    dangerlevel: figure.dangerlevel,
                    dangerkinds: figure.dangerkinds,
                });
                
                alert("追加しました");
            } catch (error) {
                alert("失敗しました");
                console.error("Error adding document: ", error);
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("削除してもよろしいですか？")) {
            try {
                await deleteDoc(doc(db, "positions", id));
                fetchPositionsData();
                alert("削除しました");
            } catch (error) {
                alert("失敗しました");
                console.error("Error adding document: ", error);
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Figure) => {
        setFigure({
            ...figure,
            [field]: parseInt(event.target.value)
        });
    };

    {/*const directionsCallback = useCallback((result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
        if (status === 'OK' && result) {
          setDirectionsResponse(result);
        } else {
          setError(`Directions request failed due to ${status}`);
        }
      }, []);*/}

      const handleMapClick = useCallback(async (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          setMarkerPosition(position);
          //setClickPosition(position); // クリック位置を更新

          try {
            const nerFigure = {
                latitude: position.lat,
                longitude: position.lng,
                dangerlevel: figure.dangerlevel,
                dangerkinds: figure.dangerkinds
            };
            await addDoc(collection(db, "positions"), nerFigure);
            fetchPositionsData();
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
                {/*<DirectionsService
              options={{
                destination: 'Kamiyama, Tokushima, Japan',
                origin: 'Tokushima, Japan',
                travelMode: google.maps.TravelMode.DRIVING
              }}
              callback={directionsCallback}
          />
          {directionsResponse && (
              <DirectionsRenderer
                  options={{
                    directions: directionsResponse
                  }}
              />
                )}*/}
                {positions.map((position) => (
                    <Marker 
                        key = {position.id}
                        position = {{lat: position.latitude, lng: position.longitude}} 
                    />
                ))}
                {markerPosition && (
              <Marker position={markerPosition} />
          )}
          {/*{error && <div>{error}</div>}*/}
            </GoogleMap>
        {/*{clickPosition && (
            <div>
              Clicked Position: Lng: {clickPosition.lng}, Lat: {clickPosition.lat}
            </div>
        )}*/}
        <Map 
            figure={figure}
            handleInputChange={handleInputChange}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            positions={positions}
         />
        {/*{error && <div>(error)</div>}*/}
         </div>
    );
};

export default MainApp;
