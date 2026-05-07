import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Using `variable` wires the loaded font into the --font-sans CSS custom property
// declared in globals.css @theme, so every `font-family: var(--font-sans)` rule
// resolves to the actual loaded font face instead of the system fallback.
const plusJakarta = Plus_Jakarta_Sans({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600", "700", "800"],
  display:  "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title:       "Uniloop — India's Uniform Resale & Recycling Marketplace",
  description: "Buy and sell pre-loved school uniforms within your institution. Quality-verified, trusted, and sustainable. Closing the loop on uniform waste.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${plusJakarta.variable} h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
