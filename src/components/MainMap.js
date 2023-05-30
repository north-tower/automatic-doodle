import React, { useEffect, useState } from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import db from './firebase'
import { useRouter } from "next/router";


function about() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [pinLocation, setPinLocation] = useState(null);
    const [description, setDescription] = useState("");
    const router = useRouter(); 
  
    const [viewport, setViewport] = useState({
      
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
          router.push("/success");
        })
        .catch((error) => {
          console.error("Error adding location data: ", error);
        });
        
    };
    
  return (
    <div>
     

      <main className='flex flex-col h-screen'>
        <section className="flex-1">
        
            <Map
          {...viewport}
          onViewportChange={(newViewport) => setViewport(newViewport)}
          onClick={handlePinLocation}
        
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
          
        </section>
        <section className="flex-1 h-1/2 flex flex-wrap ">
          <div className="max-w-md mx-auto text-center sm:w-1/2 px-4">
      <h1 className="text-3xl font-bold mb-4">Submit Location</h1>
      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={getLocation}>Get Current Location</button>
          <form onSubmit={handleSubmit}>
      <div className="mb-4 ">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Description:</label>
        <input type="text"  id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
             className="w-[350px] border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
    </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default about