import React,{useRef} from 'react'
import hero from "../images/hero.png"
import About from './About'
import Card from './Card'
import AllCards from './AllCards'
import Contactus from './Contactus'
const HeroSection = () => {
  const targetRef = useRef(null);
  const scrollToElement = () => {
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
    <div className="w-full  text-white" style={{
     background: "linear-gradient(90deg, rgba(131, 126, 226, 1) 24%, rgba(114, 114, 226, 1) 58%, rgba(0, 212, 255, 1) 100%)"
   }}>
     <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
       <img className="xl:w-40 lg:w-36 md:w-32 sm:w-32 w-32  object-cover object-center" alt="hero" src={hero} />
       <div className="text-center lg:w-5/12 w-full">
         <h1 className="my-2 xl:text-5xl lg:5xl md:text-4xl sm:xl:text-5xl text-4xl font-bold leading-tight pb-2">
            Tie The Knot With Our Website For Free
         </h1>
         <p className="text-2xl mb-8">
           A website to find your <span className='font-bold text-1xl'>Dream Partner</span>
         </p>
         <div className="flex justify-center mx-auto">
           <button
             className="hover:underline bg-white text-gray-800 font-bold rounded-full  py-4 px-8" onClick={scrollToElement}>
             Satisfied Clients
           </button>
           <button
             className="ml-4 hover:underline bg-white text-gray-800 font-bold rounded-full  py-4 px-8">
             Get Started
           </button>
         </div>
       </div>
     </div>
   </div>
    <About/>
    <div ref={targetRef}>
    <h1 className="my-5 mx-8 text-cyan-500 xl:text-5xl lg:5xl md:text-4xl sm:xl:text-5xl text-4xl font-bold leading-tight pb-2">
            Our Clients
         </h1>
    <AllCards/>
    </div>
    <Contactus/>
    </>

  )
}

export default HeroSection