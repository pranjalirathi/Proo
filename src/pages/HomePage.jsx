import React from 'react'
import HeroSectionFinal from '../components/HeroSectionFinal';
import Roadmap from "../components/Roadmap";
import RoomDesc from "../components/RoomDesc";
import Languages from "../components/Languages";
import CTA from "../components/CTA";
import styles from "../style";
import CardDeal from "../components/CardDeal";
import Footer from "../components/Footer";
import RevealAnimation from '../components/RevealAnimation';

const HomePage = () => {
  return (
    <>
      <RevealAnimation><HeroSectionFinal/></RevealAnimation>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <RevealAnimation><CardDeal /></RevealAnimation>
          <RevealAnimation><Languages/></RevealAnimation>
          <RevealAnimation><RoomDesc /></RevealAnimation>
          <RevealAnimation><Roadmap /></RevealAnimation>
          <RevealAnimation><CTA /></RevealAnimation>          
        </div>
      </div>
      
      <RevealAnimation><Footer/></RevealAnimation>
    </>
  )
}

export default HomePage
