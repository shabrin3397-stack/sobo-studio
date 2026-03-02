import React from 'react';

export const Intro = () => {
  return (
    <section className="py-24 md:py-32 bg-black text-white px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
              We build brands with depth, clarity, and longevity.
            </h2>
            <p className="text-xl md:text-2xl font-light opacity-80 leading-relaxed">
              Most agencies add noise. We add signal. We believe in doing less, but doing it obsessively better.
            </p>
          </div>

          <div className="space-y-12">
            <div className="border-t border-white/20 pt-6">
              <h3 className="text-xs font-['Space_Mono'] tracking-widest uppercase opacity-50 mb-4">The Philosophy</h3>
              <p className="text-lg leading-relaxed">
                Sobo Studio isn't for everyone. We don't chase trends that die next week. We work with founders who have taste, vision, and the patience to build something that actually matters.
              </p>
            </div>

            <div className="border-t border-white/20 pt-6">
              <h3 className="text-xs font-['Space_Mono'] tracking-widest uppercase opacity-50 mb-4">The Setup</h3>
              <p className="text-lg leading-relaxed">
                Remote by design. Global by ambition. Based in Mumbai, but our slack channels never sleep. No overheads, no fluff, just pure creative output.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
