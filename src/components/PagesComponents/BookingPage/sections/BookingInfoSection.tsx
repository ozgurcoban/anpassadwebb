import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MessageSquare, Target, Zap } from "lucide-react";

const infoCards = [
  {
    icon: Clock,
    title: "30 minuters samtal",
    description: "Ett fokuserat samtal där vi går igenom dina behov och diskuterar möjliga lösningar.",
  },
  {
    icon: MessageSquare,
    title: "Kostnadsfri konsultation",
    description: "Helt utan förpliktelser. Vi lyssnar på dina idéer och ger dig värdefulla insikter.",
  },
  {
    icon: Target,
    title: "Skräddarsydd rådgivning",
    description: "Få konkreta förslag anpassade efter din verksamhet och dina specifika mål.",
  },
  {
    icon: Zap,
    title: "Nästa steg",
    description: "Efter mötet får du en sammanfattning och förslag på hur vi kan hjälpa dig framåt.",
  },
];

export default function BookingInfoSection() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Vad du kan förvänta dig</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {infoCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Card key={index} className="border-primary/10 transition-all hover:border-primary/30 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {card.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-12 rounded-lg bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 p-8 text-center">
            <h3 className="mb-4 text-2xl font-semibold">Förbered dig för mötet</h3>
            <ul className="mx-auto max-w-2xl space-y-2 text-left text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>Fundera på dina huvudsakliga mål med din digitala närvaro</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>Ha gärna exempel på webbplatser eller funktioner du gillar</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>Tänk igenom din målgrupp och vad de behöver</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>Förbered eventuella frågor du har om våra tjänster</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}