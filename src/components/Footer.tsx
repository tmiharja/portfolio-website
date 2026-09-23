type Props = { linkedin: string; name: string };

export default function Footer({ linkedin, name }: Props) {
  return (
    <footer id="contact" className="mx-auto w-full max-w-[680px] px-6 pb-12 scroll-mt-24">
      <div className="border-t border-rule pt-8 text-sm">
        <ul className="flex flex-wrap gap-6">
          <li>
            <a href={linkedin} className="link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
        <p className="mt-6 text-xs text-muted">
          © {new Date().getFullYear()}&nbsp;{name}
        </p>
      </div>
    </footer>
  );
}
