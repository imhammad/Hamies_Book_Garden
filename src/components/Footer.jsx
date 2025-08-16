import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white mt-16">
      {/* Half Circle Background */}
      <div className="w-full h-[500px] bg-yellow-700 rounded-t-full flex flex-col items-center justify-center px-6">
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
      <div className="text-center py-6 bg-black">
        <p className="text-sm">Hammies © {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
}
