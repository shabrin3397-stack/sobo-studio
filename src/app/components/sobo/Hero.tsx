import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { EditableText } from '../ui/EditableText';
import { EditableImage } from '../ui/EditableImage';

export const Hero = () => {
  const { content } = useContent();

  const headline1 = content.hero_headline_1 || 'WE DON\'T DO';
  const headline2 = content.hero_headline_2 || 'MEDIOCRE.';
  const services = content.hero_services || 'Branding / Social / Strategy';
  const tagline = content.hero_tagline || 'For culture-led brands that want to exist tomorrow, not just today.';
  const heroImage = content.hero_image || 'https://images.unsplash.com/photo-1761882469824-f77e7c07e85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1pbmltYWxpc3QlMjBibGFjayUyMGFuZCUyMHdoaXRlJTIwZmFzaGlvbiUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzAzMTQ5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 relative bg-white text-black overflow-hidden pt-20">
      
      {/* Background Graphic Element - Minimal */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10 hidden lg:block" />
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8"
          >
            <EditableText
              contentKey="hero_headline_1"
              defaultValue="WE DON'T DO"
              as="span"
              className="inline-block"
            >
              {headline1}
            </EditableText>
            {' '}
            <br className="hidden md:block" />
            <EditableText
              contentKey="hero_headline_2"
              defaultValue="MEDIOCRE."
              as="span"
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600"
            >
              {headline2}
            </EditableText>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-6 md:items-center mb-12"
          >
            <EditableText
              contentKey="hero_services"
              defaultValue="Branding / Social / Strategy"
              as="p"
              className="text-xl md:text-2xl font-medium tracking-wide uppercase"
            >
              {services}
            </EditableText>
            <div className="h-px w-20 bg-black hidden md:block" />
            <EditableText
              contentKey="hero_tagline"
              defaultValue="For culture-led brands that want to exist tomorrow, not just today."
              as="p"
              className="text-sm md:text-base font-['Space_Mono'] opacity-60 max-w-xs"
            >
              {tagline}
            </EditableText>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <a href="#contact" className="px-8 py-4 bg-black text-white text-sm font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors flex items-center gap-2 group">
              Get Serious
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </a>
            <a href="#work" className="px-8 py-4 border border-black text-black text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
              Stalk Us
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative h-[500px] lg:h-[800px] hidden md:block">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2, duration: 1 }}
             className="w-full h-full object-cover grayscale contrast-125"
           >
              <EditableImage
                contentKey="hero_image"
                defaultValue="https://images.unsplash.com/photo-1761882469824-f77e7c07e85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1pbmltYWxpc3QlMjBibGFjayUyMGFuZCUyMHdoaXRlJTIwZmFzaGlvbiUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzAzMTQ5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Sobo Aesthetic"
                className="w-full h-full object-cover"
              />
           </motion.div>
           <div className="absolute -bottom-6 -left-6 bg-black text-white p-4 font-['Space_Mono'] text-xs max-w-[150px]">
              EST. 2024 <br/>
              MUMBAI / GLOBAL
           </div>
        </div>
      </div>
    </section>
  );
};