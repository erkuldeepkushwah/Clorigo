import React from 'react';

const BlueBanner: React.FC = () => {
  return (
    <section className="relative bg-blue-900 text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      
      {/* Skewed Bottom Edge - Visual Trick using Clip Path or SVG, here keeping it simple rectangle as per standard React/CSS without complex SVG for now, or using a negative margin container below. */}
      {/* Actually the design shows a white triangle overlay at the bottom. */}
      
      <div className="relative z-10 container mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Exploring the world of IT management.
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Read our insights on changing regulations and other technical topics.
        </p>
      </div>

      {/* White Triangle / Angled Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[60px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
            {/* This path creates the "cut out" effect or the white triangle rising up */}
            <path
                d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
                className="fill-white" // This would make a V shape downward if filled, we want upward.
                // Let's try a simple polygon for the white part.
                fill="#ffffff"
            ></path>
             <path d="M1200 0L0 0 598.97 114.72 1200 0z" className="fill-transparent"></path>
             {/* Actually, let's just use a simple polygon that covers the bottom left and right */}
        </svg>
         {/* Alternative simpler triangle approach using borders */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-l-[50vw] border-r-[50vw] border-b-[6vw] border-l-transparent border-r-transparent border-b-white w-0 h-0"></div>
      </div>
    </section>
  );
};

export default BlueBanner;
