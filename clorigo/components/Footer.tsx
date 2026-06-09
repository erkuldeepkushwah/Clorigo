import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { SERVICES } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-black text-white pt-20 pb-8 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Info */}
          <div>
            <h5 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">REDEFINING INNOVATION</h5>
            <div className="mb-6">
               <img 
                 src="https://uploads.onecompiler.io/4426xrepu/44bwju5jt/ChatGPT%20Image%20Jan%2028,%202026,%2012_23_47%20PM.png" 
                 alt="Clarigo Infotech" 
                 className="h-10 w-auto bg-white/10 rounded px-1"
               />
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Empowering businesses with cutting-edge technology solutions that drive growth and efficiency.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/clarigoinfotech/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 flex items-center justify-center rounded hover:bg-primary transition-colors">
                <Facebook size={14} className="text-white" />
              </a>
              <a href="https://x.com/clarigoinfotech/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 flex items-center justify-center rounded hover:bg-primary transition-colors">
                <Twitter size={14} className="text-white" />
              </a>
              <a href="https://www.instagram.com/clorigoindia?igsh=eWN5eG1yZWYwcTh4" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 flex items-center justify-center rounded hover:bg-primary transition-colors">
                <Instagram size={14} className="text-white" />
              </a>
              <a href="https://www.linkedin.com/company/clarigo-infotech-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 flex items-center justify-center rounded hover:bg-primary transition-colors">
                <Linkedin size={14} className="text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">IT Services</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 5).map((service, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center">
                    <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Blog */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Blog</h4>
            <div className="space-y-4">
              <div>
                <a href="#" className="text-white text-sm font-semibold hover:text-primary transition-colors block mb-1">
                  Microsoft Aims To Upend The Industry
                </a>
                <span className="text-xs text-gray-600">Jan 28, 2026</span>
              </div>
              <div>
                <a href="#" className="text-white text-sm font-semibold hover:text-primary transition-colors block mb-1">
                  The Future of AI in Web Development
                </a>
                <span className="text-xs text-gray-600">Jan 15, 2026</span>
              </div>
            </div>
          </div>

          {/* Column 4: Address */}
          <div id="footer-address">
            <h4 className="text-white font-bold text-lg mb-6">Address</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start">
                <span className="text-primary font-bold mr-2 mt-1 block w-4">•</span>
                <div>
                  <strong className="text-white block mb-1">Headquarter (Indore):</strong>
                  123 Tech Park, Innovation Street, Indore, MP, India
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-2">📞</span>
                +91 70008 19632
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-2">✉</span>
                clorigoindia@gmail.com
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2026 Clarigo Infotech. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;