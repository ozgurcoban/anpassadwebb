import { Zap, Users, Headphones } from 'lucide-react';
import Section from './ui/Section';
import Text from './ui/Text';

const services = [
  {
    icon: Zap,
    title: 'En hemsida som laddar snabbt och syns på Google',
    gradient: 'from-pink-400 to-rose-400',
  },
  {
    icon: Users,
    title: 'Design som gör det lätt att kontakta dig',
    gradient: 'from-yellow-400 to-orange-400',
  },
  {
    icon: Headphones,
    title: 'Support när du behöver det – på svenska',
    gradient: 'from-teal-400 to-cyan-400',
  },
];

const ServicesSection = () => {
  return (
    <Section className="bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-6xl">
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
                className={`mb-6 inline-flex rounded-xl bg-gradient-to-r ${service.gradient} p-4 shadow-lg transition-transform group-hover:scale-110`}
              >
                <service.icon className="h-8 w-8 text-white" />
              </div>
              
              <Text as="h3" className="font-semibold">
                {service.title}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ServicesSection;