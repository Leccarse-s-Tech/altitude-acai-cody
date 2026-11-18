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
 * Shared SVG filter definitions for hand-carved woodcut borders (`#woodcut-carved-edge`).
 */
export function WoodcutCarvedFilterDefs() {
  return (
    <svg aria-hidden="true" focusable="false" className="pointer-events-none fixed h-0 w-0 opacity-0">
      <defs>
        <filter id="woodcut-carved-edge" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.038"
            numOctaves="2"
            seed="17"
            result="gougeNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="gougeNoise"
            scale="1.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
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

export interface CarvedWoodblockFrameProps {
  children: ReactNode;
  variant?: CordelSurfaceVariant;
  showWoodgrain?: boolean;
  className?: string;
  contentClassName?: string;
}

/**
 * Artisanal woodblock print container combining cotton-paper grain and an
 * imperfect carved edge border — ZERO technical corner brackets (`┌ ┐ └ ┘`).
 */
export function CarvedWoodblockFrame({
  children,
  variant = 'light',
  showWoodgrain = false,
  className = '',
  contentClassName = 'h-full',
}: CarvedWoodblockFrameProps) {
  const surfaceClass =
    variant === 'dark'
      ? 'woodcut-card-dark'
      : variant === 'periwinkle'
        ? 'woodcut-card-periwinkle'
        : 'woodcut-card';

  const borderStroke = variant === 'dark' ? '#E4D9FF' : '#1E2749';

  return (
    <div className={`relative overflow-hidden ${surfaceClass} ${className}`}>
      <CottonPaperGrain variant={variant} opacity={0.045} />
      {showWoodgrain && <WoodgrainOverlay variant={variant} opacity={0.1} />}
      {/* Subtle hand-carved inner woodblock print rule using SVG turbulence */}
      <svg
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        className="woodcut-carved-border pointer-events-none absolute inset-[5px] h-[calc(100%-10px)] w-[calc(100%-10px)] select-none"
      >
        <rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          fill="none"
          stroke={borderStroke}
          strokeOpacity={variant === 'dark' ? '0.28' : '0.2'}
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </div>
  );
}
