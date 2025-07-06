import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Zap, 
  Search, 
  Users, 
  MapPin 
} from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Personlig service',
    description: 'Från start till mål',
  },
  {
    icon: Zap,
    title: 'Modern teknik',
    description: 'Bästa prestanda',
  },
  {
    icon: Search,
    title: 'SEO-optimerat',
    description: 'Från grunden',
  },
  {
    icon: MapPin,
    title: 'Lokalt förankrad',
    description: 'I Uppsala',
  },
];

interface ValuePropositionProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function ValueProposition({ 
  className,
  variant = 'dark' 
}: ValuePropositionProps) {
  return (
    <div className={cn(
      "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6",
      className
    )}>
      {benefits.map((benefit, index) => {
        const Icon = benefit.icon;
        return (
          <div
            key={index}
            className={cn(
              "flex flex-col items-center text-center space-y-1.5",
              "transform transition-transform duration-300 hover:scale-105"
            )}
          >
            <div className={cn(
              "p-2 md:p-3 rounded-full",
              variant === 'dark' 
                ? "bg-white/10 backdrop-blur-sm" 
                : "bg-primary/10"
            )}>
              <Icon className={cn(
                "h-4 w-4 md:h-5 md:w-5",
                variant === 'dark' ? "text-white" : "text-primary"
              )} />
            </div>
            <div>
              <h3 className={cn(
                "font-semibold text-xs md:text-sm",
                variant === 'dark' ? "text-white" : "text-foreground"
              )}>
                {benefit.title}
              </h3>
              <p className={cn(
                "text-[10px] md:text-xs mt-0.5",
                variant === 'dark' 
                  ? "text-white/70" 
                  : "text-muted-foreground"
              )}>
                {benefit.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}