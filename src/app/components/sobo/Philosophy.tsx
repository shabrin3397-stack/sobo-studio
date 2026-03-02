import React from 'react';

export const Philosophy = () => {
  return (
    <section id="philosophy" className="py-24 px-6 bg-white text-black">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-start gap-12">
          
          <div className="w-full md:w-1/3">
             <div className="sticky top-24">
               <h2 className="text-sm font-bold tracking-widest uppercase mb-2">Manifesto</h2>
               <div className="h-1 w-12 bg-black"></div>
             </div>
          </div>

          <div className="w-full md:w-2/3 space-y-16">
            
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter">SLOW DESIGN.</h3>
              <p className="text-xl md:text-2xl font-['Playfair_Display'] italic leading-relaxed">
                "We reject the hustle of 'ship it fast, fix it later'. We craft with intent."
              </p>
              <p className="opacity-70 leading-relaxed">
                In a world of infinite scrolling and 3-second attention spans, the only way to stand out is to slow down. We design for pause. We write for resonance. We strategize for years, not days.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8">
                <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">We Stand For</h4>
                <ul className="space-y-3 font-['Space_Mono'] text-sm opacity-80">
                  <li>— Intentional Growth</li>
                  <li>— Visual Silence</li>
                  <li>— Radical Clarity</li>
                  <li>— Culturally Relevant</li>
                </ul>
              </div>
              <div className="bg-black text-white p-8">
                 <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-gray-400">We Stand Against</h4>
                 <ul className="space-y-3 font-['Space_Mono'] text-sm opacity-80">
                  <li>— Generic Agency Fluff</li>
                  <li>— Growth Hacking</li>
                  <li>— Empty Metrics</li>
                  <li>— Bad Kerning</li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
