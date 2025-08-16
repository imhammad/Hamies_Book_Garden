import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-yellow-600 text-white mt-16">
      {/* Oval Shape */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-64 text-yellow-600"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,224L1440,320L1440,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="mb-8 text-center max-w-lg">
          Ready to connect with us? Drop your email and message below.
        </p>

        <form className="w-full max-w-md space-y-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg text-black focus:outline-none"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 rounded-lg text-black focus:outline-none"
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
      <div className="relative z-10 text-center py-6 border-t border-yellow-500">
        <p className="text-sm">Hammies © {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
}
