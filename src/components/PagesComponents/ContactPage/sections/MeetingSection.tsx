import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import { ContactButton } from '@/components/ContactButton';
import { Calendar, Clock, MessageCircle } from 'lucide-react';

const MeetingSection = () => {
  return (
    <Section className="py-20 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
      <div className="mx-auto max-w-4xl space-y-12 text-center">
        <div className="space-y-6">
          <Text as="h3" className="text-4xl font-bold tracking-tight">
            Eller boka ett möte direkt
          </Text>
          <Text as="p" className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Föredrar du att boka in ett möte direkt? Klicka nedan för att välja en tid som passar dig.
          </Text>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-white/50 backdrop-blur-sm">
            <Calendar className="h-8 w-8 text-purple-600" />
            <Text as="p" className="text-sm text-muted-foreground">
              Välj tid som passar dig
            </Text>
          </div>
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-white/50 backdrop-blur-sm">
            <Clock className="h-8 w-8 text-pink-600" />
            <Text as="p" className="text-sm text-muted-foreground">
              30 minuters kostnadsfri konsultation
            </Text>
          </div>
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-white/50 backdrop-blur-sm">
            <MessageCircle className="h-8 w-8 text-purple-600" />
            <Text as="p" className="text-sm text-muted-foreground">
              Diskutera ditt projekt
            </Text>
          </div>
        </div>
        
        <ContactButton className="mx-auto" />
      </div>
    </Section>
  );
};

export default MeetingSection;