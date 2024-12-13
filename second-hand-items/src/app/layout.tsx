import type { Metadata } from 'next';
import AppWrapper from './appWrapper';

export const metadata: Metadata = {
  title: 'IR - Second Hand Items',
  description: 'IR - Second Hand Items',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
