import Image from 'next/image';
import desktopImg from '@/assets/desktop.png';
import groupDiscussionImg from '@/assets/group-discussion-cafe.png';
import uppsalaCityImg from '@/assets/uppsala-cityscape.png';
import FadeUp from './ui/FadeUp';
import { AnimatedButton } from './ui/Buttons';
import { DynamicMotion } from './ui/DynamicMotion';

import ContactForm from './form/ContactForm';
import { ContactButton } from './ContactButton';

const Hero = () => {
  return (
    <section className="-z-5 relative grid w-full place-items-center gap-y-16 pb-16 md:grid-cols-2">
      <div className="w-full">
        <FadeUp delay={0.3}>
          <h1 className="text-5xl">
            Skräddarsydd webbutveckling i Uppsala – Unika lösningar för din
            verksamhet
          </h1>
          <p className="mt-16 max-w-md">
            Vi skapar skräddarsydda hemsidor som är anpassade efter din
            verksamhets unika behov. Med lokal förankring i Uppsala erbjuder vi
            webblösningar som kombinerar design och funktionalitet för bästa
            resultat.
          </p>
        </FadeUp>
        <DynamicMotion delay={0.7} className="mt-10">
          <ContactButton />
        </DynamicMotion>
      </div>
      <div className="relative grid grid-cols-6 gap-6 self-start md:col-span-2 md:col-start-2 md:gap-y-10 md:self-center lg:-translate-x-14 lg:transform">
        <FadeUp
          enableHover
          delay={0.2}
          className="col-span-3 row-start-1 flex items-center justify-center"
        >
          <Image
            src={groupDiscussionImg}
            alt="Pixel art of a group of friends happily discussing around a table in a cozy, dimly-lit café, with one person showing something on a tablet"
            className="rounded-md shadow-custom"
            width={250}
            height={200}
          />
        </FadeUp>
        <FadeUp
          enableHover
          delay={0.4}
          className="col-span-3 col-start-4 flex items-center justify-center"
        >
          <Image
            src={uppsalaCityImg}
            alt="Pixel art of Uppsala cityscape with a church, bridge, and canal surrounded by greenery under a bright blue sky"
            className="rounded-md shadow-custom"
            width={230}
            height={200}
          />
        </FadeUp>
        <FadeUp
          enableHover
          delay={0.6}
          className="boxShadow col-span-4 col-start-2 row-start-2 flex items-center justify-center"
        >
          <Image
            src={desktopImg}
            alt="Pixel art of a computer setup in a cozy café"
            className="rounded-md shadow-custom"
            width={500}
            height={250}
            placeholder="blur"
          />
        </FadeUp>
      </div>
    </section>
  );
};
export default Hero;
