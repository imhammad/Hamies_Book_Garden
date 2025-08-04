import React from 'react'

import HeroSection from './components/HeroSection';
import BookGrid from './components/BookGrid';
import BookDetail from './components/BookDetail';

import { Routes, Route } from 'react-router-dom';

const App = () => {

  return (
      <div>
        <HeroSection />
        {/* <BookGrid />
        <BookDetail /> */}

        <Routes>
          <Route path="/" element={<BookGrid />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
        
        {/* <section className='min-h-screen'></section>
        <section className='min-h-screen'></section> */}
      </div>
 
  )
}


export default App
