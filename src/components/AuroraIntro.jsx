import React, { useEffect } from 'react'

import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion'


const colors = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const AuroraIntro = () => {

    const color = useMotionValue(colors[0])
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color} )`

    useEffect(() => {
        animate(color, colors, {
            ease: 'easeInOut',
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror"
        })

    }, [])


  return (
    <motion.section 
    style={{
        backgroundImage,
    }}
    className='relative grid min-h-screen place-content-center overflow-hidden bg-gray-950
    px-4 py-24 text-gray-200'>

        <div className='realtive z-10 flex flex-col items-center'>
            <span className='mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm'>
                Read Us Out!
            </span>
            <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text
            text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight
            md:text-7xl md:leading-tight"> 
                We read between the lines, so you can fall between the pages.
            </h1>
            <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
                The story's beating heart, the reader's final word.
                Your next literary journey begins here.
            </p>

        </div>

    </motion.section>
  )
}

export default AuroraIntro
