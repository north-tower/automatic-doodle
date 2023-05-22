/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images :{
    domains:["links.papareact.com","fakestoreapi.com","i.postimg.cc"]
}, eslint: {
  ignoreDuringBuilds: true,
},
env: {
   stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
   mapbox_key: 'pk.eyJ1IjoibWlraTAwNyIsImEiOiJjbGNxNHd2aGkwMmg1M29reWd2ZGJod2M1In0.f9-OPY7z8IFoBGwdM7zUZw'
},

} ,{nextConfig}

