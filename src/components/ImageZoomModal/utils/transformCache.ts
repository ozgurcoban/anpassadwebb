import { Position } from '../types';

interface TransformCache {
  scale: number;
  position: Position;
  cssTransform: string;
  matrix: DOMMatrix;
}

// LRU cache for transform calculations
class TransformCacheManager {
  private cache: Map<string, TransformCache> = new Map();
  private maxSize: number = 50;
  
  private getCacheKey(scale: number, position: Position): string {
    return `${scale.toFixed(3)}_${position.x.toFixed(1)}_${position.y.toFixed(1)}`;
  }
  
  get(scale: number, position: Position): TransformCache | null {
    const key = this.getCacheKey(scale, position);
    const cached = this.cache.get(key);
    
    if (cached) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, cached);
      return cached;
    }
    
    return null;
  }
  
  set(scale: number, position: Position, cssTransform: string, matrix: DOMMatrix): void {
    const key = this.getCacheKey(scale, position);
    
    // Remove oldest entry if at capacity
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    
    this.cache.set(key, {
      scale,
      position,
      cssTransform,
      matrix
    });
  }
  
  clear(): void {
    this.cache.clear();
  }
}

// Singleton instance
const transformCache = new TransformCacheManager();

// Optimized transform calculation with caching
export function getOptimizedTransform(
  scale: number, 
  position: Position,
  isDragging: boolean = false
): { cssTransform: string; matrix: DOMMatrix } {
  // Skip cache during dragging for real-time updates
  if (isDragging) {
    const cssTransform = `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`;
    const matrix = new DOMMatrix()
      .scaleSelf(scale, scale)
      .translateSelf(position.x / scale, position.y / scale);
    
    return { cssTransform, matrix };
  }
  
  // Check cache first
  const cached = transformCache.get(scale, position);
  if (cached) {
    return { cssTransform: cached.cssTransform, matrix: cached.matrix };
  }
  
  // Calculate new transform
  const cssTransform = `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`;
  const matrix = new DOMMatrix()
    .scaleSelf(scale, scale)
    .translateSelf(position.x / scale, position.y / scale);
  
  // Cache the result
  transformCache.set(scale, position, cssTransform, matrix);
  
  return { cssTransform, matrix };
}

// Batch transform updates for better performance
export class TransformBatcher {
  private pendingUpdates: Map<HTMLElement, { scale: number; position: Position }> = new Map();
  private rafId: number | null = null;
  
  scheduleUpdate(element: HTMLElement, scale: number, position: Position): void {
    this.pendingUpdates.set(element, { scale, position });
    
    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => this.flush());
    }
  }
  
  private flush(): void {
    this.pendingUpdates.forEach(({ scale, position }, element) => {
      const { cssTransform } = getOptimizedTransform(scale, position);
      element.style.transform = cssTransform;
    });
    
    this.pendingUpdates.clear();
    this.rafId = null;
  }
  
  cancel(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.pendingUpdates.clear();
  }
}

// Export singleton batcher
export const transformBatcher = new TransformBatcher();

// Clear cache on memory pressure
if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Clear cache periodically when idle
    setInterval(() => {
      if (document.hidden) {
        transformCache.clear();
      }
    }, 60000); // Every minute when page is hidden
  });
}