import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import * as Location from 'expo-location';

const MapView = dynamic(() => import('react-map-gl'), { ssr: false });
import { Marker } from 'react-map-gl';

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Request location permission and get current location
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setCurrentLocation(location.coords);
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getLocation();
  }, []);

  return (
    <div className="container">
      {currentLocation ? (
        <MapView
          {...viewport}
          mapboxApiAccessToken="YOUR_MAPBOX_ACCESS_TOKEN"
          {...viewport}
          mapStyle="mapbox://styles/miki007/clgcabeu3001m01mmogi3u0wv"
          width="100%"
          height="400px"
        >
          <Marker
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
        </MapView>
      ) : (
        <p>Loading...</p>
      )}

      <style jsx>{`
        .container {
          flex: 1;
        }
        .map {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default MapScreen;
