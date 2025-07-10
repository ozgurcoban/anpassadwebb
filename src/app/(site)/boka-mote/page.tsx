import type { Metadata } from "next";
import { BookingComponents } from "@/components/PagesComponents/BookingPage";

export const metadata: Metadata = {
  title: "Boka möte - Webbyrå i Uppsala | Kostnadsfri konsultation",
  description: "Boka kostnadsfri konsultation för din hemsida i Uppsala. Vi är en lokal webbyrå som hjälper företag med webbutveckling och digital marknadsföring.",
  openGraph: {
    title: "Boka möte - Webbyrå i Uppsala | Kostnadsfri konsultation",
    description: "Boka kostnadsfri konsultation med vår lokala webbyrå i Uppsala",
    type: "website",
  },
};

export default function BookingPage() {
  return <BookingComponents />;
}