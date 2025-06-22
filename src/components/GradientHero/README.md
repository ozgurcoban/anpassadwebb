# GradientHero Component

A high-performance, interactive gradient hero component with floating elements and mouse-tracking effects.

## Features

- ✅ **Performance Optimized**: Separated hooks, React.memo, and GPU acceleration
- ✅ **Context-based**: Eliminates prop drilling with React Context
- ✅ **Modular Architecture**: Split into focused, reusable hooks
- ✅ **TypeScript**: Fully typed with improved interfaces  
- ✅ **Responsive**: Works across all devices with performance detection
- ✅ **Compound Components**: Flexible API for complex layouts

## Basic Usage

```tsx
import GradientHero from '@/components/GradientHero';

<GradientHero
  title="Welcome to Digital Studio"
  description="Creating digital experiences that matter"
  colorScheme="purple-pink"
  textAlign="left"
  minHeight="60vh"
  secondaryCTA={{
    text: "Learn More",
    href: "/about"
  }}
/>
```

## Advanced Usage (Compound Components)

```tsx
import { GradientHeroCompound } from '@/components/GradientHero';

<GradientHeroCompound.Root colorScheme="blue-purple" className="custom-class">
  <GradientHeroCompound.Background minHeight="80vh">
    <div className="custom-layout">
      <GradientHeroCompound.Content
        title="Custom Layout"
        description="Build your own layout"
        textAlign="center"
      />
      {/* Add your own content here */}
    </div>
    <GradientHeroCompound.Floating />
    <GradientHeroCompound.Interactive />
  </GradientHeroCompound.Background>
</GradientHeroCompound.Root>
```

## Architecture

### Hooks
- `useInteractiveGradient` - Main orchestrator hook
- `usePerformanceDetection` - Device capability detection
- `useMouseTracking` - Mouse position and interaction tracking
- `useColorTransformation` - Color calculations and memoization

### Components
- `GradientBackground` - Background with gradients and patterns
- `GradientContent` - Text content with glassmorphism styling
- `FloatingElements` - Animated blobs and code snippets
- `InteractiveEffects` - Mouse-following particles and orbs

### Context
- `GradientHeroContext` - Eliminates prop drilling across components

## Performance Features

- **React.memo**: All heavy components are memoized
- **GPU Acceleration**: `transform3d`, `will-change`, and `contain` properties
- **Device Detection**: Automatic performance optimizations for low-end devices
- **Optimized Animation**: `requestAnimationFrame` instead of intervals
- **Smooth Interpolation**: Natural mouse-following with lerp

## Color Schemes

- `blue-purple` - Blue to purple gradient
- `purple-pink` - Purple to pink gradient  
- `pink-orange` - Pink to orange gradient
- `blue-green` - Blue to green gradient
- `custom` - Use your own colors with `customColors` prop

## Props

### GradientHeroProps
```tsx
interface GradientHeroProps {
  title: string;
  description?: string;
  colorScheme?: ColorScheme;
  customColors?: string[];
  textAlign?: 'left' | 'center' | 'right';
  secondaryCTA?: {
    text: string;
    href: string;
  };
  className?: string;
  minHeight?: string;
}
```

## Browser Support

Optimized for:
- ✅ Chrome/Edge (with specific performance fixes)
- ✅ Safari
- ✅ Firefox
- ✅ Mobile browsers (with reduced effects)

## Migration Guide

The refactored component is backward compatible. Existing usage will continue to work without changes.

For new projects, consider using the compound component API for more flexibility.