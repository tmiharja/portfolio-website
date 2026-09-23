import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toni Miharja — Senior Engagement Manager, Digital & AI",
  description:
    "Toni Miharja leads digital and AI product delivery at Oliver Wyman, Singapore: agent design, evaluation, production rollout, and guardrails for LLM systems.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
