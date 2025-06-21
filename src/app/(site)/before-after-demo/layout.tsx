import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Before/After Slider Demo - Internal Use Only',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function BeforeAfterDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}