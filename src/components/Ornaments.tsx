import React from "react";

interface OrnamentProps {
  className?: string;
}

/** Luxury arch motif */
export const GoldArchMotif: React.FC<OrnamentProps> = ({ className = "w-24 h-8" }) => (
  <svg
    viewBox="0 0 160 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 24H50C60 24 68 18 72 10C76 2 84 2 88 10C92 18 100 24 110 24H150"
      stroke="#cda243"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="80" cy="4" r="3" fill="#cda243" />
    <circle cx="80" cy="18" r="2" fill="#cda243" />
    <circle cx="70" cy="24" r="1.5" fill="#cda243" />
    <circle cx="90" cy="24" r="1.5" fill="#cda243" />
  </svg>
);

/** Ornate Canva-style floral garland divider */
export const CanvaFloralGarland: React.FC<OrnamentProps> = ({ className = "w-48 h-8" }) => (
  <svg
    viewBox="0 0 320 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M10 20H110M210 20H310" stroke="#cda243" strokeWidth="0.8" strokeLinecap="round" />
    <g transform="translate(160, 20)">
      <circle cx="0" cy="0" r="4.5" fill="#cda243" />
      <circle cx="0" cy="0" r="2" fill="#fffcf5" />
      <path d="M0 -10C2 -6 2 -4 0 0C-2 -4 -2 -6 0 -10Z" fill="#d9b65d" />
      <path d="M0 10C2 6 2 4 0 0C-2 4 -2 6 0 10Z" fill="#d9b65d" />
      <path d="M-10 0C-6 2 -4 2 0 0C-4 -2 -6 -2 -10 0Z" fill="#d9b65d" />
      <path d="M10 0C6 2 4 2 0 0C4 -2 6 -2 10 0Z" fill="#d9b65d" />
      <path d="M-7 -7C-3 -5 -2 -2 0 0C-2 -2 -5 -3 -7 -7Z" fill="#a47d2b" />
      <path d="M7 7C3 5 2 2 0 0C2 2 5 3 7 7Z" fill="#a47d2b" />
      <path d="M7 -7C3 -5 2 -2 0 0C2 -2 5 -3 7 -7Z" fill="#a47d2b" />
      <path d="M-7 7C-3 5 -2 2 0 0C-2 2 -5 3 -7 7Z" fill="#a47d2b" />
    </g>
    <g transform="translate(132, 20)">
      <circle cx="0" cy="0" r="2.5" fill="#cda243" />
      <path d="M-5 -4C-2 -2 0 0 0 0C0 0 -2 2 -5 4" stroke="#cda243" strokeWidth="0.8" fill="none" />
    </g>
    <g transform="translate(188, 20)">
      <circle cx="0" cy="0" r="2.5" fill="#cda243" />
      <path d="M5 -4C2 -2 0 0 0 0C0 0 2 2 5 4" stroke="#cda243" strokeWidth="0.8" fill="none" />
    </g>
  </svg>
);

/** Canva-style Botanical Flower Corner Spray */
export const CanvaFloralCorner: React.FC<{
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}> = ({ position = "top-left", className = "w-20 h-20" }) => {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(1, -1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "scale(1, 1)";
    }
  };

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: getTransform() }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M4 4C35 8 60 25 78 55M4 4C8 35 25 60 55 78"
          stroke="#cda243"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.75"
        />
        <g transform="translate(14, 14)">
          <circle cx="0" cy="0" r="5" fill="#ecd690" />
          <circle cx="0" cy="0" r="2.5" fill="#b3852b" />
          <path d="M0 -8C2 -4 0 0 0 0C0 0 -2 -4 0 -8Z" fill="#cda243" />
          <path d="M8 0C4 2 0 0 0 0C0 0 4 -2 8 0Z" fill="#cda243" />
        </g>
        <g transform="translate(45, 18)">
          <ellipse cx="0" cy="0" rx="3.5" ry="2" transform="rotate(-30)" fill="#fffdf5" stroke="#cda243" strokeWidth="0.7" />
        </g>
        <g transform="translate(18, 45)">
          <ellipse cx="0" cy="0" rx="3.5" ry="2" transform="rotate(60)" fill="#fffdf5" stroke="#cda243" strokeWidth="0.7" />
        </g>
        <path d="M30 10C35 6 40 8 42 12C38 12 33 11 30 10Z" fill="#2d5e49" opacity="0.65" />
        <path d="M10 30C6 35 8 40 12 42C12 38 11 33 10 30Z" fill="#2d5e49" opacity="0.65" />
      </svg>
    </div>
  );
};

/** Canva-style Floral Crest Frame Header for Event Cards */
export const CanvaFloralCrest: React.FC<{
  title: string;
  isEmerald?: boolean;
}> = ({ title, isEmerald = false }) => {
  return (
    <div className="flex flex-col items-center justify-center my-3 text-center">
      {/* Ornate Gold Crown & Flower Crest */}
      <svg
        viewBox="0 0 160 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 h-8 mb-1.5 opacity-90"
        aria-hidden="true"
      >
        <path
          d="M20 22C45 22 60 12 80 4C100 12 115 22 140 22"
          stroke="#cda243"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="80" cy="4" r="3" fill="#cda243" />
        <circle cx="80" cy="14" r="1.5" fill="#e5c365" />
        <circle cx="65" cy="18" r="1.5" fill="#cda243" />
        <circle cx="95" cy="18" r="1.5" fill="#cda243" />
        {/* Jasmine flower in center */}
        <g transform="translate(80, 24)">
          <circle cx="0" cy="0" r="3" fill="#ecd690" />
          <path d="M0 -6C1.5 -3 0 0 0 0C0 0 -1.5 -3 0 -6Z" fill="#cda243" />
          <path d="M6 0C3 1.5 0 0 0 0C0 0 3 -1.5 6 0Z" fill="#cda243" />
          <path d="M-6 0C-3 1.5 0 0 0 0C0 0 -3 -1.5 -6 0Z" fill="#cda243" />
          <path d="M0 6C1.5 3 0 0 0 0C0 0 -1.5 3 0 6Z" fill="#cda243" />
        </g>
      </svg>

      {/* Decorative Canva-Style Event Title with Elegant Flourish */}
      <h3
        className={`text-3xl sm:text-4xl md:text-5xl font-script tracking-wide leading-tight drop-shadow-sm ${
          isEmerald ? "text-[#f8efd8]" : "text-[#123929]"
        }`}
      >
        {title}
      </h3>

      {/* Gold Flourish Underline */}
      <svg
        viewBox="0 0 180 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-44 h-5 mt-1 opacity-80"
        aria-hidden="true"
      >
        <path
          d="M10 10H70C75 10 78 7 80 4C82 7 85 10 90 10C95 10 98 7 100 4C102 7 105 10 110 10H170"
          stroke="#cda243"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <circle cx="90" cy="10" r="2.5" fill="#cda243" />
        <circle cx="90" cy="10" r="1" fill="#fffdf5" />
      </svg>
    </div>
  );
};

export const FloatingPetals: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const left = `${(i * 19) % 100}%`;
        const delay = `${(i * 1.4) % 6}s`;
        const duration = `${7 + (i % 4) * 2}s`;
        const size = 8 + (i % 3) * 4;

        return (
          <div
            key={i}
            className="absolute rounded-full opacity-60 animate-float"
            style={{
              left,
              top: `${-20 - (i * 15)}px`,
              width: `${size}px`,
              height: `${size * 1.3}px`,
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, #fffdfa 40%, #edd9a6 100%)"
                  : "radial-gradient(circle, #fbf7ee 30%, #cfa850 100%)",
              borderRadius: "50% 10% 50% 50%",
              animationDuration: duration,
              animationDelay: delay,
            }}
          />
        );
      })}
    </div>
  );
};
