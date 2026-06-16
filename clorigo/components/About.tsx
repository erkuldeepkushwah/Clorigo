import React from 'react';
import { Check } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Image Side */}
          <div className="lg:w-1/2 relative">
            <div className="relative overflow-hidden rounded-lg shadow-2xl border-b-8 border-primary">
              <img 
                src="https://www.clarigoinfotech.com/upload/blog_img/Bank_tech_11.jpg" 
                alt="Clorigo Team Meeting" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Dots Pattern */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 hidden md:block"></div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">About Company</h4>
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6 leading-tight">
              We Are Increasing Business Success With <span className="text-primary">Technology</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Clorigo Infotech is a leading software development company that offers top-rated Software Development Services due to our vast experience, team of skilled professionals, key business insights, and a dedicated working process.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "Software Development",
                "Mobile App Development",
                "Web Development",
                "UI/UX Design",
                "Digital Marketing",
                "Consultancy"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="text-dark font-medium">{item}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="self-start px-10 py-4 bg-primary text-white font-bold rounded hover:bg-black transition-all shadow-xl uppercase tracking-wider text-sm">
              Read More
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;