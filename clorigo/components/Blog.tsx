import React from 'react';

const Blog: React.FC = () => {
  // Specific image provided by user matching the reference design
  const bgImage = "https://isaiahcounselingandwellness.com/wp-content/uploads/2018/06/Tryzens-Blog-Page-Banner.jpg";

  return (
    <section id="blog" className="bg-white">
      {/* Banner Section */}
      <div className="relative py-32 md:py-48 flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
           {/* Blue Overlay to match corporate style */}
          <div className="absolute inset-0 bg-[#1e3a8a]/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg leading-tight tracking-tight">
            Exploring the world of IT management.
          </h2>
          <p className="text-lg md:text-xl font-medium text-gray-200 drop-shadow-md max-w-3xl mx-auto tracking-wide">
            Read our insights on changing regulations and other technical topics.
          </p>
        </div>

        {/* Angled White Shape at Bottom */}
         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
             <svg 
               viewBox="0 0 1200 120" 
               preserveAspectRatio="none" 
               className="relative block w-full h-[80px] md:h-[150px] fill-white"
             >
                {/* 
                  Shape Logic: 
                  Creates a sharp white triangle rising from bottom left
                */}
                <path d="M0,120 L0,50 L400,0 L1200,120 Z"></path>
             </svg>
             
             {/* "FROM OUR BLOG" Text - positioned in the white area */}
             <div className="absolute bottom-4 right-6 md:bottom-8 md:right-20 text-gray-400 text-xs md:text-sm font-bold tracking-widest uppercase">
               FROM OUR BLOG
             </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;