import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import ProductFeed from '@/components/ProductFeed'
import { getSession } from 'next-auth/react'
const inter = Inter({ subsets: ['latin'] })

export default function Home({ products }) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      
      <Header />

      <main className='max-w-screen-2xl mx-auto'>
        <Banner />
        
        <ProductFeed products={products} />
      </main>
    </div>
  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
    return {
      props : {
      products,session
    },
  };
}
