import React from 'react'
import EarthSection from '../components/EarthSection'
import About from '../components/About'
import About2 from '../components/About2'
import Developers from '../components/Developers'
import HeroSection from '../components/HeroSection'


const HomePage = () => {
  return (
    <div>
         <HeroSection/>
         <About2/>
         <About/>
         <Developers/>
         <EarthSection/>
    </div>
  )
}

export default HomePage
