import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import soboLogo from 'figma:asset/9183c6defaaf23f6f25156aeb61a6f8a9f586b41.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Work', href: '#work' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mix-blend-difference text-white ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="z-50 hover:opacity-80 transition-opacity">
          <div className="relative h-16 w-32">
            <ImageWithFallback 
              src={soboLogo}
              alt="SOBO Studio"
              className="absolute -top-12 left-0 h-96 w-auto max-w-none object-contain invert"
            />
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 items-center">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium tracking-widest uppercase hover:text-gray-300 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="/admin/login" 
            className="text-xs font-bold tracking-widest uppercase opacity-30 hover:opacity-100 transition-opacity"
            title="Admin Panel"
          >
            Admin
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden z-50 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 md:hidden"
            >
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold tracking-tighter uppercase hover:text-gray-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};