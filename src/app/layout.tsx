import type { Metadata } from "next";
import { Audiowide, Outfit } from "next/font/google";
import "./globals.css";

const audiowide = Audiowide({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className={`${audiowide.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
