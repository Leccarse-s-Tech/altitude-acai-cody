import {
  ArrowUpRight,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
  Storefront,
} from '@phosphor-icons/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import { assetUrl } from '../../lib/router';
import { CordelBackgroundArtwork } from '../ui/CordelBackgroundArtwork';
import {
  CarvedWoodblockFrame,
  CottonPaperGrain,
  WoodgrainOverlay,
} from '../ui/WoodcutTextures';

export function LocationContactSection() {
  const { locationAndContact } = editorialCopy;
  const directionsUrl = brandData.location.googleMapsDirectionsUrl;

  return (
    <section
      id="visit-us"
      aria-labelledby="visit-us-heading"
      className="surface-periwinkle-print relative scroll-mt-20 overflow-hidden border-t border-[#1E2749]/30 py-20 text-[#1E2749] sm:py-24 lg:py-28"
    >
      <CottonPaperGrain variant="periwinkle" opacity={0.05} />
      <WoodgrainOverlay variant="periwinkle" opacity={0.08} />
      <CordelBackgroundArtwork placement="visit-ambient" variant="periwinkle" />

      {/* Subtle Bottom Horizon Mountain Peaks Silhouette Anchoring Section 5 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-44 overflow-hidden opacity-[0.12] select-none sm:h-56"
      >
        <img
          src={assetUrl('assets/cordel/wyoming-mountains-cordel.svg')}
          alt=""
          className="h-full w-full object-cover object-bottom"
          width={1440}
          height={540}
        />
      </div>

      <div className="widescreen-container relative z-10">
        <div className="scroll-reveal border-b border-[#1E2749]/30 pb-8">
          <div className="max-w-2xl">
            <h2
              id="visit-us-heading"
              className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.06] font-extrabold tracking-tight text-[#1E2749]"
            >
              {locationAndContact.title}
            </h2>
            <p className="mt-3 w-full max-w-[52ch] text-base leading-relaxed text-[#30343F] sm:text-lg">
              {locationAndContact.intro}
            </p>
          </div>
        </div>

        <div className="scroll-reveal mt-10 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: Embedded Interactive Google Map + Address Landmark */}
          <div className="min-w-0 lg:col-span-7">
            <CarvedWoodblockFrame
              variant="light"
              className="flex h-full flex-col justify-between p-4 sm:p-5"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#1E2749] bg-[#E4D9FF]">
                <iframe
                  src={brandData.location.googleMapsEmbedUrl}
                  title={locationAndContact.mapEmbedTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#1E2749]/20 pt-4">
                <div className="flex items-start gap-3">
                  <Storefront
                    size={22}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-[#273469]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-display text-base font-extrabold text-[#1E2749]">
                      {locationAndContact.addressLine}
                    </p>
                    <p className="text-sm text-[#575E8F]">
                      {brandData.location.suite} · {brandData.location.building} ·{' '}
                      {locationAndContact.cityRegionDisplay}
                    </p>
                  </div>
                </div>
              </div>
            </CarvedWoodblockFrame>
          </div>

          {/* Right: Open Editorial Contact Ledger (Zero Repetitive Boxed Cards) */}
          <div className="flex min-w-0 flex-col justify-between border-y border-[#1E2749]/35 bg-[#FAFAFF]/80 backdrop-blur-[2px] lg:col-span-5">
            <div className="divide-y divide-[#1E2749]/20">
              {/* 1. Google Maps Directions */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.googleMaps.ariaLabel}
                className="group flex min-h-[76px] items-center justify-between gap-4 bg-[#273469] px-5 py-4 text-[#FAFAFF] transition-colors duration-200 hover:bg-[#1E2749]"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <MapPin size={22} weight="bold" className="shrink-0 text-[#E4D9FF]" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-display text-base font-extrabold text-[#FAFAFF]">
                      {locationAndContact.channels.googleMaps.label}
                    </p>
                    <p className="text-sm text-[#E4D9FF]">{locationAndContact.addressLine}</p>
                  </div>
                </div>
                <ArrowUpRight size={20} weight="bold" className="shrink-0 text-[#E4D9FF]" aria-hidden="true" />
              </a>

              {/* 2. Phone */}
              <a
                href={locationAndContact.channels.phone.href}
                aria-label={locationAndContact.channels.phone.ariaLabel}
                className="group flex min-h-[72px] items-center justify-between gap-4 px-5 py-4 text-[#1E2749] transition-colors duration-150 hover:bg-[#E4D9FF]/60"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <Phone size={22} weight="bold" className="shrink-0 text-[#273469]" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-display text-base font-extrabold text-[#1E2749]">Phone</p>
                    <p className="font-mono text-sm font-semibold text-[#30343F]">
                      {brandData.contact.phone}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={20} weight="bold" className="shrink-0 text-[#575E8F]" aria-hidden="true" />
              </a>

              {/* 3. Email */}
              <a
                href={locationAndContact.channels.email.href}
                aria-label={locationAndContact.channels.email.ariaLabel}
                className="group flex min-h-[72px] items-center justify-between gap-4 px-5 py-4 text-[#1E2749] transition-colors duration-150 hover:bg-[#E4D9FF]/60"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <EnvelopeSimple
                    size={22}
                    weight="bold"
                    className="shrink-0 text-[#273469]"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-base font-extrabold text-[#1E2749]">Email</p>
                    <p className="font-mono text-sm font-semibold break-all text-[#30343F]">
                      {brandData.contact.email}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={20} weight="bold" className="shrink-0 text-[#575E8F]" aria-hidden="true" />
              </a>

              {/* 4. Instagram */}
              <a
                href={brandData.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.instagram.ariaLabel}
                className="group flex min-h-[72px] items-center justify-between gap-4 px-5 py-4 text-[#1E2749] transition-colors duration-150 hover:bg-[#E4D9FF]/60"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <InstagramLogo
                    size={22}
                    weight="bold"
                    className="shrink-0 text-[#273469]"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-base font-extrabold text-[#1E2749]">
                      Instagram
                    </p>
                    <p className="font-mono text-sm font-semibold text-[#30343F]">
                      {brandData.social.instagram.handle}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={20} weight="bold" className="shrink-0 text-[#575E8F]" aria-hidden="true" />
              </a>

              {/* 5. Facebook */}
              <a
                href={brandData.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.facebook.ariaLabel}
                className="group flex min-h-[72px] items-center justify-between gap-4 px-5 py-4 text-[#1E2749] transition-colors duration-150 hover:bg-[#E4D9FF]/60"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <FacebookLogo
                    size={22}
                    weight="bold"
                    className="shrink-0 text-[#273469]"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-base font-extrabold text-[#1E2749]">
                      Facebook
                    </p>
                    <p className="text-sm font-semibold text-[#30343F]">
                      {brandData.social.facebook.name}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={20} weight="bold" className="shrink-0 text-[#575E8F]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
