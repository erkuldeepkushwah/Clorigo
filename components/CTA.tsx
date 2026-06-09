import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Image subtle */}
      <div className="absolute inset-0 bg-[url('https://isaiahcounselingandwellness.com/wp-content/uploads/2018/06/Tryzens-Blog-Page-Banner.jpg')] bg-cover bg-center opacity-10 grayscale-0"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <span className="text-gray-600 text-sm font-semibold mb-4 block border-b border-gray-400 w-fit mx-auto pb-1">
          Let's get started
        </span>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 max-w-3xl mx-auto">
          Are you ready for a better, more productive business?
        </h2>
        
        <p className="text-gray-600 text-sm mb-10 max-w-2xl mx-auto font-medium">
          Stop worrying about technology problems. Focus on your business. Let us provide the support you deserve.
        </p>
        
        <a 
          href="#contact"
          className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded shadow-lg transition-colors text-sm uppercase tracking-wide"
        >
          Contact us Now
        </a>
      </div>
    </section>
  );
};

export default CTA;