import React from 'react';
import Header from '@/components/Header';
import db from '@/components/firebase';
import LocMap from '@/components/LocMap'

function Listings({ orders }) {
  return (
    <div>
      <Header />
      {/* Render your fetched data here */}
      <main className='flex-1'>
   
            <LocMap locations={orders} className="w-full h-1/2"/>
            
            </main>
    </div>
  );
}

export default Listings;

export async function getServerSideProps() {
  const stripeOrders = await db.collection('locations').get();
  const orders = await Promise.all(
    stripeOrders.docs.map(async order => ({
      id: order.id,
      description: order.data().description, 
      latitude: order.data().latitude, 
      longitude: order.data().longitude, 
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
