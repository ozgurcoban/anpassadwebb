export const blogStyles = {
  gradients: {
    primary: 'from-blue-600 via-purple-600 to-pink-600',
    primaryHover: 'from-blue-600 via-purple-600 to-pink-600',
    overlay: {
      dark: 'from-black/20 via-black/30 to-black/60',
      light: 'from-transparent via-transparent to-black/30',
      card: 'from-blue-50/20 via-purple-50/10 to-pink-50/20 dark:from-blue-900/10 dark:via-purple-900/5 dark:to-pink-900/10'
    },
    placeholder: 'from-blue-100 via-purple-100 to-pink-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700',
    button: {
      primary: 'from-blue-50 to-purple-50',
      primaryDark: 'from-blue-900/20 to-purple-900/20'
    }
  },
  
  tags: {
    base: 'inline-flex items-center rounded-full font-medium transition-all duration-200',
    sizes: {
      sm: 'px-2.5 py-1 text-xs',
      md: 'px-3 py-1 text-xs',
      lg: 'px-3.5 py-1.5 text-sm'
    },
    variants: {
      default: 'bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 hover:from-blue-100 hover:to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 dark:text-purple-300 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 border border-purple-200/50 dark:border-purple-700/50',
      selected: 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700',
      outline: 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-primary/70 dark:text-gray-300 dark:hover:text-primary/80',
      muted: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
      counter: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
    }
  },
  
  cards: {
    base: 'overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-500',
    variants: {
      default: 'bg-white/80 border border-gray-200/50 shadow-md hover:shadow-2xl hover:-translate-y-2 dark:bg-gray-800/80 dark:border-gray-700/50',
      transparent: 'bg-white/95 shadow-2xl backdrop-blur-sm dark:bg-gray-800/95',
      glass: 'bg-white/50 border-gray-200/50 dark:bg-gray-800/50 dark:border-gray-700/50'
    }
  },
  
  buttons: {
    glass: 'rounded-lg backdrop-blur-sm transition-all',
    variants: {
      light: 'bg-white/10 text-white hover:bg-white/20',
      active: 'bg-purple-600 text-white hover:bg-purple-700'
    }
  },
  
  prose: {
    base: 'prose prose-lg max-w-none',
    headings: 'prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100',
    paragraphs: 'prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300',
    dark: 'dark:prose-invert'
  },
  
  animations: {
    hover: {
      scale: 'transition-transform group-hover:scale-110',
      translateY: 'transition-all duration-500 hover:-translate-y-2',
      fadeIn: 'transition-opacity duration-300 opacity-0 group-hover:opacity-100'
    }
  }
} as const;

export const getTagClasses = (
  variant: keyof typeof blogStyles.tags.variants = 'default',
  size: keyof typeof blogStyles.tags.sizes = 'md'
) => {
  return `${blogStyles.tags.base} ${blogStyles.tags.sizes[size]} ${blogStyles.tags.variants[variant]}`;
};

export const getCardClasses = (
  variant: keyof typeof blogStyles.cards.variants = 'default'
) => {
  return `${blogStyles.cards.base} ${blogStyles.cards.variants[variant]}`;
};

export const getButtonClasses = (
  variant: keyof typeof blogStyles.buttons.variants = 'light'
) => {
  return `${blogStyles.buttons.glass} ${blogStyles.buttons.variants[variant]}`;
};