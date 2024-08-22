import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

type Position = {
    id: string;
    latitude: number;
    longitude: number;
};

type MapComponentProps = {
    positions: Position[];
    googleMapsApiKey: string;
};

const MapComponent : React.FC<MapComponentProps> = ({ positions, googleMapsApiKey }) => {
    const containerStyle = {
        width: "100%",
        height: "400px",
    };

    const center = positions.length > 0 ? {
        lat: positions[0].latitude,
        lng: positions[0].longitude,
    } : {lat: 33.967225, lng: 134.350531}

return (
    <LoadScript googleMapsApiKey = {googleMapsApiKey}>
        <GoogleMap
            mapContainerStyle = {containerStyle}
            center = {center}
            zoom = {15}
        >
            {positions.map((position) => (
                <Marker 
                    key = {position.id}
                    position = {{lat: position.latitude, lng: position.longitude}} 
                />
            ))}
        </GoogleMap>
    </LoadScript>
);
};

export default MapComponent;