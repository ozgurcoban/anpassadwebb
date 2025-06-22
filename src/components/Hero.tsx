import Image from 'next/image';
import heroImage from '../../public/images/hero.webp';
import { ContactButton } from './ContactButton';
import Text from './ui/Text';

const Hero = () => {
  return (
    <section className="relative mx-auto max-w-screen-2xl px-4 lg:px-8">
      <div className="relative grid min-h-[80vh] overflow-hidden pb-16 pt-20 md:pb-20 md:pt-24 lg:rounded-2xl">
        {/* Background image */}
        <Image
          src={heroImage}
          alt="Datorskärm med datorkod i rörelse, som symboliserar modern webbutveckling och teknik."
          fill
          priority
          placeholder="blur"
          className="object-cover object-center"
        />
        {/* Purple/Pink Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

        {/* Content */}
        <div className="z-1 relative flex items-center px-6">
          <div className="grid max-w-4xl gap-y-8 p-8 text-white md:gap-y-10 md:p-12">
            <div className="space-y-6">
              <h1
                className="font-quicksand text-6xl font-semibold text-white md:text-7xl lg:text-8xl xl:text-9xl"
                style={{
                  filter:
                    'drop-shadow(2px 2px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(147,51,234,0.3))',
                }}
              >
                Hemsidor som{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  funkar
                </span>{' '}
                på riktigt
              </h1>

              <Text
                as="p"
                className="max-w-2xl text-xl font-light leading-relaxed text-white/90 md:text-2xl lg:text-3xl"
                style={{
                  textShadow:
                    '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6), 0 4px 4px rgba(0,0,0,0.9)',
                }}
              >
                Vi skapar skräddarsydda hemsidor som laddar snabbt, rankar på
                Google och hjälper småföretag att växa online
              </Text>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <ContactButton className="w-full text-primary md:w-fit" />
              <button
                className="relative flex items-center gap-2 rounded-md bg-black/30 px-6 py-3 text-lg font-medium text-white backdrop-blur-sm transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500 before:p-[1px] before:opacity-70 hover:bg-black/40 hover:text-white hover:before:opacity-100"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
              >
                Se vårt arbete
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
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
