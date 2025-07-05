import type { Metadata } from "next";
import { BookingComponents } from "@/components/PagesComponents/BookingPage";

export const metadata: Metadata = {
  title: "Boka Möte | Anpassad Webb",
  description: "Boka ett kostnadsfritt konsultationssamtal för att diskutera dina digitala behov och hur vi kan hjälpa dig att växa online.",
  openGraph: {
    title: "Boka Möte | Anpassad Webb",
    description: "Boka ett kostnadsfritt konsultationssamtal för att diskutera dina digitala behov",
    type: "website",
  },
};

export default function BookingPage() {
  return <BookingComponents />;
}