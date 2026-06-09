import React from 'react';
import { Check } from 'lucide-react';

const AboutCompany: React.FC = () => {
  const items = [
    'Software Development',
    'Mobile App Development',
    'Web Development',
    'UI/UX Design',
    'Digital Marketing',
    'Consultancy'
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://www.clarigoinfotech.com/assets/images/clarigo-home-company-03.jpg" 
                alt="Clarigo Infotech Office" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <span className="text-primary font-bold text-sm tracking-wider uppercase mb-2 block">
              About Company
            </span>
            <h2 className="text-3xl md:text-4xl md:leading-tight font-extrabold text-gray-900 mb-6">
              We Are Increasing Business Success With <span className="text-primary">Technology</span>
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Clorigo Infotech is a leading software development company that offers top-rated Software Development Services due to our vast experience, team of skilled professionals, key business insights, and a dedicated working process.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="text-gray-800 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded shadow-lg transition-colors text-sm uppercase tracking-wide">
              Read More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutCompany;