import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
} from '@phosphor-icons/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import { AppLink, assetUrl } from '../../lib/router';
import { CordelDivider, CottonPaperGrain, WoodgrainOverlay } from '../ui/WoodcutTextures';

export function Footer() {
  const { footer, navigation, locationAndContact } = editorialCopy;
  const directionsUrl = brandData.location.googleMapsDirectionsUrl;

  return (
    <footer className="surface-woodblock-indigo relative overflow-hidden border-t-2 border-[#E4D9FF]/40 pt-14 pb-12 text-[#FAFAFF]">
      <CottonPaperGrain variant="dark" opacity={0.045} />
      <WoodgrainOverlay variant="dark" opacity={0.08} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CordelDivider variant="dark" className="mb-10" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Crest & Mission */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-sm border-2 border-[#E4D9FF] bg-[#FAFAFF] shadow-[3px_3px_0px_#E4D9FF]">
                <img
                  src={assetUrl('assets/brand/logo-official.webp')}
                  alt={editorialCopy.hero.logoAlt}
                  className="h-full w-full object-cover"
                  width={64}
                  height={64}
                />
              </div>
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#FAFAFF]">
                  {footer.brandName}
                </h2>
                <p className="text-sm font-medium text-[#E4D9FF]">{brandData.brand.tagline}</p>
              </div>
            </div>

            <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-[#E4D9FF]">
              {footer.tagline}
            </p>

            <div className="mt-6">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.googleMaps.ariaLabel}
                className="woodcut-btn woodcut-btn-on-dark text-sm"
              >
                <MapPin size={18} weight="bold" aria-hidden="true" />
                <span>{footer.directionsLabel}</span>
              </a>
            </div>
          </div>

          {/* Route & Section Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-display text-lg font-bold text-[#FAFAFF]">
              {footer.navigationHeading}
            </h3>
            <ul className="mt-4 space-y-1.5">
              {navigation.links.map((link) => (
                <li key={link.id}>
                  <AppLink
                    to={link.to}
                    className="focus-on-dark inline-flex min-h-[44px] items-center text-sm font-medium text-[#E4D9FF] transition-colors duration-150 hover:text-[#FAFAFF] hover:underline"
                  >
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Single-Line Address & Contact Channels */}
          <div className="md:col-span-4">
            <h3 className="font-display text-lg font-bold text-[#FAFAFF]">
              {footer.visitHeading}
            </h3>

            <address className="mt-4 space-y-2 text-sm not-italic text-[#E4D9FF]">
              <p className="font-semibold text-[#FAFAFF]">{footer.addressLine}</p>

              <div className="flex flex-col items-start gap-1 pt-2">
                <a
                  href={locationAndContact.channels.phone.href}
                  aria-label={locationAndContact.channels.phone.ariaLabel}
                  className="focus-on-dark inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#FAFAFF] hover:text-[#E4D9FF] hover:underline"
                >
                  <Phone size={18} weight="bold" aria-hidden="true" />
                  <span>{footer.phoneLabel}</span>
                </a>

                <a
                  href={locationAndContact.channels.email.href}
                  aria-label={locationAndContact.channels.email.ariaLabel}
                  className="focus-on-dark inline-flex min-h-[44px] items-center gap-2 text-sm font-medium break-all text-[#FAFAFF] hover:text-[#E4D9FF] hover:underline"
                >
                  <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />
                  <span>{footer.emailLabel}</span>
                </a>
              </div>
            </address>

            <h3 className="font-display mt-6 text-base font-bold text-[#FAFAFF]">
              {footer.connectHeading}
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={brandData.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.instagram.ariaLabel}
                className="focus-on-dark inline-flex min-h-[44px] items-center gap-2 rounded-sm border-2 border-[#E4D9FF] bg-[#273469] px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-[#FAFAFF] shadow-[2px_2px_0px_#E4D9FF] transition-transform duration-150 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:bg-[#575E8F]"
              >
                <InstagramLogo size={18} weight="bold" aria-hidden="true" />
                <span>{footer.instagramLabel}</span>
              </a>

              <a
                href={brandData.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.facebook.ariaLabel}
                className="focus-on-dark inline-flex min-h-[44px] items-center gap-2 rounded-sm border-2 border-[#E4D9FF] bg-[#273469] px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-[#FAFAFF] shadow-[2px_2px_0px_#E4D9FF] transition-transform duration-150 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:bg-[#575E8F]"
              >
                <FacebookLogo size={18} weight="bold" aria-hidden="true" />
                <span>{footer.facebookLabel}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#E4D9FF]/30 pt-6 text-xs text-[#E4D9FF] sm:flex-row sm:items-center">
          <p>{footer.closingNote}</p>
          <p className="font-mono">
            © {new Date().getFullYear()} {footer.brandName}
          </p>
        </div>
      </div>
    </footer>
  );
}
