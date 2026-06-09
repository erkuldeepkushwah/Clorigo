import React from 'react';
import { STATS } from '../constants';

const Stats: React.FC = () => {
  return (
    <section className="bg-primary py-12 md:py-16 text-white relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="mb-4 p-3 border-2 border-white/20 rounded-lg group-hover:bg-white/10 transition-colors">
                <stat.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-1">{stat.count}</h3>
              <p className="text-sm md:text-base font-medium opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
