import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { Icon: Facebook, href: "https://www.facebook.com/clarigoinfotech/" },
    { Icon: Twitter, href: "https://x.com/clarigoinfotech/" },
    { Icon: Instagram, href: "https://www.instagram.com/clarigo_infotech/" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/clarigo-infotech-pvt-ltd/" }
  ];

  return (
    <footer id="footer" className="bg-black text-white pt-20 pb-8 border-t border-gray-900 relative overflow-hidden">
        {/* Subtle Red Glow Effects */}
        <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
             <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Logo & Tagline */}
            <div>
              <div className="mb-6">
                 {/* Logo removed as requested */}
                 <p className="text-[10px] text-gray-500 mt-2 tracking-[0.2em] uppercase font-bold">Redefining Innovation</p>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Empowering businesses with cutting-edge technology solutions that drive growth and efficiency.
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ Icon, href }, idx) => (
                  <a 
                    key={idx} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded bg-gray-800 flex items-center justify-center hover:bg-primary transition-all text-white hover:-translate-y-1"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: IT Services */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white relative inline-block">
                IT Services
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary"></span>
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                {['Android App Development', 'iOS App Development', 'Web Development', 'UI/UX Design', 'Digital Marketing'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-600 rounded-full"></span> {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Blog */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white relative inline-block">
                Blog
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary"></span>
              </h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="group cursor-pointer">
                  <h4 className="text-white group-hover:text-primary transition-colors leading-snug mb-1">Microsoft Aims To Upend The Industry</h4>
                  <span className="text-xs text-gray-600">Jan 28, 2026</span>
                </li>
                <li className="group cursor-pointer">
                  <h4 className="text-white group-hover:text-primary transition-colors leading-snug mb-1">The Future of AI in Web Development</h4>
                  <span className="text-xs text-gray-600">Jan 15, 2026</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Address */}
            <div id="footer-address">
              <h3 className="text-lg font-bold mb-6 text-white relative inline-block">
                Address
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary"></span>
              </h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3 items-start">
                    <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white mb-1">Headquarter (Indore):</strong>
                      <span>Tech Park, Innovation Street, Indore, MP, India</span>
                    </div>
                </li>
                <li className="flex gap-3 items-center">
                    <Phone size={18} className="text-primary flex-shrink-0" />
                    <span>+917898692133</span>
                </li>
                 <li className="flex gap-3 items-center">
                    <Mail size={18} className="text-primary flex-shrink-0" />
                    <span>clorigoindia@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
             <p>&copy; {new Date().getFullYear()} Clorigo. All Rights Reserved.</p>
             <div className="flex gap-6 mt-4 md:mt-0">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;