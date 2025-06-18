import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IconArrowUpRight } from '@tabler/icons-react';

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  link?: string;
  featured?: boolean;
  results?: {
    metric: string;
    value: string;
  }[];
}

interface CaseCardProps {
  caseStudy: CaseStudy;
  className?: string;
}

export const CaseCard: React.FC<CaseCardProps> = ({ caseStudy, className }) => {
  const {
    title,
    client,
    description,
    category,
    technologies,
    image,
    imageAlt,
    link,
    featured,
  } = caseStudy;

  const content = (
    <>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {link && (
            <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <IconArrowUpRight className="h-5 w-5 text-gray-900" />
            </div>
          )}
        </div>
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{client}</p>
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <Badge variant="secondary" className="ml-2">
              {category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
    </>
  );

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300 hover:shadow-lg',
        featured && 'md:col-span-2 md:row-span-2',
        className
      )}
    >
      {link ? (
        <Link href={link} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </Link>
      ) : (
        <div className="block">{content}</div>
      )}
    </Card>
  );
};