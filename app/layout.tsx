import Navbar from "@/components/Navbar/Navbar";
import AuthSessionContext from "@/context/AuthSessionContext";
import MuiThemeContext from "@/context/MuiThemeContext";
import ReduxProvider from "@/context/ReduxProvider";
import TanStackProvider from "@/context/TanStackProvider";
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
    <TanStackProvider>
      <ReduxProvider>
        <AuthSessionContext>
          <MuiThemeContext>
            <html lang="en">
              <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
              </head>
              <body
                className={`mt-0 max-w-[86rem] m-auto md:mt-4 mb-6 ${inter.className}`}
              >
                <header>
                  <Navbar />
                </header>
                {children}
              </body>
            </html>
          </MuiThemeContext>
        </AuthSessionContext>
      </ReduxProvider>
    </TanStackProvider>
  );
}
