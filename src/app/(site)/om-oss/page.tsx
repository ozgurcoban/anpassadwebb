import Image from 'next/image';
import abstractImage from '@/assets/abstract_digital_network_connections.png';
import { Separator } from '@/components/ui/separator';
import SubHero from '@/components/SubHero';
import img from '@/assets/blog-hero.png';

const AboutPage = () => {
  return (
    <section className="">
      <SubHero
        title="Om oss"
        description="Här delar vi med oss av nyheter, insikter och tips om webbdesign och SEO."
        imageSrc={img}
        textAlign="right"
      />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <h1 className="text-5xl font-semibold leading-snug">
            Vi är ByteSpark. Vi skapar framtidens digitala upplevelser med
            precision och passion.
          </h1>
          <div className="space-y-4 text-justify font-light leading-relaxed">
            <p className="">
              ByteSpark är ett webbutvecklings- och designföretag baserat i
              Uppsala, specialiserat på att bygga moderna, intuitiva och
              visuellt engagerande webblösningar. Vår vision är att förenkla det
              digitala landskapet och skapa webbsidor som inte bara ser bra ut,
              utan som också levererar på högsta nivå när det gäller prestanda
              och användarvänlighet.
            </p>
            <p className="">
              Vi är ett team av kreatörer som älskar teknik och innovation. Vi
              tror på kraften i ett genomtänkt och välutformat digitalt
              gränssnitt, och vi strävar efter att ta fram lösningar som gör att
              företag och individer kan nå sin fulla potential på nätet. Vårt
              arbete kännetecknas av omsorg för detaljer, effektivitet, och en
              konstant vilja att förbättra.
            </p>
            <p className="">
              Vi har erfarenhet av att skapa allt från personliga bloggar till
              professionella portfolios, och vi är här för att hjälpa våra
              kunder i varje steg på vägen – från idé till färdig produkt. På
              ByteSpark handlar allt om att sätta användaren i centrum, och vi
              ser till att våra lösningar alltid är anpassade för att möta deras
              behov och överträffa deras förväntningar.
            </p>
          </div>
        </div>
        <div className="justify-self-center">
          <Image
            src={abstractImage}
            alt="abstract digital network connections"
            className="rotate-[2deg] rounded shadow-custom"
            width={400}
            height={400}
            sizes="(min-width: 640px) 500px, 100vw"
            placeholder="blur"
          />
          <Separator className="mb-10 mt-20" />
          <h2>Kontakta oss</h2>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
