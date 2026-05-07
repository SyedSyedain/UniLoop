import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uniloop — India's Uniform Resale & Recycling Marketplace",
  description:
    "Buy and sell pre-loved school uniforms within your institution. Quality-verified, trusted, and sustainable. Closing the loop on uniform waste.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${plusJakarta.className} h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
