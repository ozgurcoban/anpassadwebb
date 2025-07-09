import { Card, CardContent } from '@/components/ui/card';
import Text from '@/components/ui/Text';
import SectionHeading from '@/components/ui/SectionHeading';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { cn } from '@/lib/utils';
import { 
  MessageCircle, 
  Palette, 
  Code2, 
  HeartHandshake 
} from 'lucide-react';

interface ProcessStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const processSteps: ProcessStep[] = [
  {
    title: 'Dialog och planering',
    description: 'Du berättar om dina mål och behov.',
    icon: <MessageCircle className="h-6 w-6" />,
  },
  {
    title: 'Skiss och förslag',
    description: 'Du får se hur sidan kan se ut innan vi sätter igång.',
    icon: <Palette className="h-6 w-6" />,
  },
  {
    title: 'Utveckling',
    description: 'Tidsramen beror på projektets omfattning.',
    icon: <Code2 className="h-6 w-6" />,
  },
  {
    title: 'Långsiktig support',
    description: 'Vi hjälper gärna till med löpande underhåll och förbättringar.',
    icon: <HeartHandshake className="h-6 w-6" />,
  },
];

interface ProcessSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: 'default' | 'compact';
}

export default function ProcessSection({ 
  title = 'Så arbetar vi',
  subtitle = 'Snabbt, enkelt och utan krångel - från idé till färdig hemsida',
  className,
  variant = 'default'
}: ProcessSectionProps) {
  return (
    <Section variant="default" className={cn('py-16 md:py-24', className)}>
      <SectionContainer>
        <SectionHeading
          title={title}
          subtitle={subtitle}
          subtitleClassName="text-muted-foreground"
          className="mb-12"
        />

        <div className={cn(
          'grid gap-6',
          variant === 'default' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2'
        )}>
          {processSteps.map((step, index) => (
            <Card 
              key={index} 
              className={cn(
                'relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm',
                'transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
              )}
            >
              <CardContent className="p-6">
                {/* Step number */}
                <div className="absolute -top-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-br from-brand-purple/10 to-brand-pink/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-brand-purple">
                    {index + 1}
                  </span>
                </div>

                {/* Icon */}
                <div className={cn(
                  'mb-4 inline-flex rounded-xl p-3',
                  'bg-gradient-to-r from-brand-purple to-brand-pink',
                  'text-white shadow-lg'
                )}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold">
                  {step.title}
                </h3>
                <Text className="text-muted-foreground">
                  {step.description}
                </Text>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="mt-12 text-center">
          <Text className="text-lg text-muted-foreground">
            Redo att komma igång? Vi guidar dig genom hela processen.
          </Text>
        </div>
      </SectionContainer>
    </Section>
  );
}