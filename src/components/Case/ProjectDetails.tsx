import React, { useState } from 'react';
import Image from 'next/image';
import { DetailedCaseStudy } from '@/data/caseStudies';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import H3 from '@/components/ui/H3';
import Text from '@/components/ui/Text';
import { IconExternalLink } from '@tabler/icons-react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ImageZoomModal from '@/components/ImageZoomModal';
import { 
  Languages, 
  CalendarDays, 
  Clock, 
  UtensilsCrossed, 
  MessageCircle, 
  Image as ImageIcon,
  ZoomIn,
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
  const [zoomModal, setZoomModal] = useState<{
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
    title?: string;
  }>({
    isOpen: false,
    imageSrc: '',
    imageAlt: '',
    title: '',
  });

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

  const openZoomModal = (imageSrc: string, imageAlt: string, imageTitle?: string) => {
    setZoomModal({
      isOpen: true,
      imageSrc,
      imageAlt,
      title: imageTitle,
    });
  };

  const closeZoomModal = () => {
    setZoomModal({
      isOpen: false,
      imageSrc: '',
      imageAlt: '',
      title: '',
    });
  };

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
              className="shadow-2xl rounded-2xl"
              aspectRatio="16/10"
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
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
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
                  <div 
                    className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white cursor-pointer group"
                    onClick={() => openZoomModal(section.beforeImage!, `${section.title} - före`, `${section.title} - Före`)}
                  >
                    <Image
                      src={section.beforeImage}
                      alt={`${section.title} - före`}
                      fill
                      className="object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="h-4 w-4 text-gray-700" />
                    </div>
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
                  <div 
                    className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white cursor-pointer group"
                    onClick={() => openZoomModal(section.afterImage!, `${section.title} - efter`, `${section.title} - Efter`)}
                  >
                    <Image
                      src={section.afterImage}
                      alt={`${section.title} - efter`}
                      fill
                      className="object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="h-4 w-4 text-gray-700" />
                    </div>
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
            <div 
              className="relative aspect-video overflow-hidden rounded-2xl cursor-pointer group"
              onClick={() => openZoomModal(section.image!, section.title, section.title)}
            >
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="h-4 w-4 text-gray-700" />
              </div>
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

      {/* Image Zoom Modal */}
      <ImageZoomModal
        isOpen={zoomModal.isOpen}
        onClose={closeZoomModal}
        imageSrc={zoomModal.imageSrc}
        imageAlt={zoomModal.imageAlt}
        title={zoomModal.title}
      />
    </article>
  );
};