import BookingHeroSection from "./sections/BookingHeroSection";
import CalendlySection from "./sections/CalendlySection";
import BookingInfoSection from "./sections/BookingInfoSection";

export default function BookingComponents() {
  return (
    <main className="min-h-screen">
      <BookingHeroSection />
      <CalendlySection />
      <BookingInfoSection />
    </main>
  );
}