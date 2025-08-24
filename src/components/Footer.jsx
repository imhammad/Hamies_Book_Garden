import ParticlesBackground from './ParticlesBackground';
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Footer() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const ySpring = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <footer ref={ref} className="relative bg-#030712 text-white mt-16">
      {/* Motion wrapper for the main content */}
      <motion.div
        style={{ y: ySpring }}
        className="w-full relative h-[800px] bg-gradient-to-r from-[#FFB6C1] to-[#FF69B4] rounded-t-full flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Particles only inside half-circle */}
        <div className="absolute inset-0 z-0">
          <ParticlesBackground id="footerParticles" />
        </div>

        {/* Content above particles */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Heading */}
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-8 text-center max-w-lg">
            Ready to connect with us? Drop your email and message below.
          </p>

          {/* Contact Form */}
          <form className="w-full max-w-md space-y-4">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-white text-black focus:outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 rounded-lg bg-white text-black focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-black text-yellow-400 font-semibold hover:bg-gray-900 transition"
            >
              Send
            </button>
          </form>
        </div>

        {/* Bottom Text */}
      <div className="text-center py-6 mt-30">
        <p className="text-2xl text-black">Hammies © {new Date().getFullYear()}. All rights reserved.</p>
      </div>
      </motion.div>
    </footer>
      
  );
}

