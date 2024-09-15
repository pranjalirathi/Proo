import { features } from "../constants";
import styles, { layout } from "../style";
import bg from '../assets/bg11.png';

const FeatureCard = ({ icon: Icon, title, content }) => (
  <div className="flex flex-row p-2 feature-card">
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <Icon className="w-[50%] h-[50%] text-white" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const RoomDesc = () => (
  <section id="features" className={`${layout.section} sm:p-8 sm:pm-4 p-4 m-2`} style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Join the Room for a Code <br className="sm:block hidden" /> Where the Best Ideas Explode
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Coderoom is presenting all of the things together ever which a coder needs. We want you to connect with this, and make it one of the biggest platform ever present.
      </p>
    </div>

    <div className={`${layout.sectionImg} flex-col`} style={{
      border: '2px solid white',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '5px',
      marginTop: '20px'
    }}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </div>
  </section>
);

export default RoomDesc;


