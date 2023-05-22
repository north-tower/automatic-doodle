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
          <MainMap className="w-full h-1/2" />
        </section>
        <section className="flex-1 h-1/2 flex flex-wrap ">
          <div className="max-w-md mx-auto text-center sm:w-1/2 px-4">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum libero nec justo blandit, id convallis massa volutpat. Ut sit amet nibh at felis eleifend ultrices.</p>
            <p className="mb-4">Duis non lobortis quam. Ut nec ante eu tellus efficitur efficitur. Nullam eget libero sit amet nisi lobortis feugiat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum libero nec justo blandit, id convallis massa volutpat. Ut sit amet nibh at felis eleifend ultrices. Duis non lobortis quam. Ut nec ante eu tellus efficitur efficitur.</p>
          </div>
          <div className="max-w-md mx-auto text-center sm:w-1/2 px-4">
      <h1 className="text-3xl font-bold mb-4">Message Us</h1>

          <form>
      <div className="mb-4 ">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
        <input type="text" id="name" name="name" className="w-[350px] border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
        <input type="email" id="email" name="email" className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message:</label>
        <textarea id="message" name="message" className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
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
