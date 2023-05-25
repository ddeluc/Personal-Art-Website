import { motion } from "framer-motion";

import { styles } from "../styles";
import { HannyaCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";

const demomode = true;
const demobox = demomode ? styles.demo.hero : {};

const Noh = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`} style={demobox}>
      <div
        style={demobox}
        className={`absolute top-[120px] py-20 max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div style={demobox}>
          <h1 
            
            className={`${styles.heroSubText} text-white`}
          >
            *Artwork List*
          </h1>
        </div>
      </div>

      <HannyaCanvas />      
    </section>
  );
};

export default SectionWrapper(Noh, "noh");