import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import SectionHeading from '@/components/ui/SectionHeading';
import { Calendar, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const MeetingSection = () => {
  return (
    <Section className="py-20 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
      <div className="mx-auto max-w-4xl space-y-12 text-center">
        <SectionHeading
          title="Eller boka ett möte direkt"
          subtitle="Föredrar du att boka in ett möte direkt? Klicka nedan för att välja en tid som passar dig."
          as="h3"
          titleClassName="text-3xl font-bold"
          subtitleClassName="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        />
        
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <Card className="bg-white/50 backdrop-blur-sm border-white/20">
            <CardContent className="flex flex-col items-center space-y-3 p-6">
              <Calendar className="h-8 w-8 text-purple-600" />
              <Text as="p" className="text-sm text-muted-foreground">
                Välj tid som passar dig
              </Text>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm border-white/20">
            <CardContent className="flex flex-col items-center space-y-3 p-6">
              <Clock className="h-8 w-8 text-pink-600" />
              <Text as="p" className="text-sm text-muted-foreground">
                30 minuters kostnadsfri konsultation
              </Text>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm border-white/20">
            <CardContent className="flex flex-col items-center space-y-3 p-6">
              <MessageCircle className="h-8 w-8 text-purple-600" />
              <Text as="p" className="text-sm text-muted-foreground">
                Diskutera ditt projekt
              </Text>
            </CardContent>
          </Card>
        </div>
        
        <Link href="/boka-mote">
          <Button variant="rainbow" size="lg" className="mx-auto">
            Boka möte direkt
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default MeetingSection;