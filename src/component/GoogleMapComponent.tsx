import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from './config';

const containerStyle = {
  width: '100%',
  height: '70vh'
};

const center = {
  lat: 33.96725162,
  lng: 134.35047543
};

const GoogleMapComponent: React.FC = () => {
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [clickPosition, setClickPosition] = useState<google.maps.LatLngLiteral | null>(null); // 座標状態追加

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
  });

  const directionsCallback = useCallback((result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
    if (status === 'OK' && result) {
      setDirectionsResponse(result);
    } else {
      setError(`Directions request failed due to ${status}`);
    }
  }, []);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(position);
      setClickPosition(position); // クリック位置を更新
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={() => console.log('Google Map loaded')}
            onClick={handleMapClick}
        >
          <DirectionsService
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
          )}
          {markerPosition && (
              <Marker position={markerPosition} />
          )}
          {error && <div>{error}</div>}
        </GoogleMap>
        {clickPosition && (
            <div>
              Clicked Position: Lng: {clickPosition.lng}, Lat: {clickPosition.lat}
            </div>
        )}
      </div>
  );
};

export default GoogleMapComponent;