import { site } from "../config/site";

export function Navigation({ visible }: { visible: boolean }) {
  return (
    <nav
      className={`pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 transition-opacity duration-500 ease-editorial md:px-10 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <span className="pointer-events-auto font-sans text-xs tracking-widest text-ink">
        {site.name}
      </span>
      <ul className="pointer-events-auto flex gap-6">
        {site.nav.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="font-sans text-[11px] tracking-widest text-ash transition-colors duration-300 hover:text-ink"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
