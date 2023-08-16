import AuthSessionContext from "@/context/AuthSessionContext";
import MuiThemeContext from "@/context/MuiThemeContext";
import ReduxProvider from "@/context/ReduxProvider";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

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
    <ReduxProvider>
      <AuthSessionContext>
        <MuiThemeContext>
          <html lang="en">
            <head>
              <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={inter.className}>{children}</body>
          </html>
        </MuiThemeContext>
      </AuthSessionContext>
    </ReduxProvider>
  );
}
