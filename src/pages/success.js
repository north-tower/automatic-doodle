import Header from '@/components/Header'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React from 'react'

function success() {
    const router = useRouter();

  return (
    <div className='bg-gray-100 h-screen'>
        <Header />

        <main className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col p-10 bg-white'>
                <div className='flex items-center space-x-2 mb-5'>
                    <CheckCircleIcon className='text-green-500 h-10' />
                    <h1 className='text-3xl'>
                        Thank you, your location has been confirmed!
                    </h1>
                </div>
                <p>
                    Thank you.We'll send a confirmation that the location has been added,
                    if you would like to confirm the status of the location(s) please press the link below.
                </p>
                <button onClick={() => router.push("/listings")} className='button mt-8'>Go to listings</button>
            </div>

        </main>
    </div>
  )
}

export default success