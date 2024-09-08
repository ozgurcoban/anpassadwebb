import Image from 'next/image';
import desktopImg from '@/assets/desktop.png';
import groupDiscussionImg from '@/assets/group-discussion-cafe.png';
import uppsalaCityImg from '@/assets/uppsala-cityscape.png';
import MaskText from './ui/MaskText';
import FadeUp from './ui/FadeUp';
import Link from 'next/link';
import AnimatedButton from './ui/MotionButton';
import LettersPullUp from './ui/LettersPullUp';

const Hero = () => {
  return (
    <section className="-z-5 relative grid w-full place-items-center gap-x-8 gap-y-16 md:grid-cols-2">
      <div className="w-full">
        <FadeUp delay={0.3}>
          <h1 className="text-8xl">Azen går i din runda gött</h1>
          <p className="mt-10 max-w-md">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
            possimus veritatis commodi hic officiis suscipit. Eaque nulla
            possimus nihil dignissimos laboriosam assumenda culpa?
          </p>
        </FadeUp>
        <FadeUp delay={0.7} className="mt-10">
          <AnimatedButton size="lg">
            <Link href="/blog">Hero Button</Link>
          </AnimatedButton>
        </FadeUp>
      </div>
      <div className="relative grid grid-cols-6 gap-6 self-start md:col-span-2 md:col-start-2 md:gap-y-10 md:self-center">
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
          />
        </FadeUp>
      </div>
    </section>
  );
};
export default Hero;
