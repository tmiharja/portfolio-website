import ThemeToggle from "./ThemeToggle";

const NAV = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export default function Header({ name }: { name: string }) {
  return (
    <header className="mx-auto w-full max-w-[680px] px-6 pt-8">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-background focus:z-10 focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="flex items-baseline justify-between text-sm">
        <a href="#main" className="font-medium tracking-tight">
          {name}
        </a>
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
    </header>
  );
}
