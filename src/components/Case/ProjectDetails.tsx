import React from 'react';
import Image from 'next/image';
import { DetailedCaseStudy } from '@/data/caseStudies';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import H3 from '@/components/ui/H3';
import Text from '@/components/ui/Text';
import { IconExternalLink } from '@tabler/icons-react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { 
  Languages, 
  CalendarDays, 
  Clock, 
  UtensilsCrossed, 
  MessageCircle, 
  Image as ImageIcon,
  LucideIcon 
} from 'lucide-react';

interface ProjectDetailsProps {
  caseStudy: DetailedCaseStudy;
  showHeroImage?: boolean;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  caseStudy,
  showHeroImage = true,
}) => {
  const {
    title,
    client,
    description,
    longDescription,
    beforeImage,
    afterImage,
    image,
    imageAlt,
    link,
    story,
    testimonial,
    aboutSection,
    processSection,
  } = caseStudy;

  return (
    <article className="space-y-24">
      {/* Hero Section */}
      {showHeroImage && (
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold">{title}</h1>
            <Text size="lg" className="mt-2 text-muted-foreground">
              {client}
            </Text>
            <Text className="mx-auto mt-6 max-w-2xl text-xl">
              {longDescription || description}
            </Text>
          </div>
          
          {beforeImage && afterImage ? (
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Tidigare"
              afterLabel="Nu"
              className="shadow-2xl"
              aspectRatio="16/10"
              borderRadius="1rem"
              sliderHandleSize="lg"
              initialPosition={30}
            />
          ) : (
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          )}
        </div>
      )}

      {/* Story Sections */}
      {story && story.map((section, index) => (
        <section key={index} className="space-y-12">
          <div className="text-center">
            <H3 className="text-4xl font-semibold">{section.title}</H3>
            <Text className="mt-2 text-xl text-muted-foreground">
              {section.subtitle}
            </Text>
          </div>

          {/* Features List or Before/After Grid */}
          {section.features ? (
            <div className="mx-auto max-w-3xl">
              <div className="grid gap-4 md:grid-cols-2">
                {section.features.map((feature, idx) => {
                  const iconMap: Record<string, LucideIcon> = {
                    Languages,
                    CalendarDays,
                    Clock,
                    UtensilsCrossed,
                    MessageCircle,
                    Image: ImageIcon,
                  };
                  const Icon = feature.icon ? iconMap[feature.icon] : null;
                  
                  return (
                    <div key={idx} className="rounded-xl bg-secondary/50 p-6 flex gap-4">
                      {Icon && (
                        <div className="flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      )}
                      <div className="flex-1">
                        <Text className="font-semibold text-lg mb-2">
                          {feature.title}
                        </Text>
                        <Text className="text-muted-foreground">
                          {feature.description}
                        </Text>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Before */}
              <div className="space-y-4">
                <div className="rounded-2xl bg-muted/50 p-8">
                  <Text className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {section.beforeTitle}
                  </Text>
                  <Text className="mt-4 text-lg">
                    {section.beforeDescription}
                  </Text>
                </div>
                {section.beforeImage && (
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={section.beforeImage}
                      alt={`${section.title} - före`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>

              {/* After */}
              <div className="space-y-4">
                <div className="rounded-2xl bg-primary/5 p-8">
                  <Text className="text-sm font-medium uppercase tracking-wider text-primary">
                    {section.afterTitle}
                  </Text>
                  <Text className="mt-4 text-lg">
                    {section.afterDescription}
                  </Text>
                </div>
                {section.afterImage && (
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={section.afterImage}
                      alt={`${section.title} - efter`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Value Highlight */}
          <div className="text-center">
            <Text className="text-3xl font-bold text-primary">
              {section.value}
            </Text>
          </div>

          {/* Full width image if provided */}
          {section.image && (
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          )}
        </section>
      ))}

      {/* Testimonial */}
      {testimonial && (
        <Card className="mx-auto max-w-3xl border-0 bg-secondary/50">
          <CardContent className="p-12 text-center">
            <blockquote className="space-y-6">
              <Text className="text-2xl font-light italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </Text>
              <footer>
                <Text className="font-medium">{testimonial.author}</Text>
                <Text className="text-sm text-muted-foreground">
                  {testimonial.position}
                </Text>
              </footer>
            </blockquote>
          </CardContent>
        </Card>
      )}

      {/* About Section */}
      {aboutSection && (
        <section className="mx-auto max-w-3xl text-center">
          <H3 className="mb-8 text-4xl font-semibold">{aboutSection.title}</H3>
          <Text className="text-lg leading-relaxed text-muted-foreground">
            {aboutSection.content}
          </Text>
        </section>
      )}

      {/* Process Section */}
      {processSection && (
        <section className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <H3 className="mb-4 text-4xl font-semibold">{processSection.subtitle}</H3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {processSection.steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                    {index + 1}
                  </div>
                </div>
                <Text className="text-lg text-muted-foreground pt-2">
                  {step}
                </Text>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      {link && (
        <div className="text-center">
          <Button size="lg" asChild className="gap-2">
            <Link href={link} target="_blank" rel="noopener noreferrer">
              Besök webbplatsen
              <IconExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </article>
  );
};