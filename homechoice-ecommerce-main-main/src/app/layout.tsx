import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "HomeChoice - Depot",
  description: "Homechoice Depot, a brand of Ed and Ann Distributors, provides top-quality meat products, including beef, chicken, lamb, goat, tilapia, Nile perch, sausages, and bacon. Established in 2020 during the COVID-19 pandemic, the company identified a strong demand for quality meat among hotels offering home delivery and quickly became a trusted supplier through word-of-mouth",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <TopBanner />
        <Providers>
          <TopNavbar />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
