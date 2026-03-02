import React from 'react';
import { motion } from 'motion/react';
import { useContent } from '../../contexts/ContentContext';
import { EditableText } from '../ui/EditableText';
import { EditableImage } from '../ui/EditableImage';

export const Work = () => {
  const { content } = useContent();

  const projects = [
    {
      id: 1,
      client: content.work_1_client || "VELVET SPACE",
      category: content.work_1_category || "Identity + Strategy",
      image: content.work_1_image || "https://images.unsplash.com/photo-1759882609577-e78a307beed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBicnV0YWxpc3QlMjBhcmNoaXRlY3R1cmUlMjBjb25jcmV0ZSUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzcwMzE0OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: content.work_1_description || "Redefining luxury real estate for the digital nomad generation."
    },
    {
      id: 2,
      client: content.work_2_client || "NOIR / BLANC",
      category: content.work_2_category || "Signal / Content",
      image: content.work_2_image || "https://images.unsplash.com/photo-1761882469824-f77e7c07e85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1pbmltYWxpc3QlMjBibGFjayUyMGFuZCUyMHdoaXRlJTIwZmFzaGlvbiUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzAzMTQ5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: content.work_2_description || "An anti-fashion campaign for a sustainable basics label."
    },
    {
      id: 3,
      client: content.work_3_client || "ETHER & CO",
      category: content.work_3_category || "Full Stack",
      image: content.work_3_image || "https://images.unsplash.com/photo-1769613704997-13a44ed4c244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRleHR1cmUlMjBibGFjayUyMGFuZCUyMHdoaXRlJTIwYXJ0aXN0aWN8ZW58MXx8fHwxNzcwMzE0OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: content.work_3_description || "Building a skincare cult from scratch."
    },
    {
      id: 4,
      client: content.work_4_client || "STUDIO 99",
      category: content.work_4_category || "Blueprint",
      image: content.work_4_image || "https://images.unsplash.com/photo-1765371514743-45bd8e6c0a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlJTIwZGVzaWduZXIlMjBjbGVhbiUyMGRlc2t8ZW58MXx8fHwxNzcwMzE0OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: content.work_4_description || "Rebranding a tech giant to feel human again."
    }
  ];

  return (
    <section id="work" className="py-24 bg-black text-white px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter opacity-10">WORK</h2>
          <div className="text-right">
             <p className="text-sm font-['Space_Mono'] uppercase tracking-widest">Selected Cases</p>
             <p className="text-xs opacity-50">2023 — 2024</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:gap-32">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden mb-8 aspect-[16/9] md:aspect-[21/9] relative">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={project.image} 
                  alt={project.client} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="border-l-2 border-white/20 pl-6 group-hover:border-white transition-colors duration-300">
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-1">{project.client}</h3>
                <p className="text-xs font-['Space_Mono'] uppercase opacity-60 mb-3">{project.category}</p>
                <p className="text-sm opacity-80 max-w-sm">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-32 text-center">
            <a href="#" className="inline-block border-b border-white pb-1 text-xl font-['Playfair_Display'] italic hover:opacity-70 transition-opacity">
                View Full Archive
            </a>
        </div>
      </div>
    </section>
  );
};