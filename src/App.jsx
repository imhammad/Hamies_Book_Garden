import React from 'react'

import HeroSection from './components/HeroSection';
import BookGrid from './components/BookGrid';
import BookDetail from './components/BookDetail';

import { Routes, Route } from 'react-router-dom';
import SignUpButton from './components/SignUpButton';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import AuroraIntro from './components/AuroraIntro';

const App = () => {

  return (
      <div>
        <HeroSection />
        {/* <BookGrid />
        <BookDetail /> */}

        <AuroraIntro />
        

        <Routes>
          <Route path="/" element={<BookGrid />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>

        <Carousel />

        <Footer />
        
        {/* <section className='min-h-screen'></section>
        <section className='min-h-screen'></section> */}
      </div>
 
  )
}


export default App
