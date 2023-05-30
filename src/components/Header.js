import Image from "next/image"


import { useRouter } from "next/router";


function Header() {


  const router = useRouter(); 
 

  return (
    <header className="sticky top-0 z-50">
        <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
          <div className="mt-2 flex items-center  rounded-l-md flex-grow sm:flex-grow-0">
          <Image 
    onClick={() => router.push('/')}
    src="https://i.postimg.cc/zf0SwbLq/IMG-20230429-WA0000.jpg"
    width={90}
    height={14}
    style={{objectFit:"contain"}}
    className="cursor-pointer rounded-full p-1"
/>

          </div>

          <div className="hidden sm:flex items-center h-10 rounded-md 
           bg-amazon_blue flex-grow">
            
          </div>

          <div className="text-white flex items-center 
          text-xs space-x-6 mx-6 whitespace-nowrap">
            <div  className="cursor-pointer link">
                <p className="hover:underline">
                  
                </p>
                <p onClick={() => router.push('/listings')}  className="md:text-sm">Listings</p>
            </div>

            <div className="link">
                <p  className="md:text-sm">About</p>
                
            </div>

            
          </div>
        </div>

        

    </header>  
  )
}

export default Header
