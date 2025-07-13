import { ReactNode } from "react";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

import { UnifrakturCook, MedievalSharp } from "next/font/google";

const unifrakturCook = UnifrakturCook({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-unifraktur-cook",
  display: "swap",
});

const medievalSharp = MedievalSharp({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-medieval-sharp",
  display: "swap",
});

export const metadata = {
  title: "A Northumbrian Saga",
  description: "Fanfiction book series app with medieval vibes",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${unifrakturCook.variable} ${medievalSharp.variable}`}>
      <body className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white font-sans antialiased min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
