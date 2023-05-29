import Head from 'next/head'
import Header from '@/components/Header'
import MainMap from '../components/MainMap'

export default function Home({ products }) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Trackie</title>
      </Head>
      
      <Header />

      <main className='max-w-screen-2xl mx-auto'>
        <MainMap />
      </main>
    </div>
  )
}



