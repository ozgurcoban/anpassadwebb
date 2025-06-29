'use client';

import React, { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Text from '@/components/ui/Text';
import { palermoProject } from '@/data/caseStudies';
import { cn } from '@/lib/utils';
import ImageZoomModal from '@/components/ImageZoomModal';
import { ZoomIn } from 'lucide-react';

const MenuRevolutionSection = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(true);
  const [zoomModal, setZoomModal] = useState<{
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
    title?: string;
  }>({
    isOpen: false,
    imageSrc: '',
    imageAlt: '',
    title: '',
  });

  const menuCategories = [
    { id: 'pizza', label: 'Pizza', count: 3 },
    { id: 'pasta', label: 'Pasta', count: 3 },
    { id: 'sallad', label: 'Sallad', count: 2 },
    { id: 'forrattar', label: 'Förrätter', count: 2 },
    { id: 'dessert', label: 'Dessert', count: 2 },
  ];

  const menuItems = {
    pizza: [
      {
        name: 'Margherita',
        price: '125 kr',
        desc: 'Tomatsås, mozzarella, basilika',
      },
      {
        name: 'Capricciosa',
        price: '135 kr',
        desc: 'Tomatsås, mozzarella, skinka, champinjoner',
      },
      {
        name: 'Quattro Stagioni',
        price: '145 kr',
        desc: 'Tomatsås, mozzarella, skinka, champinjoner, kronärtskocka, oliver',
      },
    ],
    pasta: [
      {
        name: 'Carbonara',
        price: '139 kr',
        desc: 'Guanciale, ägg, pecorino, svartpeppar',
      },
      {
        name: 'Amatriciana',
        price: '129 kr',
        desc: 'Guanciale, tomatsås, pecorino',
      },
      {
        name: 'Cacio e Pepe',
        price: '119 kr',
        desc: 'Pecorino, svartpeppar, pasta vatten',
      },
    ],
    sallad: [
      {
        name: 'Caesar',
        price: '115 kr',
        desc: 'Romansallad, kyckling, parmesan, krutonger',
      },
      {
        name: 'Caprese',
        price: '105 kr',
        desc: 'Mozzarella, tomater, basilika, olivolja',
      },
    ],
    forrattar: [
      {
        name: 'Bruschetta',
        price: '65 kr',
        desc: 'Rostat bröd, tomater, vitlök, basilika',
      },
      {
        name: 'Vitello Tonnato',
        price: '95 kr',
        desc: 'Kalvkött, tonfisksås, kapris',
      },
    ],
    dessert: [
      { name: 'Tiramisu', price: '75 kr', desc: 'Klassisk italiensk dessert' },
      { name: 'Panna Cotta', price: '65 kr', desc: 'Vanilj, bärcoulis' },
    ],
  };

  const handleCategoryToggle = (categoryId: string) => {
    if (showAll) {
      setShowAll(false);
      setSelectedCategories([categoryId]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev, categoryId],
      );
    }
  };

  const handleShowAll = () => {
    setShowAll(true);
    setSelectedCategories([]);
  };

  const openZoomModal = (
    imageSrc: string,
    imageAlt: string,
    imageTitle?: string,
  ) => {
    setZoomModal({
      isOpen: true,
      imageSrc,
      imageAlt,
      title: imageTitle,
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

  const getVisibleItems = () => {
    if (showAll) {
      return Object.entries(menuItems).flatMap(([category, items]) =>
        items.map((item) => ({ ...item, category })),
      );
    }

    return selectedCategories.length === 0
      ? []
      : selectedCategories.flatMap((category) =>
          (menuItems[category as keyof typeof menuItems] || []).map((item) => ({
            ...item,
            category,
          })),
        );
  };

  const menuStory = palermoProject.story?.find(
    (s) => s.title === 'Meny som säljer',
  );

  return (
    <Section className="bg-gradient-to-b from-background to-muted/20 py-16 md:py-20">
      <SectionContainer>
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Menyevolutionen"
            subtitle="Design som gör gäster hungriga"
          />

          {/* Grid container with subgrid support */}
          <div className="menu-comparison-grid grid gap-8 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr]">
            {/* Before - Old Menu */}
            <Card className="border-muted/50 bg-card/50 p-6 shadow-sm lg:row-span-3 lg:grid lg:grid-rows-subgrid">
              <Text className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Förut
              </Text>
              <Text className="py-4 text-lg lg:min-h-[100px]">
                {menuStory?.beforeDescription ||
                  'Svårnavigerad meny. Innehållet var rörigt och oöverskådligt. Samt att den inte var anpassad för mobil.'}
              </Text>

              {menuStory?.beforeImage && (
                <div
                  className="group relative max-h-[800px] cursor-pointer overflow-y-auto rounded-lg border border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md"
                  onClick={() =>
                    openZoomModal(
                      menuStory.beforeImage!,
                      'Gammal meny',
                      'Förut - Gammal meny',
                    )
                  }
                >
                  <Image
                    src={menuStory.beforeImage}
                    alt="Gammal meny"
                    width={400}
                    height={800}
                    className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-lg bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                  <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/80 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <ZoomIn className="h-4 w-4 text-gray-700" />
                  </div>
                </div>
              )}
            </Card>

            {/* After - New Interactive Menu */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 shadow-sm lg:row-span-3 lg:grid lg:grid-rows-subgrid">
              <Text className="text-sm font-medium uppercase tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Nu
              </Text>
              <Text className="py-4 text-lg lg:min-h-[100px]">
                {menuStory?.afterDescription ||
                  'Vi tog fram en menystruktur för mobil som sorterar innehållet i "chips" (kategorier) och döljer onödigt brus.'}
              </Text>

              {/* Interactive Menu Demo */}
              <div className="flex h-full flex-col">
                <div className="flex max-h-[800px] flex-col overflow-y-auto rounded-lg border border-border bg-card p-4 shadow-sm">
                  <Text className="mb-4 font-semibold">
                    Klicka på kategorierna för att filtrera menyn:
                  </Text>

                  {/* Category Chips */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {/* "Alla" chip */}
                    <Badge
                      variant={showAll ? 'default' : 'outline'}
                      className={cn(
                        'cursor-pointer h-auto px-4 py-2 font-medium transition-all duration-200 transform-gpu',
                        showAll && 'shadow-md hover:shadow-lg hover:shadow-primary/25 hover:scale-105',
                        !showAll && 'hover:scale-105 hover:border-primary hover:shadow-md hover:shadow-primary/20',
                      )}
                      onClick={handleShowAll}
                    >
                      Alla
                    </Badge>

                    {/* Category chips */}
                    {menuCategories.map((category) => {
                      const isSelected = selectedCategories.includes(
                        category.id,
                      );
                      return (
                        <Badge
                          key={category.id}
                          variant={isSelected ? 'default' : 'outline'}
                          className={cn(
                            'cursor-pointer h-auto px-4 py-2 font-medium transition-all duration-200 transform-gpu',
                            isSelected && 'shadow-md hover:shadow-lg hover:shadow-primary/25 hover:scale-105',
                            !isSelected && 'hover:scale-105 hover:border-primary hover:shadow-md hover:shadow-primary/20',
                          )}
                          onClick={() => handleCategoryToggle(category.id)}
                        >
                          {category.label}
                          <span className="ml-1.5 text-xs opacity-70">
                            ({category.count})
                          </span>
                        </Badge>
                      );
                    })}
                  </div>

                  {/* Filter status */}
                  {!showAll && selectedCategories.length > 0 && (
                    <div className="mb-4 text-xs text-muted-foreground">
                      Visar {selectedCategories.length} av{' '}
                      {menuCategories.length} kategorier
                    </div>
                  )}

                  {/* Menu items display - flex-1 to fill remaining space */}
                  <div className="flex-1 overflow-y-auto rounded-lg bg-muted/30 p-3">
                    {getVisibleItems().length === 0 ? (
                      <Text className="py-8 text-center text-muted-foreground">
                        Välj en kategori för att se rätter
                      </Text>
                    ) : (
                      <div className="space-y-4">
                        {showAll
                          ? // When showing all, group by category
                            Object.entries(menuItems).map(
                              ([categoryId, items]) => {
                                const category = menuCategories.find(
                                  (c) => c.id === categoryId,
                                );
                                return (
                                  <div key={categoryId}>
                                    <h3 className="mb-3 text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                      {category?.label}
                                    </h3>
                                    <div className="space-y-2">
                                      {items.map((item, index) => (
                                        <div
                                          key={`${categoryId}-${index}`}
                                          className="group rounded-lg border border-border/50 bg-card p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:to-primary/5"
                                        >
                                          <div className="mb-1 flex items-start justify-between">
                                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                              {item.name}
                                            </h4>
                                            <span className="font-bold text-primary">
                                              {item.price}
                                            </span>
                                          </div>
                                          <Text className="text-sm text-muted-foreground">
                                            {item.desc}
                                          </Text>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              },
                            )
                          : // When filtered, group by selected categories
                            selectedCategories.map((categoryId) => {
                              const category = menuCategories.find(
                                (c) => c.id === categoryId,
                              );
                              const items =
                                menuItems[
                                  categoryId as keyof typeof menuItems
                                ] || [];
                              return (
                                <div key={categoryId}>
                                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                                    {category?.label}
                                  </h3>
                                  <div className="space-y-2">
                                    {items.map((item, index) => (
                                      <div
                                        key={`${categoryId}-${index}`}
                                        className="group rounded-lg border border-border/50 bg-card p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:to-primary/5"
                                      >
                                        <div className="mb-1 flex items-start justify-between">
                                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                            {item.name}
                                          </h4>
                                          <span className="font-bold text-primary">
                                            {item.price}
                                          </span>
                                        </div>
                                        <Text className="text-sm text-muted-foreground">
                                          {item.desc}
                                        </Text>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </SectionContainer>

      <ImageZoomModal
        isOpen={zoomModal.isOpen}
        onClose={closeZoomModal}
        imageSrc={zoomModal.imageSrc}
        imageAlt={zoomModal.imageAlt}
        title={zoomModal.title}
      />
    </Section>
  );
};

export default MenuRevolutionSection;
