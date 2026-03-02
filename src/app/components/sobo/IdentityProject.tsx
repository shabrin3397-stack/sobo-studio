import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router';

export const IdentityProject = () => {
  return (
    <div className="bg-white min-h-screen text-black font-['Inter']">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 mix-blend-difference text-white">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="font-black text-2xl tracking-tighter">SOBO</div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-48 pb-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-['Space_Mono'] text-sm tracking-widest uppercase opacity-60 mb-6">Identity Project</p>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-12">
              Velvet <br/> Space
            </h1>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
               <motion.img 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                src="https://images.unsplash.com/photo-1726141356188-a1cc0e06b8a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwYnJhbmRpbmclMjBpZGVudGl0eSUyMG1vY2t1cCUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzcwNjM3NDYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Velvet Space Branding"
                className="w-full h-auto object-cover grayscale contrast-125"
              />
            </div>
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xl mb-4">The Brief</h3>
                <p className="opacity-70 leading-relaxed mb-8">
                  Velvet Space required a complete identity overhaul to position themselves as the premier luxury real estate service for the digital nomad generation. They needed to shed the traditional "suit and tie" agency aesthetic for something rawer, darker, and more tactile.
                </p>
                
                <h3 className="font-bold text-xl mb-4">Services</h3>
                <ul className="list-none space-y-2 opacity-70 font-['Space_Mono'] text-sm">
                  <li>— Visual Identity System</li>
                  <li>— Tone of Voice</li>
                  <li>— Art Direction</li>
                  <li>— Digital Experience</li>
                </ul>
              </div>
              
              <div className="mt-12">
                 <div className="border-t border-black pt-4">
                   <p className="font-bold text-4xl">2024</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1734543920075-59872330bec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBvZ3JhcGh5JTIwcG9zdGVyJTIwZGVzaWduJTIwYmxhY2slMjBhbmQlMjB3aGl0ZSUyMGJvbGR8ZW58MXx8fHwxNzcwNjM3NDYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Typography Detail"
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
              />
              <p className="font-['Space_Mono'] text-xs opacity-50">TYPOGRAPHY SYSTEM</p>
            </div>
            <div className="space-y-6 md:pt-24">
              <img 
                src="https://images.unsplash.com/photo-1759563874745-47e35c0a9572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ24lMjBtaW5pbWFsaXNtJTIwbHV4dXJ5JTIwZGFya3xlbnwxfHx8fDE3NzA2Mzc0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Packaging Detail"
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
              />
              <p className="font-['Space_Mono'] text-xs opacity-50">PACKAGING & TACTILE ELEMENTS</p>
            </div>
             <div className="space-y-6 md:col-span-2">
              <img 
                src="https://images.unsplash.com/photo-1728426340277-b2e45fa616a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMHN0YXRpb25lcnklMjBzZXQlMjBtaW5pbWFsJTIwYmxhY2t8ZW58MXx8fHwxNzcwNjM3NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Stationery Detail"
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
              />
              <p className="font-['Space_Mono'] text-xs opacity-50">STATIONERY KIT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="py-24 px-6 bg-white text-black text-center">
        <div className="container mx-auto">
          <p className="font-['Space_Mono'] text-xs tracking-widest uppercase opacity-60 mb-8">Next Project</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase cursor-pointer hover:opacity-50 transition-opacity">
            Mono <br/> Lith
          </h2>
        </div>
      </section>
    </div>
  );
};