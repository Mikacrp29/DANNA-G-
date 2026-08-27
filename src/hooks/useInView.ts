import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is in the viewport.
 *
 * Design notes (see PROJECT brief §7, §17, §18):
 * - threshold/rootMargin are primitives, not an options object, so the
 *   effect never re-runs on re-render and we never accumulate observers.
 * - `inView` toggles both ways (true on enter, false on exit), so any
 *   CSS driven off it is always reversible — nothing can get stuck at
 *   opacity: 0 or display: none.
 */
export function useInView<T extends HTMLElement>(
  threshold = 0.5,
  rootMargin = "0px",
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView } as const;
}
