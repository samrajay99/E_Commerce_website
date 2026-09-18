import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nordly — everyday objects, elevated",
  description: "A considered collection of objects for modern living.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
