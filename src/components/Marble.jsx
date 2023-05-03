import { motion } from "framer-motion";

import { styles } from "../styles";
import { MarbleCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";

const demomode = false;
const demobox = demomode ? styles.demo.hero : {};

const Marble = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`} style={demobox}>
      <MarbleCanvas />
    </section>
  );
};

export default SectionWrapper(Marble, "marble");