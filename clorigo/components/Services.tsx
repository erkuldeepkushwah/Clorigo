import React from 'react';
import { Code, Smartphone, Layout, BarChart, Globe, Shield, Brain, Bot, Sparkles } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  { id: 1, title: 'Web Development', description: 'Robust and scalable web applications tailored to your business needs using React, Node.js, and more.', icon: Code },
  { id: 2, title: 'Mobile App Dev', description: 'Native and Cross-platform mobile solutions for iOS and Android that engage users on the go.', icon: Smartphone },
  { id: 3, title: 'UI/UX Design', description: 'Intuitive and visually stunning interfaces that provide seamless user experiences across all devices.', icon: Layout },
  { id: 4, title: 'Digital Marketing', description: 'Data-driven SEO, SEM, and social media strategies to boost your online presence and ROI.', icon: BarChart },
  { id: 5, title: 'E-Commerce', description: 'Custom online store development with secure payment gateways and inventory management.', icon: Globe },
  { id: 6, title: 'Cyber Security', description: 'Protect your digital assets with our advanced security audits and implementation services.', icon: Shield },
  { id: 7, title: 'Machine Learning', description: 'Advanced algorithms that enable systems to learn from data, identify patterns, and make intelligent decisions.', icon: Brain },
  { id: 8, title: 'Agentic AI', description: 'Autonomous AI agents capable of planning, reasoning, and executing complex workflows with minimal supervision.', icon: Bot },
  { id: 9, title: 'Generative AI', description: 'State-of-the-art models for creating original content, code, and designs to accelerate innovation.', icon: Sparkles },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-secondary font-bold uppercase tracking-widest text-sm mb-2">What We Do</h4>
          <h2 className="text-3xl md:text-5xl font-bold text-dark mb-4">Our Premium Services</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive suite of IT services designed to propel your business forward in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-blue-50 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {service.description}
              </p>
              <a href="#contact" className="inline-flex items-center text-sm font-semibold text-secondary hover:text-orange-700 transition-colors">
                Learn More <span className="ml-1 text-lg">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;