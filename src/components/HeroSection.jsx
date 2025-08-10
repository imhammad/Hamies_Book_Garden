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

  // Parallax transforms
  const yMoon = useTransform(scrollY, [0, 300], [0, 30]);
  const yMountains = useTransform(scrollY, [0, 300], [0, 20]);
  const yGrass = useTransform(scrollY, [0, 300], [0, -20]);
  const yLand = useTransform(scrollY, [0, 300], [0, 10]);

  const xCloud = useTransform(scrollY, [0, 300], [0, 40]);
  const yCloud = useTransform(scrollY, [0, 300], [0, 20]);

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

      <div className='absolute top-0 right-0 p-4 z-50'>
         <SignUpButton />
      </div>
     

      

      {/* Moon */}
      <motion.img
        style={{ y: yMoon }}
        src={moon}
        alt="moon"
        className="absolute top-[22%] left-[24%] w-[640px] z-10"
      />

      {/* Side Mountains */}
      <motion.img
        style={{ y: yMountains }}
        src={sideMountains}
        alt="side-mountains"
        className="absolute bottom-0 w-full z-35"
      />

      {/* Central Mountain */}
      <motion.img
        style={{ y: yMountains }}
        src={mountain}
        alt="mountain"
        className="absolute bottom-0 left-0 w-[80%] z-20"
        transition={{ type: 'spring', stiffness: 80 }}
      />

      {/* Land */}
      <motion.img
        style={{ y: yLand }}
        src={land}
        alt="land"
        className="absolute bottom-0 w-full z-30"
      />

      {/* Grass (fills full width + transition) */}
      <motion.img
        style={{ y: yGrass }}
        src={grass}
        alt="grass"
        className="absolute bottom-[-30px] left-0 w-full scale-[1.4] z-40"
      />

      {/* Clouds (parallax X + Y movement) */}
      <motion.img
        style={{ x: xCloud, y: yCloud }}
        src={cloud1}
        alt="cloud1"
        className="cloud cloud1"
      />
      <motion.img
        style={{ x: xCloud, y: yCloud }}
        src={cloud2}
        alt="cloud2"
        className="cloud cloud2"
      />
      <motion.img
        style={{ x: xCloud, y: yCloud }}
        src={cloud3}
        alt="cloud3"
        className="cloud cloud3"
      />
      <motion.img
        style={{ x: xCloud, y: yCloud }}
        src={cloud4}
        alt="cloud4"
        className="cloud cloud4"
      />
      <motion.img
        style={{ x: xCloud, y: yCloud }}
        src={cloud5}
        alt="cloud5"
        className="cloud cloud5"
      />

      {/* Title */}
      <div className="absolute bottom-[10%] w-full text-center z-50">
        <h1 className="text-white text-5xl font-bold drop-shadow-lg">Hammie’s Book Garden</h1>
      </div>
    </div>
  );
};

export default HeroSection;
