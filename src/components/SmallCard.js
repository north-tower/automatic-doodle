import React from 'react'
import Image from 'next/image'

function SmallCard({description,longitude,latitude}) {
  return (
    <div className='flex items-center m-2 mt-5 space-x-4 rounded-xl 
    cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out'>
        <div className='relative h-16 w-16'>
            <Image src='https://static.thenounproject.com/png/3918712-200.png' layout='fill' className='rounded-lg' />
        </div>

        <div>
            <h2>{description}</h2>
            <h3 className='text-gray-500'>{longitude}, {latitude}</h3>
        </div>
    </div>
  )
}

export default SmallCard