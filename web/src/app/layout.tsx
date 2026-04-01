import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Old Mountain",
    template: "%s | Old Mountain"
  },
  description: "Old Mountain tours and explorations.",
  openGraph: {
    title: "Old Mountain",
    description: "Old Mountain tours and explorations.",
    type: "website",
    images: [
      {
        url: "/unfurling.png",
        width: 1200,
        height: 630,
        alt: "Old Mountain Tours and Explorations"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Old Mountain",
    description: "Old Mountain tours and explorations.",
    images: ["/unfurling.png"]
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
