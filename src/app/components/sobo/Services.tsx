import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useContent } from '../../contexts/ContentContext';
import { EditableText } from '../ui/EditableText';
import { EditableImage } from '../ui/EditableImage';

export const Services = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const { content } = useContent();

  const services = [
    {
      id: "01",
      title: content.service_1_title || "Identity",
      subtitle: content.service_1_subtitle || "FORMERLY BRANDING",
      description: content.service_1_description || "More than a logo. We architect the entire visual universe of your brand. Typography that speaks, colors that feel, and systems that scale. We build identities that don't just look good—they work.",
      image: content.service_1_image || "https://images.unsplash.com/photo-1769613704997-13a44ed4c244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRleHR1cmUlMjBibGFjayUyMGFuZCUyMHdoaXRlJTIwbWluaW1hbGlzdCUyMGJvbGR8ZW58MXx8fHwxNzcwNjM3MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/identity"
    },
    {
      id: "02",
      title: content.service_2_title || "Signal",
      subtitle: content.service_2_subtitle || "FORMERLY SOCIAL",
      description: content.service_2_description || "Stop posting for the algorithm. Start posting for humans. We craft editorial-grade content strategies that cut through the noise. Less volume, higher impact. We make your brand unignorable.",
      image: content.service_2_image || "https://images.unsplash.com/photo-1758647841549-6d85724a5cf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBub2lzZSUyMGdsaXRjaCUyMGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MXx8fHwxNzcwNjM3MzI2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "03",
      title: content.service_3_title || "Blueprint",
      subtitle: content.service_3_subtitle || "FORMERLY STRATEGY",
      description: content.service_3_description || "The brain before the beauty. We dig deep into culture, market gaps, and human psychology to position your brand where it has no competition. Clear direction, zero guesswork.",
      image: content.service_3_image || "https://images.unsplash.com/photo-1705955143829-378c115c6b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZ3JpZCUyMGJsdWVwcmludCUyMG1pbmltYWxpc3QlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDF8fHx8MTc3MDYzNzMyOXww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <section id="services" className="py-32 bg-black text-white relative overflow-hidden">
      {/* Background noise/grain could go here */}
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/20 pb-8">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-white/50">Capabilities</h2>
            <p className="text-3xl md:text-5xl font-black max-w-3xl leading-tight">
               WE DON'T DO EVERYTHING. <br/>
               <span className="text-white/50">WE DO THESE THREE THINGS OBSESSIVELY WELL.</span>
            </p>
          </div>
          <div className="hidden md:block">
            <p className="font-['Space_Mono'] text-xs opacity-50 text-right">
              SCROLL FOR DETAILS <br/> ↓
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          {services.map((service) => {
             const ServiceWrapper = service.link ? Link : 'div';
             const wrapperProps = service.link ? { to: service.link } : {};

             return (
            <ServiceWrapper 
              key={service.id}
              {...wrapperProps}
              className="group relative block border-b border-white/20 py-12 md:py-20 transition-colors hover:bg-white/5 cursor-pointer"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                <div className="md:col-span-1 font-['Space_Mono'] text-sm md:text-base opacity-50">
                  {service.id}
                </div>
                
                <div className="md:col-span-6">
                  <h3 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-4 transition-all duration-300 group-hover:pl-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500">
                    {service.title}
                  </h3>
                  <p className="font-['Space_Mono'] text-xs tracking-widest uppercase opacity-60 ml-1">
                    {service.subtitle}
                  </p>
                </div>

                <div className="md:col-span-5 md:opacity-0 md:translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                  <p className="text-lg leading-relaxed text-gray-300 max-w-md mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Hover Image Reveal - Floating/Absolute */}
              <AnimatePresence>
                {hoveredService === service.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] pointer-events-none z-0 hidden lg:block opacity-20 mix-blend-difference"
                  >
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </ServiceWrapper>
          )})}
        </div>
      </div>
    </section>
  );
};