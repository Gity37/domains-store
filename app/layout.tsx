import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Domain For Sale",
  description: "Premium domain available for purchase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
