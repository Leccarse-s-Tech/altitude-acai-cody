import {
  ArrowUpRight,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
  Storefront,
} from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import {
  CarvedWoodblockFrame,
  CordelDivider,
  CottonPaperGrain,
  WoodgrainOverlay,
} from '../ui/WoodcutTextures';

const WOODCUT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function LocationContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const { founderStory, locationAndContact } = editorialCopy;
  const directionsUrl = brandData.location.googleMapsDirectionsUrl;

  return (
    <section
      id="our-story"
      aria-labelledby="founder-story-heading"
      className="surface-woodblock-indigo relative overflow-hidden py-20 text-[#FAFAFF] lg:py-24"
    >
      <CottonPaperGrain variant="dark" opacity={0.05} />
      <WoodgrainOverlay variant="dark" opacity={0.09} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Part A: Megan's 2024 Founder Story & Official Cody Bowl Gallery (Zero Eyebrow) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.42, ease: WOODCUT_EASE }}
            className="lg:col-span-6"
          >
            <h2
              id="founder-story-heading"
              className="font-display text-3xl font-extrabold tracking-tight text-[#FAFAFF] sm:text-4xl lg:text-5xl"
            >
              {founderStory.title}
            </h2>

            <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-[#E4D9FF] sm:text-lg">
              {founderStory.officialParagraph}
            </p>

            {/* 3 Verified Cody Milestones */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {founderStory.milestones.map((milestone) => (
                <div
                  key={milestone.label}
                  className="rounded-sm border-2 border-[#E4D9FF] bg-[#273469] p-4 shadow-[3px_3px_0px_#E4D9FF]"
                >
                  <p className="font-mono text-xs font-bold text-[#E4D9FF]">
                    {milestone.label}
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-[#FAFAFF]">
                    {milestone.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Asymmetric Cody Photography Collage */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.06, ease: WOODCUT_EASE }}
            className="lg:col-span-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
              <div className="sm:col-span-12">
                <CarvedWoodblockFrame variant="periwinkle" showCornerMarks={true}>
                  <div className="aspect-[16/10] overflow-hidden bg-[#1E2749]">
                    <img
                      src="./assets/bowls/official-cody-bench-duo.webp"
                      alt={brandData.officialMedia.bowlGallery[1].alt}
                      className="h-full w-full object-cover"
                      width={800}
                      height={500}
                    />
                  </div>
                </CarvedWoodblockFrame>
              </div>

              <div className="sm:col-span-6">
                <CarvedWoodblockFrame variant="light" showCornerMarks={false}>
                  <div className="aspect-[4/3] overflow-hidden bg-[#E4D9FF]">
                    <img
                      src="./assets/bowls/official-window-seeds-bowl.webp"
                      alt={brandData.officialMedia.bowlGallery[2].alt}
                      className="h-full w-full object-cover"
                      width={480}
                      height={360}
                    />
                  </div>
                </CarvedWoodblockFrame>
              </div>

              <div className="sm:col-span-6">
                <CarvedWoodblockFrame variant="light" showCornerMarks={false}>
                  <div className="aspect-[4/3] overflow-hidden bg-[#E4D9FF]">
                    <img
                      src="./assets/bowls/official-berry-pollen-bowl.webp"
                      alt={brandData.officialMedia.bowlGallery[3].alt}
                      className="h-full w-full object-cover"
                      width={480}
                      height={360}
                    />
                  </div>
                </CarvedWoodblockFrame>
              </div>
            </div>
          </motion.div>
        </div>

        <CordelDivider variant="dark" className="my-14 lg:my-16" />

        {/* Part B: Interactive Cody Map & Verified Contact Channels (Zero Eyebrow) */}
        <div id="visit-us" className="scroll-mt-24">
          <div className="max-w-3xl">
            <h3 className="font-display text-3xl font-extrabold tracking-tight text-[#FAFAFF] sm:text-4xl">
              {locationAndContact.title}
            </h3>
            <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-[#E4D9FF] sm:text-lg">
              {locationAndContact.intro}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Embedded Interactive Google Map */}
            <div className="lg:col-span-7">
              <CarvedWoodblockFrame
                variant="light"
                showCornerMarks={true}
                className="flex h-full flex-col justify-between p-4 sm:p-5"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF]">
                  <iframe
                    src={brandData.location.googleMapsEmbedUrl}
                    title={locationAndContact.mapEmbedTitle}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                    allowFullScreen
                  />
                </div>

                <div className="mt-4 flex flex-col justify-between gap-4 border-t-2 border-[#1E2749]/15 pt-4 sm:flex-row sm:items-center">
                  <div className="flex items-start gap-3">
                    <Storefront
                      size={22}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-[#273469]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-display text-base font-extrabold text-[#1E2749]">
                        {brandData.location.formattedAddress}
                      </p>
                      <p className="text-sm text-[#575E8F]">
                        {brandData.location.building} · {brandData.location.county},{' '}
                        {brandData.location.state}
                      </p>
                    </div>
                  </div>

                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={locationAndContact.channels.googleMaps.ariaLabel}
                    className="woodcut-btn woodcut-btn-primary shrink-0 text-sm whitespace-nowrap"
                  >
                    <MapPin size={18} weight="bold" aria-hidden="true" />
                    <span>{locationAndContact.channels.googleMaps.label}</span>
                  </a>
                </div>
              </CarvedWoodblockFrame>
            </div>

            {/* 5 Tactile Woodcut Contact & Social Cards */}
            <div className="flex flex-col justify-between gap-3.5 lg:col-span-5">
              {/* 1. Google Maps Card */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.googleMaps.ariaLabel}
                className="woodcut-card-periwinkle focus-on-dark group flex min-h-[72px] items-center justify-between gap-4 rounded-sm p-4 text-[#1E2749] transition-transform duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border-2 border-[#1E2749] bg-[#FAFAFF] text-[#1E2749]">
                    <MapPin size={22} weight="bold" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-base font-extrabold text-[#1E2749]">
                      {locationAndContact.channels.googleMaps.label}
                    </p>
                    <p className="text-sm text-[#30343F]">
                      {brandData.location.formattedAddress}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={20} weight="bold" className="shrink-0" aria-hidden="true" />
              </a>

              {/* 2. Phone Card */}
              <a
                href={locationAndContact.channels.phone.href}
                aria-label={locationAndContact.channels.phone.ariaLabel}
                className="woodcut-card focus-on-dark group flex min-h-[72px] items-center justify-between gap-4 rounded-sm p-4 text-[#1E2749] transition-transform duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-[#E4D9FF]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] text-[#1E2749]">
                    <Phone size={22} weight="bold" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-base font-extrabold text-[#1E2749]">
                      Phone
                    </p>
                    <p className="font-mono text-sm font-semibold text-[#30343F]">
                      {brandData.contact.phone}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={20} weight="bold" className="shrink-0" aria-hidden="true" />
              </a>

              {/* 3. Email Card */}
              <a
                href={locationAndContact.channels.email.href}
                aria-label={locationAndContact.channels.email.ariaLabel}
                className="woodcut-card focus-on-dark group flex min-h-[72px] items-center justify-between gap-4 rounded-sm p-4 text-[#1E2749] transition-transform duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-[#E4D9FF]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] text-[#1E2749]">
                    <EnvelopeSimple size={22} weight="bold" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-base font-extrabold text-[#1E2749]">
                      Email
                    </p>
                    <p className="font-mono text-sm font-semibold break-all text-[#30343F]">
                      {brandData.contact.email}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={20} weight="bold" className="shrink-0" aria-hidden="true" />
              </a>

              {/* 4. Instagram Card */}
              <a
                href={brandData.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.instagram.ariaLabel}
                className="woodcut-card focus-on-dark group flex min-h-[72px] items-center justify-between gap-4 rounded-sm p-4 text-[#1E2749] transition-transform duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-[#E4D9FF]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] text-[#1E2749]">
                    <InstagramLogo size={22} weight="bold" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-base font-extrabold text-[#1E2749]">
                      Instagram
                    </p>
                    <p className="font-mono text-sm font-semibold text-[#30343F]">
                      {brandData.social.instagram.handle}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={20} weight="bold" className="shrink-0" aria-hidden="true" />
              </a>

              {/* 5. Facebook Card */}
              <a
                href={brandData.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.facebook.ariaLabel}
                className="woodcut-card focus-on-dark group flex min-h-[72px] items-center justify-between gap-4 rounded-sm p-4 text-[#1E2749] transition-transform duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-[#E4D9FF]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] text-[#1E2749]">
                    <FacebookLogo size={22} weight="bold" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-base font-extrabold text-[#1E2749]">
                      Facebook
                    </p>
                    <p className="text-sm font-semibold text-[#30343F]">
                      {brandData.social.facebook.name}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={20} weight="bold" className="shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
