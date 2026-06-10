import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Stats from './components/Stats';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Blog from './components/Blog';

function App() {
  return (
    <div className="font-sans text-dark bg-white">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Blog />
      <Stats />
      <CTA />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;