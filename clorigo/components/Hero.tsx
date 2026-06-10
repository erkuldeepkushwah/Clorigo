import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: "https://www.clarigoinfotech.com/assets/images/banner_soft.jpg",
    title: "Innovative Ideas.\nOutstanding Services.",
    subtitle: "A blend of innovation and suitable technology to design market winning software services."
  },
  {
    id: 2,
    image: "https://www.clarigoinfotech.com/assets/images/clarigo-home-company-03.jpg",
    title: "Extreme Services.\nExtraordinary Results.",
    subtitle: "Trusted by the most innovative companies worldwide for over a <span class='text-primary font-bold'>decade.</span>"
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden bg-black group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={slide.image} 
              alt={`Slide ${slide.id}`} 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50" /> 
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-6 relative h-full flex items-center">
            <div className="max-w-5xl mt-16 md:mt-0">
              <div className={`transition-all duration-700 delay-300 transform ${index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                
                {/* Text Box with "Bracket" Border Style matched to reference */}
                <div className="relative pl-10 py-10 md:pl-16 md:py-12">
                  
                  {/* Left Vertical Border (Full Height) */}
                  <div className="absolute left-0 top-0 h-full w-[6px] bg-white shadow-sm"></div>
                  
                  {/* Top Horizontal Border (Partial) */}
                  <div className="absolute left-0 top-0 w-[60%] md:w-[450px] h-[6px] bg-white shadow-sm"></div>
                  
                  {/* Bottom Horizontal Border (Partial) */}
                  <div className="absolute left-0 bottom-0 w-[30%] md:w-[180px] h-[6px] bg-white shadow-sm"></div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-xl whitespace-pre-line tracking-tight">
                    {slide.title}
                  </h1>
                  
                  {/* Subtitle */}
                  <p 
                    className="text-lg md:text-2xl text-gray-100 max-w-2xl font-normal leading-relaxed tracking-wide drop-shadow-md"
                    dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 md:left-10 transform -translate-y-1/2 z-30 text-white/50 hover:text-white transition-colors p-2 hidden md:block hover:scale-110"
      >
        <ChevronLeft size={48} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 md:right-10 transform -translate-y-1/2 z-30 border-2 border-white p-3 text-white hover:bg-primary hover:border-primary transition-all md:opacity-100 hover:scale-105"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary w-8' : 'bg-white/50 w-2 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;