'use client';

import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { useState } from 'react';

export default function BeforeAfterDemoPage() {
  const [position, setPosition] = useState(50);
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Internal demo notice */}
      <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
          ⚠️ This is an internal demo page for development purposes only. Not indexed by search engines.
        </p>
      </div>
      
      <h1 className="text-4xl font-bold mb-8 text-center">Before/After Slider Demo</h1>
      
      <div className="space-y-16">
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

        {/* Example 2: With Title and Description */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">With Title and Description</h2>
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
            afterImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&hue-rotate=90"
            beforeLabel="Original Design"
            afterLabel="Modern Redesign"
            title="Website Transformation"
            description="Experience the dramatic improvement in user interface design, showcasing our commitment to modern aesthetics and enhanced user experience."
            titleClassName="text-3xl"
            descriptionClassName="text-lg"
          />
        </div>

        {/* Example 3: Title at Bottom */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Header Position Bottom</h2>
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80"
            afterImage="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80&saturate=200"
            beforeLabel="Desaturated"
            afterLabel="Vibrant"
            title="Color Enhancement Demo"
            description="See how color correction can bring life to your images"
            headerPosition="bottom"
            className="shadow-xl"
          />
        </div>

        {/* Example 4: Square aspect ratio */}
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

        {/* Example 5: Custom styling */}
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

        {/* Example 6: Without labels */}
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

        {/* Example 7: Different initial position */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Custom Initial Position</h2>
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
            afterImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&saturate=0"
            beforeLabel="Saturated"
            afterLabel="Desaturated"
            initialPosition={75}
          />
        </div>

        {/* Example 8: With position tracking */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Position Tracking</h2>
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"
            afterImage="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80&contrast=50"
            beforeLabel="High Contrast"
            afterLabel="Low Contrast"
            onPositionChange={setPosition}
          />
          <p className="mt-4 text-center text-lg">Current position: {position.toFixed(1)}%</p>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-16 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Basic Usage</h3>
            <pre className="text-sm overflow-x-auto bg-gray-900 text-gray-100 p-4 rounded">
              <code>{`import BeforeAfterSlider from '@/components/BeforeAfterSlider';

<BeforeAfterSlider
  beforeImage="/path/to/before.jpg"
  afterImage="/path/to/after.jpg"
/>`}</code>
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Advanced Example</h3>
            <pre className="text-sm overflow-x-auto bg-gray-900 text-gray-100 p-4 rounded">
              <code>{`<BeforeAfterSlider
  beforeImage="/before.jpg"
  afterImage="/after.jpg"
  beforeLabel="Original"
  afterLabel="Enhanced"
  initialPosition={50}
  sliderLineWidth={4}
  sliderLineColor="#3b82f6"
  sliderHandleColor="#3b82f6"
  onPositionChange={(pos) => console.log(pos)}
  className="shadow-2xl"
/>`}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">With Title and Description</h3>
            <pre className="text-sm overflow-x-auto bg-gray-900 text-gray-100 p-4 rounded">
              <code>{`<BeforeAfterSlider
  beforeImage="/before.jpg"
  afterImage="/after.jpg"
  title="Website Redesign Comparison"
  description="See how our modern redesign transformed the user experience"
  titleClassName="text-3xl font-bold"
  descriptionClassName="text-lg text-gray-600"
  headerPosition="top"
  beforeLabel="Old Design"
  afterLabel="New Design"
/>`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Props Documentation */}
      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Available Props</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Required Props</h3>
            <ul className="space-y-2">
              <li><strong>beforeImage</strong>: URL of the before image</li>
              <li><strong>afterImage</strong>: URL of the after image</li>
            </ul>
            
            <h3 className="font-semibold mb-2 mt-4">Basic Props</h3>
            <ul className="space-y-2">
              <li><strong>beforeLabel</strong>: Label for before image (default: &quot;Before&quot;)</li>
              <li><strong>afterLabel</strong>: Label for after image (default: &quot;After&quot;)</li>
              <li><strong>aspectRatio</strong>: CSS aspect ratio (default: &quot;16/9&quot;)</li>
              <li><strong>className</strong>: Additional CSS classes</li>
              <li><strong>initialPosition</strong>: Initial slider position 0-100 (default: 35)</li>
            </ul>
            
            <h3 className="font-semibold mb-2 mt-4">Slider Styling</h3>
            <ul className="space-y-2">
              <li><strong>sliderLineWidth</strong>: Width in pixels (default: 2)</li>
              <li><strong>sliderLineColor</strong>: Line color (default: &quot;white&quot;)</li>
              <li><strong>sliderHandleColor</strong>: Handle color (default: &quot;white&quot;)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Title & Description</h3>
            <ul className="space-y-2">
              <li><strong>title</strong>: Optional title text</li>
              <li><strong>description</strong>: Optional description text</li>
              <li><strong>titleClassName</strong>: CSS classes for title</li>
              <li><strong>descriptionClassName</strong>: CSS classes for description</li>
              <li><strong>headerPosition</strong>: &quot;top&quot; | &quot;bottom&quot; (default: &quot;top&quot;)</li>
            </ul>
            
            <h3 className="font-semibold mb-2 mt-4">Interaction</h3>
            <ul className="space-y-2">
              <li><strong>onPositionChange</strong>: Callback with position (0-100)</li>
            </ul>
            
            <h3 className="font-semibold mb-2 mt-4">Usage Notes</h3>
            <ul className="space-y-2">
              <li>• Click or drag anywhere on the image to move the slider</li>
              <li>• Touch/mobile gestures are fully supported</li>
              <li>• Component is fully responsive</li>
              <li>• Images are automatically sized to fit container</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}