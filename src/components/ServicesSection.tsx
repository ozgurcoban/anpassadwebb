import { Zap, Users, TrendingDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Section from './ui/Section';
import SectionContainer from './ui/SectionContainer';
import Text from './ui/Text';
import SectionHeading from './ui/SectionHeading';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { PRIMARY_GRADIENT } from '@/lib/gradient-constants';

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
    icon: TrendingDown,
    heading: 'Låga driftkostnader',
    title: 'Växer med er – små kostnader först, mer när ni tjänar mer.',
  },
];

const ServicesSection = () => {
  return (
    <Section variant="wide" className="bg-muted/50">
      <SectionContainer>
        <SectionHeading
          title="Vad vi erbjuder"
          subtitle="Webbutveckling i Uppsala - inga tekniska termer, bara lösningar som fungerar"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-8">
                <div className="mb-6 inline-flex rounded-xl p-4 transition-transform group-hover:scale-110">
                  <service.icon
                    className="h-10 w-10 text-primary"
                    strokeWidth={1.5}
                  />
                </div>

                <Text as="h3" className="mb-2 text-xl font-semibold">
                  {service.heading}
                </Text>
                <Text className="text-muted-foreground">{service.title}</Text>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Text className="mb-2 text-muted-foreground">
            Palermo klättrade från plats 25 till 5 för &quot;pizza
            uppsala&quot;.
          </Text>
          <Text className="mb-4 text-muted-foreground">
            Vi stod för webb, SEO och sidstruktur.
          </Text>
          <Button variant="outline" size="lg" asChild className="group">
            <Link href="/case">
              Läs caset här
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </SectionContainer>
    </Section>
  );
};

export default ServicesSection;
