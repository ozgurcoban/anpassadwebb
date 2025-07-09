'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ImageZoomModal from '@/components/ImageZoomModal';
import { ZoomIn } from 'lucide-react';

export function AIPromptImageExample() {
  const [zoomModal, setZoomModal] = useState({
    isOpen: false,
    imageSrc: '',
    imageAlt: '',
    title: '',
  });

  const openZoomModal = (imageSrc: string, imageAlt: string, imageTitle?: string) => {
    setZoomModal({
      isOpen: true,
      imageSrc,
      imageAlt,
      title: imageTitle || '',
    });
  };

  const closeZoomModal = () => {
    setZoomModal({
      isOpen: false,
      imageSrc: '',
      imageAlt: '',
      title: '',
    });
  };

  return (
    <>
      <div
        className="group relative cursor-pointer overflow-hidden rounded-lg border border-border shadow-sm transition-all duration-200 hover:shadow-md my-6 aspect-[3/2]"
        onClick={() =>
          openZoomModal(
            '/images/blog/aldre-smaforetagare-uppsala-butik-ai-prompter.webp',
            'AI-genererad bild av äldre svensk småföretagare utanför sin butik i Uppsala',
            'Resultat från AI-prompten'
          )
        }
      >
        <Image
          src="/images/blog/aldre-smaforetagare-uppsala-butik-ai-prompter.webp"
          alt="AI-genererad bild av äldre svensk småföretagare utanför sin butik i Uppsala"
          width={1536}
          height={1024}
          className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
        />
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
        <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/80 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <ZoomIn className="h-4 w-4 text-gray-700" />
        </div>
      </div>

      <ImageZoomModal
        isOpen={zoomModal.isOpen}
        onClose={closeZoomModal}
        imageSrc={zoomModal.imageSrc}
        imageAlt={zoomModal.imageAlt}
        title={zoomModal.title}
      />
    </>
  );
}