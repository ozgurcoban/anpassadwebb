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
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-quicksand font-semibold 
              bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              style={{ 
                filter: 'drop-shadow(2px 2px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(147,51,234,0.3))' 
              }}>
              Anpassad Webb
            </h1>
            
            <Text
              as="p"
              className="max-w-2xl text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white/90"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6), 0 4px 4px rgba(0,0,0,0.9)' }}
            >
              Vi skapar skräddarsydda och SEO-vänliga hemsidor för småföretag, med
              fokus på att stärka din online-närvaro och nå fler kunder.
            </Text>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <ContactButton className="w-full text-primary md:w-fit" />
            <button className="relative font-medium text-lg flex items-center gap-2 transition-all duration-300 px-6 py-3 rounded-md
              text-white hover:text-white
              before:absolute before:inset-0 before:rounded-md before:p-[1px] 
              before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500 
              before:-z-10 before:opacity-70 hover:before:opacity-100
              bg-black/30 hover:bg-black/40 backdrop-blur-sm"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
            >
              Se vårt arbete
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
