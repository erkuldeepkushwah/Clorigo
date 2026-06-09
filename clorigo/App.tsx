import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BlueBanner from './components/BlueBanner';
import Stats from './components/Stats';
import AboutCompany from './components/AboutCompany';
import Services from './components/Services';
import Career from './components/Career';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <BlueBanner />
      <Stats />
      <AboutCompany />
      <Services />
      <Career />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;