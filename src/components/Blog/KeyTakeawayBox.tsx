import React from 'react';
import { cn } from '@/lib/utils';
import { Lightbulb, Target, CheckCircle2 } from 'lucide-react';

interface KeyTakeawayBoxProps {
  title?: string;
  items: string[];
  variant?: 'default' | 'highlight' | 'success';
  className?: string;
}

const variantConfig = {
  default: {
    icon: Lightbulb,
    containerClass: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800',
    iconClass: 'text-purple-600 dark:text-purple-400',
    titleClass: 'text-purple-900 dark:text-purple-100'
  },
  highlight: {
    icon: Target,
    containerClass: 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800',
    iconClass: 'text-orange-600 dark:text-orange-400',
    titleClass: 'text-orange-900 dark:text-orange-100'
  },
  success: {
    icon: CheckCircle2,
    containerClass: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/20 dark:via-green-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
    titleClass: 'text-emerald-900 dark:text-emerald-100'
  }
};

export const KeyTakeawayBox: React.FC<KeyTakeawayBoxProps> = ({ 
  title = 'Det här tar du med dig',
  items,
  variant = 'default',
  className 
}) => {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border-2 p-6 my-8",
      config.containerClass,
      className
    )}>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gradient-to-br from-white/20 to-white/5 blur-2xl" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0">
            <Icon className={cn("h-6 w-6", config.iconClass)} />
          </div>
          <h3 className={cn("text-lg font-semibold", config.titleClass)}>
            {title}
          </h3>
        </div>
        
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className={cn("h-5 w-5 mt-0.5 flex-shrink-0", config.iconClass)} />
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};