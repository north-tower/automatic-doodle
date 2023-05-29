import '@/styles/globals.css'

import { SessionProvider as AuthProvider } from "next-auth/react"

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
    
          <Component {...pageProps} />
   
    </AuthProvider>
 
  )
}
