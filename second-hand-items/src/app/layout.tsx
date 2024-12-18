import type { Metadata } from "next";
import AppWrapper from "./appWrapper";

export const metadata: Metadata = {
  title: "IR - Second Hand Items",
  description: "IR - Second Hand Items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          h1 {
            padding: 10px;
          }
        `}</style>
      </head>
      <body style={{ fontFamily: "Roboto, sans-serif" }}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
