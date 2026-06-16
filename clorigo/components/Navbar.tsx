import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  // Handle scroll effects: Shadow and Active Section detection
  useEffect(() => {
    const handleScroll = () => {
      // 1. Shadow logic
      setIsScrolled(window.scrollY > 50);

      // 2. ScrollSpy logic
      const sections = ['home', 'about', 'services', 'contact', 'cta', 'footer'];
      const scrollPosition = window.scrollY + 150; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            // Map IDs back to Nav Names if needed, or just use the logic below
            if (section === 'home') setActiveSection('Home');
            if (section === 'about') setActiveSection('About');
            if (section === 'services') setActiveSection('Services');
            // When in contact section, highlight Connect as it's the primary CTA usually.
            if (section === 'contact') setActiveSection('Connect'); 
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Career', href: '#contact' }, // Career points to Contact
    { name: 'Connect', href: '#contact' }, // Connect now also points to Contact
  ];

  const logoUrl = "https://uploads.onecompiler.io/4426xrepu/44bwju5jt/ChatGPT%20Image%20Jan%2028,%202026,%2012_23_47%20PM.png";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    setActiveSection(name);
    setMobileMenuOpen(false);
    
    // Smooth scroll handling
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        // Account for fixed header offset manually if scroll-padding isn't enough or for precise control
        // But relying on scroll-padding-top from CSS is usually cleaner. 
        // We'll use standard scrollIntoView which respects scroll-padding-top in modern browsers
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (href === '#') {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header 
        className={`fixed w-full z-40 transition-all duration-300 top-0 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="relative bg-white h-20 md:h-24 shadow-sm">
          <div className="container mx-auto px-6 h-full flex justify-between items-center relative z-20">
            
            {/* Logo */}
            <div className="flex items-center h-full">
               <a href="#home" onClick={(e) => handleNavClick(e, '#home', 'Home')} className="flex items-center gap-2">
                 <img 
                   src={logoUrl} 
                   alt="Clorigo" 
                   className="h-12 md:h-16 object-contain" 
                 />
               </a>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-16 ml-auto">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.name)}
                  className={`font-bold text-sm uppercase tracking-wide transition-colors relative group py-2 ${
                    activeSection === link.name 
                      ? 'text-primary' 
                      : 'text-[#0B0F19] hover:text-primary'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === link.name ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              ))}
            </nav>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden z-50 text-dark ml-auto"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay / Dropdown */}
        <div 
          className={`fixed inset-0 bg-black-50 bg-opacity-50 backdrop-blur-xs bg-black/40 z-50 lg:hidden transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Menu Panel */}
          <div 
            className={`absolute top-0 left-0 w-full bg-white shadow-xl transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header inside Dropdown */}
            <div className="h-20 px-6 flex justify-between items-center border-b border-gray-100">
              <a href="#home" onClick={(e) => handleNavClick(e, '#home', 'Home')} className="flex items-center">
                <img 
                  src={logoUrl} 
                  alt="Clorigo" 
                  className="h-12 object-contain" 
                />
              </a>
              <button 
                className="text-dark hover:text-primary transition-colors p-1"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={30} className="stroke-2" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2 py-3 px-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.name)}
                  className={`text-[15px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                    activeSection === link.name ? 'text-primary' : 'text-[#1a1a1a] hover:text-primary'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;