import MuiThemeContext from "@/context/MuiThemeContext";
import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";

const inter = Instrument_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Home page to view and share links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MuiThemeContext>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </MuiThemeContext>
  );
}
