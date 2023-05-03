import { motion } from "framer-motion";

import { styles } from "../styles";
import { HannyaCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";

const demomode = false;
const demobox = demomode ? styles.demo.hero : {};

const Noh = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`} style={demobox}>
      <HannyaCanvas />
    </section>
  );
};

export default SectionWrapper(Noh, "noh");