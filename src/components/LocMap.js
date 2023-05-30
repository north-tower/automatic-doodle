import { useState } from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';
import 'mapbox-gl/dist/mapbox-gl.css';
import SmallCard from './SmallCard';

function MainMap({locations}) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = locations.map((result) => ({
    longitude: result.longitude,
    latitude: result.latitude,
  }));

  const center = getCenter(coordinates);

  const [viewState, setViewState] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 11,
  });

  return ( 
    <main className='flex flex-col h-screen'>
    <section className="flex-1">
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
     
      mapStyle="mapbox://styles/miki007/clgcabeu3001m01mmogi3u0wv"
      mapboxAccessToken={process.env.mapbox_key}
    >
      {locations.map(result => (
        <div key={result.longitude}>
          <Marker
            longitude={result.longitude}
            latitude={result.latitude}
            onClick={() => {
              setSelectedLocation(result);
            }}
          >
            <p
              role='img'
              className="cursor-pointer text-2xl animate-bounce"
              aria-label='push-pin'
            >📌</p>
          </Marker>

         
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.latitude}
              longitude={result.longitude}
            >
              <p className='mb-1'>{result.description}</p>
            </Popup>
        
        </div>
      ))}
    </Map>

    </section>
    <section className="flex-1 h-1/2 flex flex-wrap ">
    <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Listed Locations</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {locations?.map(({description,longitude,latitude}) => (
              <SmallCard key={description} description={description} latitude={latitude} longitude={longitude} />
            ))}
          </div>
        </section>
        </section>
    </main>
  );
}

export default MainMap;