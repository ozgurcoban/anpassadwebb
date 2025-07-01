# ImageZoomModal Component

A high-performance, accessible React component for zooming and panning images with support for mouse, touch, and keyboard interactions.

## Features

- 🖱️ **Mouse Support**: Wheel zoom, drag to pan
- 📱 **Touch Support**: Pinch to zoom, drag to pan
- ⌨️ **Keyboard Controls**: +/- for zoom, 0 to fit, ESC to close
- 🎯 **Smart Zoom**: Zoom to cursor/touch point
- 🚀 **High Performance**: 60fps animations with transform caching
- ♿ **Accessible**: Keyboard navigation, ARIA labels
- 🎨 **Flexible API**: Compound components, render props, or hooks
- 📦 **Zero Dependencies**: Only requires React and your UI library

## Installation

```bash
# The component is already part of your project
# Just import and use it
```

## Quick Start

### Basic Usage

```tsx
import ImageZoomModal from '@/components/ImageZoomModal';

function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <img 
        src="/photo.jpg" 
        onClick={() => setIsOpen(true)}
        alt="Click to zoom"
      />
      
      <ImageZoomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        imageSrc="/photo.jpg"
        imageAlt="Beautiful photo"
        title="Photo Title"
      />
    </>
  );
}
```

### Using the Hook

```tsx
import { useImageZoomModal } from '@/components/ImageZoomModal/useImageZoomModal';
import ImageZoomModal from '@/components/ImageZoomModal';

function Gallery() {
  const imageZoom = useImageZoomModal();
  
  return (
    <>
      <img 
        src="/photo.jpg" 
        onClick={() => imageZoom.open({
          src: '/photo.jpg',
          alt: 'Beautiful photo',
          title: 'Photo Title'
        })}
      />
      
      <ImageZoomModal {...imageZoom.modalProps} />
    </>
  );
}
```

## Advanced Usage

### Compound Components

Build custom layouts with compound components:

```tsx
import { ImageZoomModal } from '@/components/ImageZoomModal/ImageZoomModal.compound';

function CustomZoomModal(props) {
  return (
    <ImageZoomModal {...props}>
      <ImageZoomModal.Dialog>
        <ImageZoomModal.Content className="custom-bg">
          <ImageZoomModal.Title />
          <ImageZoomModal.Controls 
            showHelp={false}
            showZoomInfo={false}
          />
          <ImageZoomModal.Canvas className="custom-canvas" />
        </ImageZoomModal.Content>
      </ImageZoomModal.Dialog>
    </ImageZoomModal>
  );
}
```

### Render Props

Complete control over rendering:

```tsx
import { ImageZoomModalRenderProp } from '@/components/ImageZoomModal/ImageZoomModalRenderProp';

function CustomModal(props) {
  return (
    <ImageZoomModalRenderProp {...props}>
      {({ scale, canvasProps, imageProps, zoomIn, zoomOut, onClose }) => (
        <div className="custom-modal">
          <button onClick={onClose}>×</button>
          <div {...canvasProps}>
            <img {...imageProps} />
          </div>
          <div className="controls">
            <button onClick={zoomOut}>-</button>
            <span>{Math.round(scale * 100)}%</span>
            <button onClick={zoomIn}>+</button>
          </div>
        </div>
      )}
    </ImageZoomModalRenderProp>
  );
}
```

### Gallery with Navigation

```tsx
import { useImageZoomGallery } from '@/components/ImageZoomModal/useImageZoomModal';
import { GalleryImageZoomModal } from '@/components/ImageZoomModal.composed';

function PhotoGallery({ images }) {
  const gallery = useImageZoomGallery(images);
  
  return (
    <>
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          onClick={() => gallery.openAt(index)}
        />
      ))}
      
      <GalleryImageZoomModal
        {...gallery.modalProps}
        currentIndex={gallery.currentIndex}
        totalImages={gallery.totalImages}
        onNext={gallery.next}
        onPrevious={gallery.previous}
      />
    </>
  );
}
```

## API Reference

### ImageZoomModal Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | ✓ | Controls modal visibility |
| `onClose` | `() => void` | ✓ | Called when modal should close |
| `imageSrc` | `string` | ✗ | Image URL to display |
| `imageAlt` | `string` | ✗ | Alt text for the image |
| `title` | `string` | ✗ | Optional title shown in modal |

### Keyboard Controls

| Key | Action |
|-----|--------|
| `+` or `=` | Zoom in |
| `-` | Zoom out |
| `0` | Fit to screen |
| `ESC` | Close modal |

### Mouse Controls

| Action | Result |
|--------|--------|
| Scroll wheel | Zoom in/out at cursor |
| Click and drag | Pan (when zoomed) |
| Click outside | Close (when not zoomed) |

### Touch Controls

| Gesture | Result |
|---------|--------|
| Pinch | Zoom in/out |
| Drag | Pan (when zoomed) |
| Tap outside | Close (when not zoomed) |

## Performance

The component is optimized for 60fps performance:

- **Transform Caching**: LRU cache for transform calculations
- **Batched Updates**: RAF-based update batching
- **Hardware Acceleration**: GPU-accelerated transforms
- **Memoization**: All child components are memoized
- **Lazy Loading**: Images load on demand

## Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader announcements
- Respects `prefers-reduced-motion`

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (including iOS)
- Mobile browsers: Full touch support

## Examples

See `ImageZoomModal.composed.tsx` for ready-to-use variants:

- `MinimalImageZoomModal` - No controls, just zoom
- `GalleryImageZoomModal` - With navigation controls
- `PresentationImageZoomModal` - Full-screen minimal UI

## Contributing

The component follows these principles:

1. **Performance First**: Every interaction should be 60fps
2. **Accessibility**: Keyboard and screen reader support
3. **Flexibility**: Multiple APIs for different use cases
4. **Type Safety**: Full TypeScript support

## License

Part of the Anpassad Webb project.