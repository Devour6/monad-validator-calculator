import type { Metadata } from "next";
import { Audiowide, Outfit } from "next/font/google";
import "./globals.css";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Monad Validator Calculator",
  description: "Estimate returns from running a Monad validator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${audiowide.variable} ${outfit.variable} bg-dark text-cream font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
