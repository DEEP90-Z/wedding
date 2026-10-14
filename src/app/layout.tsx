import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Great_Vibes, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shariq-andleeb-wedding.com"),
  title: "Shariq & Andleeb | Luxury Wedding Invitation",
  description:
    "Together with their families, Mrs. & Mr. Zaheer Siddiqui invite you to celebrate the wedding ceremony of their son Shariq Siddiqui with Andleeb.",
  keywords: ["Shariq Siddiqui", "Andleeb", "Wedding Invitation", "Walima", "Jhansi", "Fatehpur"],
  openGraph: {
    title: "Shariq & Andleeb | Luxury Wedding Invitation",
    description: "A celebration of love, faith, and family.",
    images: [{ url: "/invitation.png", width: 1200, height: 1600 }],
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
      className={`${cormorant.variable} ${playfair.variable} ${greatVibes.variable} ${montserrat.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#f7f2e7] text-[#1c2e24] font-serif selection:bg-[#d4af37]/30 selection:text-[#0f2c20] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
