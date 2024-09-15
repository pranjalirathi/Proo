import styles from "../style";
import { Link } from 'react-router-dom';
import Button2 from "./Button2";
import videoSrc from "../assets/cards-video.webm";

const CTA = () => (
  <>
    <div className="video-container">
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        className="w-full h-auto"
        style={{ marginBottom: "20px", borderRadius: "20px" }}
      />
    </div>
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} overflow-hidden sm:flex-row flex-col bg-black-gradient-2 rounded-[20px]`}
      style={{
        boxShadow:
          "0 0 20px rgba(255, 99, 132, 0.4), 0 0 20px rgba(54, 162, 235, 0.4), 0 0 20px rgba(153, 102, 255, 0.5)",
        margin: "20px", 
        padding: "20px", 
      }}
    >
      <div className="flex-1 flex flex-col sm:text-left text-center">
        <h2 className={`${styles.heading2} sm:text-4xl text-2xl`}>
          Ready to get started with us? 
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 sm:mx-0 mx-auto`}>
          Starting with the room which is only filled with code...in 3 2 1 and 
        </p>
      </div>

      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <Link to="/test">
          <Button2 />
        </Link>
      </div>
    </section>
  </>
);

export default CTA;
