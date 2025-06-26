import { CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import Text from '@/components/ui/Text';
import { packages, packagesConfig } from '@/data/packages';
import { ContactButton } from '@/components/ContactButton';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const PackagesListSection = () => {
  const shadowColorMap: Record<string, string> = {
    'from-blue-500': 'shadow-blue-500/20',
    'from-purple-500': 'shadow-purple-500/20',
    'from-pink-500': 'shadow-pink-500/20',
  };

  return (
    <div id="paket">
      <Section variant="wide" className="bg-gray-50 dark:bg-gray-900/50">
        <SectionContainer>
        <header className="mb-12 text-center">
          <Text as="h2" size="xl" className="mb-4">
            Välj rätt paket för din verksamhet
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            Transparent prissättning, inga dolda avgifter
          </Text>
          {packagesConfig.introDescription && (
            <div className="mt-8 max-w-4xl mx-auto">
              <Card className="bg-muted/50">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-sm">
                        <TrendingUp className="w-8 h-8 text-primary-foreground" strokeWidth={1.5} />
                      </div>
                    </div>
                    <Text className="flex-1 text-muted-foreground text-lg md:text-xl leading-relaxed font-medium">
                      {packagesConfig.introDescription}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </header>

        <div 
          className="grid gap-8 md:grid-cols-3"
          style={{
            gridTemplateRows: 'auto auto auto repeat(6, auto) auto auto',
            rowGap: '1.75rem'
          }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={cn(
                "group relative rounded-xl bg-white p-6 transition-all hover:shadow-lg dark:bg-gray-800",
                pkg.popular ? "shadow-md ring-2 ring-purple-500/20" : "shadow-sm",
                "grid"
              )}
              style={{
                gridTemplateRows: 'subgrid',
                gridRow: 'span 12'
              }}
            >

              {/* Package icon/badge */}
              <div className="text-center">
                <div
                  className={cn(
                    "inline-flex rounded-xl p-4 shadow-lg transition-transform group-hover:scale-110",
                    `bg-gradient-to-r ${pkg.gradientFrom} ${pkg.gradientVia} ${pkg.gradientTo}`,
                    shadowColorMap[pkg.gradientFrom] || ''
                  )}
                >
                  <Sparkles className="h-10 w-10 text-white" strokeWidth={1.5} />
                </div>
              </div>

              {/* Package name */}
              <div className="text-center">
                <Text as="h3" className="text-xl font-semibold">
                  {pkg.name}
                </Text>
              </div>

              {/* Tagline */}
              <div className="text-center">
                <Text className="text-gray-600 dark:text-gray-400">
                  {pkg.tagline}
                </Text>
              </div>

              {/* Features - each feature is a separate grid item */}
              {pkg.features.slice(0, 6).map((feature, idx) => (
                <div key={idx} className="grid grid-cols-[auto,1fr] gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" strokeWidth={1.5} />
                  <Text className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature}
                  </Text>
                </div>
              ))}
              {/* Fill empty feature slots */}
              {Array.from({ length: Math.max(0, 6 - pkg.features.length) }).map((_, idx) => (
                <div key={`empty-${idx}`} />
              ))}

              {/* Delivery time */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-5 mt-4 text-center">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {pkg.delivery}
                </Text>
              </div>

              {/* CTA Button with integrated pricing */}
              <div className="mt-6">
                <ContactButton 
                  className="w-full justify-center"
                  text={pkg.id === 'skraddarsytt' ? "Kontakta oss för offert" : pkg.price}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Text className="mb-4 text-gray-600 dark:text-gray-400">
            Osäker på vilket paket som passar dig bäst?
          </Text>
          <Text className="mb-6 text-gray-600 dark:text-gray-400">
            Vi hjälper dig hitta rätt lösning för dina behov och budget.
          </Text>
          <ContactButton className="mx-auto" text="Få gratis rådgivning" />
        </div>
      </SectionContainer>
    </Section>
    </div>
  );
};

export default PackagesListSection;