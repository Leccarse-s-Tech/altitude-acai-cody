import brandData from '../../data/verified-brand-data.json';

function SmartphoneMessageIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-[#273469] transition-transform duration-200 group-hover:scale-105"
    >
      <rect
        x="5"
        y="2.5"
        width="10.5"
        height="19"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <line x1="8.75" y1="18" x2="11.75" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M13 4.5H20.5C21.328 4.5 22 5.172 22 6V11C22 11.828 21.328 12.5 20.5 12.5H16.2L13 15V4.5Z"
        fill="#E4D9FF"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Persistent bottom-right floating SMS action button pointing exclusively
 * to Altitude Acai's verified store number (`307-527-0812`).
 * Rendered on public routes (`/`, `/menu`) and omitted on isolated `/404`.
 */
export function FloatingTextUsButton() {
  const digits = brandData.contact.phone.replace(/\D/g, '');
  const smsHref = `sms:+1${digits}`;

  return (
    <a
      href={smsHref}
      aria-label="Text us"
      data-testid="floating-text-us-fab"
      className="group fixed right-4 bottom-4 z-50 inline-flex min-h-[48px] items-center gap-2.5 rounded-full border border-[#1E2749]/30 bg-[#FAFAFF] px-5 py-2.5 font-display text-sm font-bold text-[#1E2749] shadow-[0_12px_28px_-6px_rgba(30,39,73,0.42)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E2749] hover:bg-[#E4D9FF] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#273469] sm:right-6 sm:bottom-6 sm:px-6 sm:py-3 sm:text-base"
    >
      <SmartphoneMessageIcon />
      <span>Text us</span>
    </a>
  );
}
