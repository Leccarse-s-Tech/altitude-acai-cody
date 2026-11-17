import { ArrowLeft } from '@phosphor-icons/react';
import { CottonPaperGrain, WoodgrainOverlay } from '../components/ui/WoodcutTextures';
import { editorialCopy } from '../data/editorial-copy';
import { AppLink, assetUrl } from '../lib/router';

/**
 * Strictly isolated 404 route: renders WITHOUT Navbar and WITHOUT Footer.
 * Features a centered Cordel `4 [Acai Bowl] 4` composition, a single short heading,
 * and a single primary button back to `/`.
 */
export function NotFoundPage() {
  const { notFound } = editorialCopy;

  return (
    <main className="surface-cotton-paper relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <CottonPaperGrain variant="light" opacity={0.05} />
      <WoodgrainOverlay variant="light" opacity={0.08} />

      <div className="relative z-10 flex max-w-xl flex-col items-center">
        {/* 4 [Cordel Acai Bowl] 4 Centerpiece */}
        <div
          aria-label="404"
          className="flex items-center justify-center gap-2 select-none sm:gap-4"
        >
          <span
            aria-hidden="true"
            className="font-display text-[clamp(4.25rem,18vw,9.5rem)] leading-none font-extrabold tracking-tighter text-[#1E2749]"
          >
            4
          </span>

          <img
            src={assetUrl('assets/cordel/cordel-bowl-404.svg')}
            alt={notFound.bowlIllustrationAlt}
            className="h-auto w-[clamp(7rem,32vw,14.5rem)] shrink-0"
            width={320}
            height={320}
          />

          <span
            aria-hidden="true"
            className="font-display text-[clamp(4.25rem,18vw,9.5rem)] leading-none font-extrabold tracking-tighter text-[#30343F]"
          >
            4
          </span>
        </div>

        <h1 className="font-display mt-6 text-[clamp(1.5rem,4.5vw,2.5rem)] leading-tight font-extrabold tracking-tight text-[#1E2749]">
          {notFound.heading}
        </h1>

        <div className="mt-8">
          <AppLink to="/" className="woodcut-btn woodcut-btn-primary text-base">
            <ArrowLeft size={19} weight="bold" aria-hidden="true" />
            <span>{notFound.ctaLabel}</span>
          </AppLink>
        </div>
      </div>
    </main>
  );
}
