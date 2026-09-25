import Image from "next/image";
import Link from "next/link";
import logoDark from "@/img/logo-dark.png";
import logoLight from "@/img/logo-light.png";
import HeaderShell from "./HeaderShell";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#writing", label: "Writing" },
];

export default function Header({ name }: { name: string }) {
  return (
    <HeaderShell>
      <div className="site-header__inner mx-auto w-full max-w-[680px] px-6">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-background focus:z-10 focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <nav aria-label="Primary" className="flex items-center justify-between gap-6 text-sm">
          <Link href="/" aria-label={name} className="shrink-0">
            {/* Only the active theme's logo is displayed; lazy loading keeps the
                hidden one from downloading until the theme switches. */}
            <Image
              src={logoLight}
              alt=""
              sizes="80px"
              loading="lazy"
              className="site-logo site-logo--light"
            />
            <Image
              src={logoDark}
              alt=""
              sizes="80px"
              loading="lazy"
              className="site-logo site-logo--dark"
            />
          </Link>
          <div className="flex items-baseline gap-5">
            <ul className="flex gap-5 text-muted">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link !text-muted hover:!text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
            </ul>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </HeaderShell>
  );
}
