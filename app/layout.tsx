import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "OWN KARMA — Wearable Philosophy For The Unbound",
  description:
    "Timeless design inspired by mythology, symbolism, civilization, and the cosmos. OWN KARMA is not clothing — it is a philosophy expressed through design.",
  keywords: [
    "OWN KARMA",
    "wearable philosophy",
    "luxury clothing",
    "sacred geometry",
    "symbolism",
    "philosophical fashion",
  ],
  openGraph: {
    title: "OWN KARMA — Wearable Philosophy For The Unbound",
    description:
      "Own Your Journey. Wear Your Philosophy. Timeless design inspired by mythology, symbolism, civilization, and the cosmos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
