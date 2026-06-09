import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const Career: React.FC = () => {
  const positions = [
    {
      title: 'Senior React Developer',
      location: 'Indore, India',
      type: 'Full Time',
      description: 'We are looking for an experienced React developer to lead our frontend team.'
    },
    {
      title: 'Node.js Backend Engineer',
      location: 'Indore, India',
      type: 'Full Time',
      description: 'Join our backend team to build scalable APIs and microservices.'
    },
    {
      title: 'UI/UX Designer',
      location: 'Remote / Hybrid',
      type: 'Contract',
      description: 'Create stunning user interfaces and intuitive user experiences for global clients.'
    }
  ];

  return (
    <section id="career" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gray-500 font-bold text-xs tracking-widest uppercase mb-2 block">
            CAREERS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Join Our Team
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            We are always looking for talented individuals to help us build the future of technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {positions.map((job, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-primary mb-6">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {job.type}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                {job.description}
              </p>
              <a 
                href="#contact" 
                className="text-primary font-bold text-sm hover:text-red-700 transition-colors uppercase tracking-wide"
              >
                Apply Now &rarr;
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Don't see a position that fits?</p>
            <a 
              href="mailto:clorigoindia@gmail.com" 
              className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded transition-all text-sm uppercase tracking-wide"
            >
              Send Us Your Resume
            </a>
        </div>
      </div>
    </section>
  );
};

export default Career;