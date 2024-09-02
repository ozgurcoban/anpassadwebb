import { Button } from './ui/button';
import Image from 'next/image';
import desktopImg from '@/assets/desktop.png';
import groupDiscussionImg from '@/assets/group-discussion-cafe.png';
import uppsalaCityImg from '@/assets/uppsala-cityscape.png';
import MaskText from './ui/MaskText';

const Hero = () => {
  return (
    <section className="relative -z-10 grid min-h-svh w-full place-items-center gap-x-8 md:translate-y-[-15%] md:transform md:grid-cols-2">
      <div className="w-full">
        <MaskText
          as="h1" // Dynamically specify the element type
          className="mr-2 inline-block text-6xl md:text-7xl lg:text-8xl"
          delay={0.05}
          phrases={['Lorem', 'ipsum', 'dolor', 'sit', 'amet.']}
        />
        <div className="mt-10 max-w-md">
          <MaskText
            className="inline-block uppercase"
            delay={0.2}
            phrases={[
              'Lorem ',
              'ipsum ',
              'dolor ',
              'sit ',
              'amet ',
              'consectetur ',
              'adipisicing ',
              'elit. ',
              'Odit ',
              'nostrum ',
              'veritatis ',
              'vero ',
              'dolorum magnam! ',
              'Illum ',
              'itaque ',
              'culpa ',
              'nostrum ',
              'ducimus ',
              'ab ',
              'aliquid ',
              'laborum ',
              'quidem! ',
            ]}
          />
        </div>
        <Button className="mt-10">Hero Button</Button>
      </div>
      <div className="relative grid grid-cols-6 gap-6 self-start md:col-span-2 md:col-start-2 md:gap-y-10 md:self-center">
        <div className="col-span-3 row-start-1 flex items-center justify-center">
          <Image
            src={groupDiscussionImg}
            alt="Pixel art of a group of friends happily discussing around a table in a cozy, dimly-lit café, with one person showing something on a tablet"
            className="shadow-custom rounded-md"
            width={250}
            height={200}
          />
        </div>
        <div className="col-span-3 col-start-4 flex items-center justify-center">
          <Image
            src={uppsalaCityImg}
            alt="Pixel art of Uppsala cityscape with a church, bridge, and canal surrounded by greenery under a bright blue sky"
            className="shadow-custom rounded-md"
            width={230}
            height={200}
          />
        </div>
        <div className="boxShadow col-span-4 col-start-2 row-start-2 flex items-center justify-center">
          <Image
            src={desktopImg}
            alt="Pixel art of a computer setup in a cozy café"
            className="shadow-custom rounded-md"
            width={500}
            height={250}
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
