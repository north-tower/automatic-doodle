import Header from '@/components/Header'
import React from 'react'
import { useRouter } from 'next/router'
import MainMap from '@/components/MainMap'

function about() {
  return (
    <div>
      <Header />

      <main className='flex flex-col h-screen'>
        <section className="flex-1">
            <div className="w-full h-1/2">
            <Map
          {...viewport}
          onViewportChange={(newViewport) => setViewport(newViewport)}
          onClick={handlePinLocation}
          style={{ width: 1400, height: 600 }}
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
        </section>
        <section className="flex-1 h-1/2 flex flex-wrap ">
          <div className="max-w-md mx-auto text-center sm:w-1/2 px-4">
            <h1 id="demo" className="text-3xl font-bold mb-4">Get Location</h1>
      <button onClick={getLocation}>Get Location</button>
            <p className="mb-4"></p>
            <p className="mb-4">Duis non lobortis quam. Ut nec ante eu tellus efficitur efficitur. Nullam eget libero sit amet nisi lobortis feugiat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum libero nec justo blandit, id convallis massa volutpat. Ut sit amet nibh at felis eleifend ultrices. Duis non lobortis quam. Ut nec ante eu tellus efficitur efficitur.</p>
          </div>
          <div className="max-w-md mx-auto text-center sm:w-1/2 px-4">
      <h1 className="text-3xl font-bold mb-4">Message Us</h1>

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