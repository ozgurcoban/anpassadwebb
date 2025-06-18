import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import { ContactButton } from '@/components/ContactButton';

const MeetingSection = () => {
  return (
    <Section className="pb-20">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <Text as="h3" className="text-2xl">
          Eller boka ett möte direkt
        </Text>
        <Text as="p" className="text-lg text-muted-foreground">
          Föredrar du att boka in ett möte direkt? Klicka nedan för att välja en tid som passar dig.
        </Text>
        <ContactButton className="mx-auto" />
      </div>
    </Section>
  );
};

export default MeetingSection;