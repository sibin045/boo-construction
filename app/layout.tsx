import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hera Construction",
  description: "Trusted place to find your home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        suppressHydrationWarning on <body> silences the hydration mismatch
        caused by browser extensions (e.g. Grammarly) injecting attributes
        like data-gr-ext-installed into the DOM before React hydrates.
        This is safe — it only suppresses the warning one level deep.
      */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}