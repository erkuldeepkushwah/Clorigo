import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://uploads.onecompiler.io/4426xrepu/1781001921745/WhatsApp%20Image%202026-06-09%20at%203,35,53%20PM-Picsart-AiImageEnhancer.jpeg",
      title: "Extreme Services.\nExtraordinary Results.",
      subtitle: "Trusted by the most innovative companies worldwide for over a decade."
    },
    {
      image: "https://uploads.onecompiler.io/4426xrepu/1781003939724/image-Picsart-AiImageEnhancer%20(4).png",
      title: "Innovation That\nDrives Success.",
      subtitle: "Building the future of technology with precision and passion."
    }
  ];
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden text-white">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
             <div className="max-w-4xl border-l-4 border-white pl-8 md:pl-12 py-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight whitespace-pre-line mb-6">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-light">
                  {slide.subtitle.replace('decade.', '')} <span className="text-primary font-bold">decade.</span>
                </p>
             </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hover:bg-white/20 p-2 rounded-full transition-colors"
      >
        <ChevronLeft size={48} className="text-white opacity-70 hover:opacity-100" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 border-2 border-white p-3 hover:bg-white hover:text-black transition-all group"
      >
        <ChevronRight size={24} className="text-white group-hover:text-black" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
