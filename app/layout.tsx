import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "./lib/UserContext";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Talent Bridge",
  description: "Talent Bridge is a leading job platform that connects talented professionals with top companies. Find your next career opportunity or hire the best talent today.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <UserProvider>
        {children}
        </UserProvider>
      </body>
    </html>
  );
}
