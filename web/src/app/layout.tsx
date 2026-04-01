import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Brand Name",
    template: "%s | Brand Name"
  },
  description: "High-converting marketing website template for lead generation.",
  openGraph: {
    title: "Brand Name",
    description: "High-converting marketing website template for lead generation.",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
