import React from 'react';
import { Users, Briefcase, Smile, Award } from 'lucide-react';
import { Stat } from '../types';

const stats: Stat[] = [
  { id: 1, value: '500+', label: 'Projects Completed' },
  { id: 2, value: '150+', label: 'Happy Clients' },
  { id: 3, value: '50+', label: 'Team Members' },
  { id: 4, value: '25+', label: 'Awards Won' },
];

const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 blob-bg"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
             <div className="flex justify-center mb-4 text-secondary"><Briefcase size={40} /></div>
             <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">500+</h3>
             <p className="text-blue-200 font-medium">Projects Done</p>
          </div>
          <div className="p-4">
             <div className="flex justify-center mb-4 text-secondary"><Smile size={40} /></div>
             <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">98%</h3>
             <p className="text-blue-200 font-medium">Client Satisfaction</p>
          </div>
          <div className="p-4">
             <div className="flex justify-center mb-4 text-secondary"><Users size={40} /></div>
             <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">10+</h3>
             <p className="text-blue-200 font-medium">Years Experience</p>
          </div>
          <div className="p-4">
             <div className="flex justify-center mb-4 text-secondary"><Award size={40} /></div>
             <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">25+</h3>
             <p className="text-blue-200 font-medium">Winning Awards</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;