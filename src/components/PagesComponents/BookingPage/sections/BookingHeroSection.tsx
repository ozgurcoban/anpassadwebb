import SectionHeading from "@/components/ui/SectionHeading";

export default function BookingHeroSection() {
  return (
    <section className="relative w-full pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Boka ett kostnadsfritt konsultationssamtal"
          subtitle="Låt oss diskutera dina digitala mål och hur vi kan hjälpa dig att förverkliga dem. Välj en tid som passar dig så ses vi online."
          as="h1"
          titleClassName="text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          subtitleClassName="text-xl"
        />
      </div>
    </section>
  );
}