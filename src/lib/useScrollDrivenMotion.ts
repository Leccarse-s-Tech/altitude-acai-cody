import { useEffect } from 'react';

/**
 * Checks safely whether the user or browser prefers reduced motion before
 * attaching any scroll listeners or IntersectionObservers.
 */
export function prefersReducedMotionEnabled(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Coordinates Scroll-Driven Events (background Cordel parallax drift/tilt and
 * progressive section/layer reveals) while strictly enforcing zero listeners and
 * full static visibility fallback whenever `prefers-reduced-motion: reduce` is active
 * or browser APIs (`IntersectionObserver`, `requestAnimationFrame`) are unavailable.
 */
export function useScrollDrivenMotion(routeKey: string): void {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const motionSupported =
      typeof window.matchMedia === 'function' &&
      typeof IntersectionObserver === 'function' &&
      typeof window.requestAnimationFrame === 'function';

    const resetToStaticState = () => {
      root.classList.remove('scroll-motion-ready');
      const revealTargets = document.querySelectorAll<HTMLElement>(
        '.scroll-reveal, .bowl-layer-anim',
      );
      revealTargets.forEach((el) => {
        el.setAttribute('data-scroll-revealed', 'true');
      });

      const parallaxTargets = document.querySelectorAll<HTMLElement>('.cordel-parallax');
      parallaxTargets.forEach((el) => {
        el.style.removeProperty('--cordel-parallax-y');
        el.style.removeProperty('--cordel-parallax-rot');
      });
    };

    if (!motionSupported) {
      resetToStaticState();
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cleanupMotionListeners: (() => void) | null = null;

    const startMotion = () => {
      if (prefersReducedMotionEnabled()) {
        resetToStaticState();
        return;
      }

      const revealTargets = Array.from(
        document.querySelectorAll<HTMLElement>('.scroll-reveal, .bowl-layer-anim'),
      );
      const viewportHeight = window.innerHeight || 900;

      revealTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.96) {
          el.setAttribute('data-scroll-revealed', 'true');
        }
      });

      root.classList.add('scroll-motion-ready');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
              (entry.target as HTMLElement).setAttribute('data-scroll-revealed', 'true');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
      );

      revealTargets.forEach((el) => {
        if (el.getAttribute('data-scroll-revealed') !== 'true') {
          observer.observe(el);
        }
      });

      let scheduledTimer = 0;

      const updateParallax = () => {
        scheduledTimer = 0;
        if (prefersReducedMotionEnabled()) {
          resetToStaticState();
          return;
        }

        const vh = window.innerHeight || 900;
        const sections = Array.from(
          document.querySelectorAll<HTMLElement>('[data-cordel-background]'),
        );

        // Batch layout reads before writing CSS custom properties
        const measurements = sections.map((bgWrapper) => {
          const rect = bgWrapper.getBoundingClientRect();
          const totalTravel = vh + rect.height;
          const rawProgress = totalTravel > 0 ? (vh - rect.top) / totalTravel : 0.5;
          const centered = Math.max(-1, Math.min(1, (rawProgress - 0.5) * 2));
          return { bgWrapper, centered };
        });

        for (const { bgWrapper, centered } of measurements) {
          const motifs = bgWrapper.querySelectorAll<HTMLElement>('.cordel-parallax');
          motifs.forEach((motif, index) => {
            const dirAttr = motif.getAttribute('data-parallax-dir');
            const dir = dirAttr === '-1' ? -1 : index % 2 === 0 ? 1 : -1;
            const translateY = (centered * 16 * dir).toFixed(2);
            const rotateDeg = (centered * 3.8 * dir).toFixed(2);
            motif.style.setProperty('--cordel-parallax-y', `${translateY}px`);
            motif.style.setProperty('--cordel-parallax-rot', `${rotateDeg}deg`);
          });
        }
      };

      const scheduleParallax = () => {
        updateParallax();
        if (scheduledTimer === 0 && typeof window.requestAnimationFrame === 'function') {
          scheduledTimer = window.requestAnimationFrame(updateParallax);
        }
      };

      updateParallax();
      window.addEventListener('scroll', scheduleParallax, { passive: true });
      document.addEventListener('scroll', scheduleParallax, { passive: true, capture: true });
      window.addEventListener('resize', scheduleParallax, { passive: true });

      cleanupMotionListeners = () => {
        observer.disconnect();
        window.removeEventListener('scroll', scheduleParallax);
        document.removeEventListener('scroll', scheduleParallax, { capture: true });
        window.removeEventListener('resize', scheduleParallax);
        if (scheduledTimer !== 0) {
          window.cancelAnimationFrame(scheduledTimer);
        }
      };
    };

    const handlePreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        cleanupMotionListeners?.();
        cleanupMotionListeners = null;
        resetToStaticState();
      } else {
        cleanupMotionListeners?.();
        startMotion();
      }
    };

    if (prefersReducedMotionEnabled()) {
      resetToStaticState();
    } else {
      startMotion();
    }

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handlePreferenceChange);
    }

    return () => {
      cleanupMotionListeners?.();
      cleanupMotionListeners = null;
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handlePreferenceChange);
      }
    };
  }, [routeKey]);
}
