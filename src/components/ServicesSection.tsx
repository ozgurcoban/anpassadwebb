import { Zap, Users, MousePointerClick, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Section from './ui/Section';
import SectionContainer from './ui/SectionContainer';
import Text from './ui/Text';

const services = [
  {
    icon: Zap,
    heading: 'Snabb & Google-vänlig',
    title: 'En hemsida som laddar snabbt och syns på Google',
  },
  {
    icon: Users,
    heading: 'Användarvänlig',
    title: 'Strategisk design som gör det lätt att kontakta dig',
  },
  {
    icon: MousePointerClick,
    heading: 'Konverterar besökare',
    title: 'Optimerade hemsidor för att förvandla besökare till kunder',
  },
];

const ServicesSection = () => {
  return (
    <Section variant="wide" className="bg-gray-50 dark:bg-gray-900/50">
      <SectionContainer>
        <header className="mb-12 text-center">
          <Text as="h2" size="xl" className="mb-4">
            Vad vi erbjuder
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            Inga tekniska termer, bara lösningar som fungerar
          </Text>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-gray-800"
            >
              <div
                className="mb-6 inline-flex rounded-xl bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 p-4 shadow-lg transition-transform group-hover:scale-110"
              >
                <service.icon className="h-8 w-8 text-white" />
              </div>

              <Text as="h3" className="mb-2 text-xl font-semibold">
                {service.heading}
              </Text>
              <Text className="text-gray-600 dark:text-gray-400">
                {service.title}
              </Text>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex items-center justify-center">
          <Link 
            href="/case/palermo-uppsala" 
            className="group flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <CheckCircle className="h-5 w-5 text-green-500" />
            <Text className="italic">
              Vi har hjälpt Palermo Uppsala att växa online
            </Text>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </SectionContainer>
    </Section>
  );
};

export default ServicesSection;
