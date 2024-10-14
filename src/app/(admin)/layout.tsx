import './globals.css';

export const metadata = {
  title: 'ÖzByte Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
