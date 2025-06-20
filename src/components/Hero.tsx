import Image from 'next/image';
import heroImage from '../../public/images/hero.webp';
import { ContactButton } from './ContactButton';
import Text from './ui/Text';

const Hero = () => {
  return (
    <section className="relative mx-auto max-w-screen-2xl px-4 lg:px-8">
      <div className="relative grid min-h-[80vh] pt-20 pb-16 md:pt-24 md:pb-20 lg:rounded-2xl overflow-hidden">
      {/* Background image */}
      <Image
        src={heroImage}
        alt="Datorskärm med datorkod i rörelse, som symboliserar modern webbutveckling och teknik."
        fill
        priority
        placeholder="blur"
        className="object-cover object-center"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

      {/* Content */}
      <div className="z-1 relative flex items-center px-6">
        <div className="grid gap-y-8 md:gap-y-10 text-white max-w-4xl p-8 md:p-12">
          {/* SVG Text with Gradient */}
          <div className="space-y-6">
            <svg
              viewBox="0 0 1400 180"
              className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl h-auto"
              preserveAspectRatio="xMinYMid meet"
            >
              <defs>
                <linearGradient id="heroTextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="50%" stopColor="#d8b4fe" />
                  <stop offset="100%" stopColor="#f9a8d4" />
                </linearGradient>
                <filter id="heroTextShadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="12" floodOpacity="0.7"/>
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.9"/>
                </filter>
              </defs>
              <text
                x="10"
                y="140"
                fill="url(#heroTextGradient)"
                filter="url(#heroTextShadow)"
                className="font-heading"
                style={{ fontSize: '140px', fontWeight: '300', letterSpacing: '-2px' }}
              >
                Anpassad Webb
              </text>
            </svg>
            
            <Text
              as="p"
              className="max-w-2xl text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6), 0 4px 4px rgba(0,0,0,0.9)' }}
            >
              Vi skapar skräddarsydda och SEO-vänliga hemsidor för småföretag, med
              fokus på att stärka din online-närvaro och nå fler kunder.
            </Text>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <ContactButton className="w-full text-primary md:w-fit" />
            <button className="text-white/90 hover:text-white font-normal text-lg flex items-center gap-2 transition-all duration-200 px-5 py-2.5 rounded-md hover:bg-white/10"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)' }}
            >
              Se vårt arbete
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Hero;
