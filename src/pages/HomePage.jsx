import React from 'react'
import HeroSectionFinal from '../components/HeroSectionFinal';
import Roadmap from "../components/Roadmap";
import RoomDesc from "../components/RoomDesc";
import Languages from "../components/Languages";
import CTA from "../components/CTA";
import styles from "../style";
import CardDeal from "../components/CardDeal";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <HeroSectionFinal />

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <CardDeal />
          <Languages />
          <RoomDesc />
          <Roadmap />
          <CTA />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
