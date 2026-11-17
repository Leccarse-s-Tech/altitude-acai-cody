import { useId, type ReactNode } from 'react';

export type CordelSurfaceVariant = 'light' | 'dark' | 'periwinkle';

export interface CottonPaperGrainProps {
  /** Opacity strictly clamped between 0.03 (3%) and 0.06 (6%) per Cordel surface rules. */
  opacity?: number;
  /** Visual polarity of the underlying section. */
  variant?: CordelSurfaceVariant;
  /** Fractal noise baseFrequency for fine cotton rag vs coarse print grain. */
  baseFrequency?: number;
  className?: string;
}

/**
 * Renders an inline SVG `<feTurbulence>` tactile paper-grain overlay so no
 * section appears flat or sterile. Uses a unique React ID per instance.
 */
export function CottonPaperGrain({
  opacity = 0.045,
  variant = 'light',
  baseFrequency = 0.85,
  className = '',
}: CottonPaperGrainProps) {
  const rawId = useId().replace(/:/g, '');
  const filterId = `cordel-paper-grain-${rawId}`;
  const clampedOpacity = Math.min(0.06, Math.max(0.03, opacity));
  const inkColor = variant === 'dark' ? '#E4D9FF' : '#1E2749';

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full select-none ${className}`}
      style={{ opacity: clampedOpacity }}
    >
      <defs>
        <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={3}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.12  0 0 0 0 0.15  0 0 0 0 0.29  0 0 0 1 0"
            in="noise"
            result="tintedNoise"
          />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={inkColor} filter={`url(#${filterId})`} />
    </svg>
  );
}

export interface WoodgrainOverlayProps {
  variant?: CordelSurfaceVariant;
  opacity?: number;
  className?: string;
}

/**
 * Renders organic carved woodcut gouge grain lines inspired by Brazilian Cordel
 * xilogravura matrices. Zero flat backgrounds.
 */
export function WoodgrainOverlay({
  variant = 'light',
  opacity = 0.12,
  className = '',
}: WoodgrainOverlayProps) {
  const rawId = useId().replace(/:/g, '');
  const patternId = `cordel-woodgrain-${rawId}`;
  const strokeColor =
    variant === 'dark' ? '#E4D9FF' : variant === 'periwinkle' ? '#575E8F' : '#8687B4';

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full select-none ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id={patternId}
          width="280"
          height="72"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 9 Q70 5 140 10 T280 9"
            stroke={strokeColor}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M0 27 Q90 31 180 26 T280 28"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray="18 7 42 9"
            fill="none"
          />
          <path
            d="M0 46 Q65 42 135 47 T280 45"
            stroke={strokeColor}
            strokeWidth="1.15"
            fill="none"
          />
          <path
            d="M0 64 Q100 67 200 62 T280 64"
            stroke={strokeColor}
            strokeWidth="0.95"
            strokeDasharray="24 10"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export interface WoodcutCornerMarksProps {
  variant?: CordelSurfaceVariant;
  className?: string;
}

/**
 * Printmaker corner registration notches echoing the hand-drawn corner curls
 * of the official Altitude Acai crest.
 */
export function WoodcutCornerMarks({
  variant = 'light',
  className = '',
}: WoodcutCornerMarksProps) {
  const stroke = variant === 'dark' ? '#E4D9FF' : '#1E2749';
  const accent = variant === 'dark' ? '#8687B4' : '#575E8F';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg className="absolute top-2 left-2 h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M2 14V2H14" stroke={stroke} strokeWidth="2.2" strokeLinecap="square" />
        <path d="M6 10V6H10" stroke={accent} strokeWidth="1.4" strokeLinecap="square" />
      </svg>
      <svg className="absolute top-2 right-2 h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M22 14V2H10" stroke={stroke} strokeWidth="2.2" strokeLinecap="square" />
        <path d="M18 10V6H14" stroke={accent} strokeWidth="1.4" strokeLinecap="square" />
      </svg>
      <svg className="absolute bottom-2 left-2 h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M2 10V22H14" stroke={stroke} strokeWidth="2.2" strokeLinecap="square" />
        <path d="M6 14V18H10" stroke={accent} strokeWidth="1.4" strokeLinecap="square" />
      </svg>
      <svg className="absolute right-2 bottom-2 h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M22 10V22H10" stroke={stroke} strokeWidth="2.2" strokeLinecap="square" />
        <path d="M18 14V18H14" stroke={accent} strokeWidth="1.4" strokeLinecap="square" />
      </svg>
    </div>
  );
}

export interface CarvedWoodblockFrameProps {
  children: ReactNode;
  variant?: CordelSurfaceVariant;
  showCornerMarks?: boolean;
  showWoodgrain?: boolean;
  className?: string;
}

/**
 * Tactile woodcut card/plate container combining cotton-paper grain, carved
 * double border rule, optional corner marks, and hard ink block shadow.
 */
export function CarvedWoodblockFrame({
  children,
  variant = 'light',
  showCornerMarks = true,
  showWoodgrain = false,
  className = '',
}: CarvedWoodblockFrameProps) {
  const surfaceClass =
    variant === 'dark'
      ? 'woodcut-card-dark'
      : variant === 'periwinkle'
        ? 'woodcut-card-periwinkle'
        : 'woodcut-card';

  return (
    <div className={`relative overflow-hidden ${surfaceClass} ${className}`}>
      <CottonPaperGrain variant={variant} opacity={0.045} />
      {showWoodgrain && <WoodgrainOverlay variant={variant} opacity={0.1} />}
      {showCornerMarks && <WoodcutCornerMarks variant={variant} />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export interface CordelDividerProps {
  variant?: CordelSurfaceVariant;
  className?: string;
}

/**
 * Carved woodcut horizontal divider with central mountain-berry diamond seal
 * and alternating printmaker dashes.
 */
export function CordelDivider({
  variant = 'light',
  className = '',
}: CordelDividerProps) {
  const linePrimary = variant === 'dark' ? '#E4D9FF' : '#1E2749';
  const lineSecondary = variant === 'dark' ? '#8687B4' : '#575E8F';
  const centerFill = variant === 'dark' ? '#FAFAFF' : '#E4D9FF';
  const centerCore = variant === 'dark' ? '#273469' : '#1E2749';

  return (
    <div
      aria-hidden="true"
      className={`flex w-full items-center justify-center py-2 select-none ${className}`}
    >
      <svg className="h-6 w-full max-w-2xl" viewBox="0 0 640 24" fill="none">
        <line
          x1="12"
          y1="12"
          x2="278"
          y2="12"
          stroke={linePrimary}
          strokeWidth="2"
          strokeDasharray="14 6 6 6"
        />
        <line
          x1="362"
          y1="12"
          x2="628"
          y2="12"
          stroke={linePrimary}
          strokeWidth="2"
          strokeDasharray="14 6 6 6"
        />
        <circle cx="294" cy="12" r="3.5" fill={lineSecondary} />
        <circle cx="346" cy="12" r="3.5" fill={lineSecondary} />
        <polygon
          points="320,2 332,12 320,22 308,12"
          fill={centerFill}
          stroke={linePrimary}
          strokeWidth="2"
        />
        <polygon points="320,7 325,12 320,17 315,12" fill={centerCore} />
      </svg>
    </div>
  );
}
