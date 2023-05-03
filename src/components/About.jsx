import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";

const demomode = false;
const demobox = demomode ? styles.demo.hero : {};

const About = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`} style={demobox}>
      About
    </section>
  );
};

export default SectionWrapper(About, "about");