import type { Metadata } from "next";
import type { ReactNode } from "react";
import CursorField from "@/components/CursorField";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toni Miharja — Senior Engagement Manager, Digital & AI",
  description:
    "Toni Miharja leads digital and AI product delivery at Oliver Wyman, Singapore: agent design, evaluation, production rollout, and guardrails for LLM systems.",
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <CursorField />
        {children}
      </body>
    </html>
  );
}
