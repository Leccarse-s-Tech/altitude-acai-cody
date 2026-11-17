import {
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';

const NAV_EVENT = 'altitude:navigate';

/**
 * Resolves static asset URLs cleanly across root (`/`), subpath (`/altitude-acai-cody/`),
 * and arbitrary nested routes (`/does-not-exist/nested`).
 */
export function assetUrl(relativePath: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = relativePath.replace(/^\/+/, '');
  return `${normalizedBase}${cleanPath}`;
}

export function normalizePathname(rawPath: string): string {
  const base = import.meta.env.BASE_URL || '/';
  let pathname = rawPath.split('?')[0].split('#')[0] || '/';

  if (base !== '/' && base.length > 1) {
    const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
    if (pathname === trimmedBase || pathname === `${trimmedBase}/`) {
      pathname = '/';
    } else if (pathname.startsWith(`${trimmedBase}/`)) {
      pathname = pathname.slice(trimmedBase.length);
    }
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }
  return pathname || '/';
}

function buildBrowserHref(target: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const trimmedBase = base === '/' ? '' : base.replace(/\/+$/, '');
  const cleanTarget = target.startsWith('/') ? target : `/${target}`;
  return `${trimmedBase}${cleanTarget}` || '/';
}

function scrollToHashOrTop(hash: string | null) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = prefersReduced ? 'auto' : 'smooth';

  if (hash) {
    window.requestAnimationFrame(() => {
      const targetEl = document.getElementById(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior, block: 'start' });
      }
    });
  } else {
    window.scrollTo({ top: 0, behavior });
  }
}

export function navigate(to: string): void {
  const [rawRoute, rawHash] = to.split('#');
  const nextRoute = normalizePathname(rawRoute || '/');
  const currentRoute = normalizePathname(window.location.pathname);
  const fullHref = buildBrowserHref(`${nextRoute}${rawHash ? `#${rawHash}` : ''}`);

  if (nextRoute !== currentRoute || window.location.hash !== (rawHash ? `#${rawHash}` : '')) {
    window.history.pushState({}, '', fullHref);
    window.dispatchEvent(new Event(NAV_EVENT));
  }

  scrollToHashOrTop(rawHash || null);
}

export function usePathname(): string {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window === 'undefined' ? '/' : normalizePathname(window.location.pathname),
  );

  useEffect(() => {
    const syncPath = () => {
      setPathname(normalizePathname(window.location.pathname));
    };
    window.addEventListener('popstate', syncPath);
    window.addEventListener(NAV_EVENT, syncPath);
    return () => {
      window.removeEventListener('popstate', syncPath);
      window.removeEventListener(NAV_EVENT, syncPath);
    };
  }, []);

  return pathname;
}

export interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  children: ReactNode;
}

export function AppLink({ to, onClick, children, ...rest }: AppLinkProps) {
  const href = buildBrowserHref(to);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
