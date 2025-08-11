'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/cloudAnimations.css';

import cloud1 from '../assets/cloud1.png';
import cloud2 from '../assets/cloud2.png';
import cloud3 from '../assets/cloud3.png';
import cloud4 from '../assets/cloud4.png';
import cloud5 from '../assets/cloud5.png';
import moon from '../assets/moon.png';
import land from '../assets/land.png';
import grass from '../assets/grass.png';
import background from '../assets/background.png';
import mountain from '../assets/mountain.png';
import sideMountains from '../assets/side_mountains.png';
import SignUpButton from './SignUpButton';

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Bigger motion ranges for stronger parallax
  const yMoon = useTransform(scrollY, [0, 500], [0, 80]);
  const yMountains = useTransform(scrollY, [0, 500], [0, 60]);
  const yGrass = useTransform(scrollY, [0, 500], [0, -50]);
  const yLand = useTransform(scrollY, [0, 500], [0, 40]);

  const xCloud = useTransform(scrollY, [0, 500], [0, 100]);
  const yCloud = useTransform(scrollY, [0, 500], [0, 50]);

  const springConfig = { type: 'spring', stiffness: 50, damping: 15, mass: 1.5 };

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden bg-black">

      {/* Background */}
      <motion.img
        src={background}
        alt="background"
        className="absolute w-full h-full object-cover z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="absolute top-0 right-0 p-4 z-50">
        <SignUpButton />
      </div>

      {/* Moon */}
      <motion.img
        style={{ y: yMoon }}
        transition={springConfig}
        src={moon}
        alt="moon"
        className="absolute top-[22%] left-[24%] w-[640px] z-10"
      />

      {/* Side Mountains */}
      <motion.img
        style={{ y: yMountains }}
        transition={springConfig}
        src={sideMountains}
        alt="side-mountains"
        className="absolute bottom-0 w-full z-35"
      />

      {/* Central Mountain */}
      <motion.img
        style={{ y: yMountains }}
        transition={springConfig}
        src={mountain}
        alt="mountain"
        className="absolute bottom-0 left-0 w-[80%] z-20"
      />

      {/* Land */}
      <motion.img
        style={{ y: yLand }}
        transition={springConfig}
        src={land}
        alt="land"
        className="absolute bottom-0 w-full z-30"
      />

      {/* Grass */}
      <motion.img
        style={{ y: yGrass }}
        transition={springConfig}
        src={grass}
        alt="grass"
        className="absolute bottom-[-30px] left-0 w-full scale-[1.4] z-40"
      />

      {/* Clouds */}
      {[cloud1, cloud2, cloud3, cloud4, cloud5].map((cloud, i) => (
        <motion.img
          key={i}
          style={{ x: xCloud, y: yCloud }}
          transition={springConfig}
          src={cloud}
          alt={`cloud${i+1}`}
          className={`cloud cloud${i+1}`}
        />
      ))}

      {/* Title */}
      <div className="absolute bottom-[10%] w-full text-center z-50">
        <h1 className="text-white text-5xl font-bold drop-shadow-lg">
          Hammie’s Book Garden
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
