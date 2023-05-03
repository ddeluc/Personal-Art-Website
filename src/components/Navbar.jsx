import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { slideIn, textVariant } from "../utils/motion";

const demomode = false;
const demobox = demomode ? styles.demo.navbar : {};

const Navbar = () => {
  const [active, setActive] = useState("Noh"); 
  const [onCollection, setOnCollection] = useState(true);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-7 fixed top-0 z-20 bg-transparent`}
      style={demobox}
    >
      <div className='w-full flex justify-between items-center max-w-full mx-auto' style={demobox}>
        <Link
          to='/noh'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("Noh");
            window.scrollTo(0, 0);
          }}
        >
          <motion.p 
            className='text-white text-[36px] font-bold cursor-pointer flex ' 
            style={demobox}
            initial='hidden'
            whileInView='show'
          >
            Spezzare&nbsp;
            <motion.div 
              className='font-light'
              variants={textVariant(0.5)}
            > 
              { onCollection ? active : "" }
            </motion.div>
          </motion.p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`text-white hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => { 
                setActive(nav.title);
                setOnCollection(nav.collection);
                }
              }
              style={demobox}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
      </div>      
    </nav>
  ); 
}

export default Navbar;