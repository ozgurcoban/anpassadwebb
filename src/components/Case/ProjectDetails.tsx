import React from 'react';
import Image from 'next/image';
import { CaseStudy } from './CaseCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  IconBrandGithub,
  IconExternalLink,
  IconCalendar,
  IconCode,
  IconTarget,
  IconChartBar,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import H3 from '@/components/ui/H3';
import H4 from '@/components/ui/H4';
import Text from '@/components/ui/Text';

interface ProjectDetailsProps {
  caseStudy: CaseStudy & {
    longDescription?: string;
    challenges?: string[];
    solutions?: string[];
    projectDuration?: string;
    teamSize?: number;
    testimonial?: {
      quote: string;
      author: string;
      position: string;
    };
    gallery?: {
      src: string;
      alt: string;
      caption?: string;
    }[];
  };
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ caseStudy }) => {
  const {
    title,
    client,
    description,
    longDescription,
    category,
    technologies,
    image,
    imageAlt,
    link,
    results,
    challenges,
    solutions,
    projectDuration,
    teamSize,
    testimonial,
    gallery,
  } = caseStudy;

  return (
    <article className="space-y-12">
      {/* Hero Image */}
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Project Overview */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <H3>{title}</H3>
            <Text size="lg" className="mt-2 text-muted-foreground">
              {client}
            </Text>
          </div>
          
          <Text className="text-lg leading-relaxed">
            {longDescription || description}
          </Text>

          {/* Challenges & Solutions */}
          {(challenges || solutions) && (
            <div className="grid gap-6 md:grid-cols-2">
              {challenges && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconTarget className="h-5 w-5" />
                      Utmaningar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span className="text-sm">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {solutions && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconCode className="h-5 w-5" />
                      Lösningar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {solutions.map((solution, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span className="text-sm">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Project Info Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Projektdetaljer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Text className="text-sm font-medium text-muted-foreground">Kategori</Text>
                <Badge variant="secondary" className="mt-1">
                  {category}
                </Badge>
              </div>

              {projectDuration && (
                <div>
                  <Text className="text-sm font-medium text-muted-foreground">Projekttid</Text>
                  <Text className="flex items-center gap-2 mt-1">
                    <IconCalendar className="h-4 w-4" />
                    {projectDuration}
                  </Text>
                </div>
              )}

              {teamSize && (
                <div>
                  <Text className="text-sm font-medium text-muted-foreground">Teamstorlek</Text>
                  <Text className="mt-1">{teamSize} personer</Text>
                </div>
              )}

              <div>
                <Text className="text-sm font-medium text-muted-foreground">Teknologier</Text>
                <div className="mt-2 flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {link && (
                <Button asChild className="w-full">
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    <IconExternalLink className="mr-2 h-4 w-4" />
                    Besök webbplatsen
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          {results && results.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconChartBar className="h-5 w-5" />
                  Resultat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {results.map((result, index) => (
                  <div key={index}>
                    <Text className="text-2xl font-bold text-primary">
                      {result.value}
                    </Text>
                    <Text className="text-sm text-muted-foreground">
                      {result.metric}
                    </Text>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Testimonial */}
      {testimonial && (
        <Card className="bg-secondary">
          <CardContent className="pt-6">
            <blockquote className="space-y-4">
              <Text className="text-lg italic leading-relaxed">
                "{testimonial.quote}"
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

      {/* Gallery */}
      {gallery && gallery.length > 0 && (
        <div className="space-y-4">
          <H4>Projektbilder</H4>
          <div className="grid gap-4 md:grid-cols-2">
            {gallery.map((image, index) => (
              <figure key={index} className="space-y-2">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {image.caption && (
                  <figcaption className="text-sm text-muted-foreground text-center">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};