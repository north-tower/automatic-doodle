import React, { useState, useEffect } from 'react';
import MapGL, { GeolocateControl, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function MainMap() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 0, // Initial latitude value
    longitude: 0, // Initial longitude value
    zoom: 13,
  });
  
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Fetch user's location or use any other method to obtain it
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setViewport((prevState) => ({
          ...prevState,
          latitude,
          longitude,
        }));
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  return (
    <MapGL
      {...viewport}
      mapStyle="mapbox://styles/miki007/clgcabeu3001m01mmogi3u0wv"
      mapboxApiAccessToken="pk.eyJ1IjoibWlraTAwNyIsImEiOiJjbGNxNHd2aGkwMmg1M29reWd2ZGJod2M1In0.f9-OPY7z8IFoBGwdM7zUZw"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {userLocation && (
        <Marker
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
        >
          <p role="img" className="cursor-pointer text-2xl animate-bounce" aria-label="push-pin">
            📌
          </p>
        </Marker>
      )}

      {/* Additional markers and other components */}
    </MapGL>
  );
}

export default MainMap;
