import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shape 76",
  description: "Projeto de cutting e treino",
  manifest: "/manifest.json",
  themeColor: "#061428",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Shape 76",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}