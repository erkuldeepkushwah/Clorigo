import React from 'react';

const CTA: React.FC = () => {
  const bgImage = "https://www.clarigoinfotech.com/assets/images/content-bottom-bg.jpg";

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="cta" className="relative py-24 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* Overlay to fade the background image so text is readable */}
      <div className="absolute inset-0 bg-white/90"></div> 
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block mb-3">
           <p className="text-gray-500 text-sm font-medium mb-1">Let’s get started</p>
           <div className="h-0.5 w-full bg-primary mx-auto"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 max-w-2xl mx-auto leading-tight">
          Are you ready for a better, more productive business?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-light">
          Stop worrying about technology problems. Focus on your business. Let us provide the support you deserve.
        </p>
        <a 
          href="#contact" 
          onClick={handleContactClick}
          className="inline-block bg-primary text-white font-bold py-3 px-8 rounded shadow-lg hover:bg-red-700 transition-transform hover:scale-105"
        >
          Contact us Now
        </a>
      </div>
    </section>
  );
};

export default CTA;