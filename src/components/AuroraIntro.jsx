import React from 'react'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'


const colors = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const AuroraIntro = () => {

    const color = useMotionValue(colors[0])
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color} )`
  return (
    <motion.section 
    style={{
        backgroundImage,
    }}
    className='relative grid min-h-screen place-content-center overflow-hidden bg-gray-950
    px-4 py-24 text-gray-200'>

    </motion.section>
  )
}

export default AuroraIntro
