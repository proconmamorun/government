import React, { useState } from 'react';
import logo from './logo.svg';
import GoogleMapReact from "google-map-react";
import './App.css';

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const initialMapProps: MapProps = {
  center: {
    lat: 35.39,
    lng: 139.44,
  },
  zoom: 18,
};

const API_KEY = "AIzaSyDF8X7wYvLceDxjE9zss4vdo9GUgoBFWPQ";

function App() {
  const [mapProps, setMapProps] = useState<MapProps>(initialMapProps);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        center={mapProps.center}
        zoom={mapProps.zoom}
      />
    </div>
  );
}

export default App;
