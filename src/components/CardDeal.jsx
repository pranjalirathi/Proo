import topics from '../assets/topics.png'
import styles, { layout } from "../style";

const CardDeal = () => (
        <section className={layout.section} style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          <div className={layout.sectionInfo}>
            <h2 className={styles.heading2}>
              Find the communities <br className="sm:block hidden" /> and explore the network
            </h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
              Providing the most diverse culture of all of the languages in programming ever so that you can be at your best with different topics and varied rooms for it.
            </p>

          </div>

          <div className={layout.sectionImg}>
            <img src={topics} alt="billing" className="w-[100%] h-[100%]" />
          </div>
        </section>
);

export default CardDeal;