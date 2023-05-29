import React, { useEffect, useState } from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import db from './firebase'

const GeolocationExample = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pinLocation, setPinLocation] = useState(null);
  const [description, setDescription] = useState("");

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "400px",
    latitude: 0,
    longitude: 0,
    zoom: 12,
  });

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      document.getElementById("demo").innerHTML =
        "Geolocation is not supported by this browser.";
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCurrentLocation({ lat: latitude, lng: longitude });
    document.getElementById("demo").innerHTML = `Latitude: ${latitude}<br>Longitude: ${longitude}`;
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude,
      longitude,
    }));
  };

  const handlePinLocation = (event) => {
    const { lngLat } = event;
    const { lng, lat } = lngLat;
    setPinLocation({ lat, lng });
    setCurrentLocation({ lat, lng });
  };
  const handleSubmit = e => {
    e.preventDefault();
    
    const data = {
      latitude: pinLocation ? pinLocation.lat : currentLocation.lat,
      longitude: pinLocation ? pinLocation.lng : currentLocation.lng,
      description: description,
    };
  
    db.collection("locations")
      .add(data)
      .then(() => {
        console.log("Location data added successfully!");
        // Reset form values
        setDescription("");
        setPinLocation(null);
      })
      .catch((error) => {
        console.error("Error adding location data: ", error);
      });
  };
  

  return (
    <div>
      <h1>Geolocation Example</h1>
      <p id="demo">Click the button to get your location.</p>
      <button onClick={getLocation}>Get Location</button>
      <div>
        {pinLocation && (
          <div align="left">
            <h3>Pinned Location:</h3>
            <p>Latitude: {pinLocation.lat}</p>
            <p>Longitude: {pinLocation.lng}</p>
          </div>
        )}
  
        <Map
          {...viewport}
          onViewportChange={(newViewport) => setViewport(newViewport)}
          onClick={handlePinLocation}
          style={{ width: 1000, height: 800 }}
          mapStyle="mapbox://styles/miki007/clgcabeu3001m01mmogi3u0wv"
          mapboxAccessToken={process.env.mapbox_key}
        >
          {currentLocation && (
            <Marker
              latitude={currentLocation.lat}
              longitude={currentLocation.lng}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div style={{ color: "blue", fontSize: "20px" }}>📌</div>
            </Marker>
          )}
  
          {pinLocation && (
            <Marker
              latitude={pinLocation.lat}
              longitude={pinLocation.lng}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div style={{ color: "red", fontSize: "20px" }}>📌</div>
            </Marker>
          )}
        </Map>
      </div>
  
      <h2>Add Location</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  
};

export default GeolocationExample;