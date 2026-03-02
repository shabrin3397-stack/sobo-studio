import React from 'react';
import { ArrowRight, Instagram, Linkedin, Twitter } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white text-black px-6 min-h-[80vh] flex flex-col justify-center">
      <div className="container mx-auto max-w-4xl text-center">
        
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          LET'S MAKE <br/> 
          <span className="italic font-['Playfair_Display'] font-light text-4xl md:text-6xl lg:text-7xl block my-2">something</span>
          UNFORGETTABLE.
        </h2>

        <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          We only take on 3 clients per quarter to ensure you get our full obsession. If you're ready to stop playing small, let's talk.
        </p>

        <a 
          href="mailto:hello@sobostudio.com" 
          className="inline-flex items-center gap-4 text-3xl md:text-5xl font-bold hover:text-gray-600 transition-colors border-b-4 border-black pb-2 mb-16"
        >
          hello@sobostudio.com
          <ArrowRight className="-rotate-45 w-8 h-8 md:w-12 md:h-12" />
        </a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left border-t border-black pt-12">
          
          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs mb-4">Location</h3>
            <p className="text-lg">
              Remote / Global <br/>
              <span className="opacity-50 text-sm">Based in Mumbai</span>
            </p>
          </div>

          <div>
             <h3 className="font-bold uppercase tracking-widest text-xs mb-4">Socials</h3>
             <div className="flex gap-6">
               <a href="#" className="hover:opacity-50 transition-opacity"><Instagram /></a>
               <a href="#" className="hover:opacity-50 transition-opacity"><Twitter /></a>
               <a href="#" className="hover:opacity-50 transition-opacity"><Linkedin /></a>
             </div>
          </div>

          <div>
             <h3 className="font-bold uppercase tracking-widest text-xs mb-4">The Fine Print</h3>
             <p className="text-sm opacity-60">
               © 2026 SOBO STUDIO.<br/>
               No cookies. No tracking.<br/>
               Just vibes.
             </p>
          </div>

        </div>

      </div>
    </section>
  );
};
