import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daylight | LEED Daylighting Compliance Made Simple",
  description:
    "Spatial Daylight Autonomy (SDA) and Annual Sunlight Exposure (ASE) analysis for LEED v4.1 EQc7. Plugins for Rhino, Revit, and a standalone app.",
  keywords: [
    "LEED daylighting",
    "SDA",
    "ASE",
    "spatial daylight autonomy",
    "annual sunlight exposure",
    "LEED v4.1",
    "Rhino plugin",
    "Revit addin",
    "daylight simulation",
    "Radiance",
    "Honeybee",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
