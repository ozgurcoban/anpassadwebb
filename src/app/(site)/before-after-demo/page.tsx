import BeforeAfterSlider from '@/components/BeforeAfterSlider';

export default function BeforeAfterDemoPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Before/After Slider Demo</h1>
      
      <div className="space-y-12">
        {/* Example 1: Basic usage */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Basic Example</h2>
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
            afterImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&grayscale"
            beforeLabel="Color"
            afterLabel="Black & White"
          />
        </div>

        {/* Example 2: Custom aspect ratio */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Square Aspect Ratio</h2>
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"
            afterImage="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80&blur=10"
            beforeLabel="Original"
            afterLabel="Blurred"
            aspectRatio="1/1"
            className="max-w-md mx-auto"
          />
        </div>

        {/* Example 3: Custom styling */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Custom Styling</h2>
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
            afterImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&sepia"
            beforeLabel="Natural"
            afterLabel="Sepia"
            sliderLineWidth={4}
            sliderLineColor="#3b82f6"
            sliderHandleColor="#3b82f6"
            className="shadow-2xl"
          />
        </div>

        {/* Example 4: Without labels */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">No Labels</h2>
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80"
            afterImage="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80&contrast=200"
            beforeLabel=""
            afterLabel=""
            aspectRatio="21/9"
          />
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-16 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
        <pre className="text-sm overflow-x-auto">
          <code>{`import BeforeAfterSlider from '@/components/BeforeAfterSlider';

<BeforeAfterSlider
  beforeImage="/path/to/before.jpg"
  afterImage="/path/to/after.jpg"
  beforeLabel="Before"
  afterLabel="After"
  aspectRatio="16/9"
  sliderLineWidth={2}
  sliderLineColor="white"
  sliderHandleColor="white"
  className="custom-class"
/>`}</code>
        </pre>
      </div>

      {/* Props Documentation */}
      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <ul className="space-y-2 text-sm">
          <li><strong>beforeImage</strong> (required): URL of the before image</li>
          <li><strong>afterImage</strong> (required): URL of the after image</li>
          <li><strong>beforeLabel</strong> (optional): Label for before image (default: "Before")</li>
          <li><strong>afterLabel</strong> (optional): Label for after image (default: "After")</li>
          <li><strong>aspectRatio</strong> (optional): CSS aspect ratio (default: "16/9")</li>
          <li><strong>sliderLineWidth</strong> (optional): Width of slider line in pixels (default: 2)</li>
          <li><strong>sliderLineColor</strong> (optional): Color of slider line (default: "white")</li>
          <li><strong>sliderHandleColor</strong> (optional): Color of slider handle (default: "white")</li>
          <li><strong>className</strong> (optional): Additional CSS classes</li>
        </ul>
      </div>
    </div>
  );
}