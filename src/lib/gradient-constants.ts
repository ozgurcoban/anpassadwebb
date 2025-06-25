// Shared gradient definitions for consistent styling across components

/**
 * Primary gradient used for active states and CTAs
 * Blue -> Purple -> Pink gradient
 */
export const PRIMARY_GRADIENT = {
  // Base gradient colors
  colors: 'from-blue-500 via-purple-500 to-pink-500',
  
  // Full gradient class
  full: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
  
  // With opacity on colors
  withOpacity: 'bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-pink-500/80',
  
  // For pseudo-elements
  before: 'before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500',
  
  // For gradient text
  text: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent',
  
  // For gradient text over images (lighter colors)
  textLight: 'bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent',
} as const;

/**
 * Gradient opacity values for different use cases
 */
export const GRADIENT_OPACITY = {
  navigation: 'opacity-75',
  button: 'opacity-90',
  hover: 'opacity-100',
} as const;