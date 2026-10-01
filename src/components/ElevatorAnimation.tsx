import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

/**
 * Ascenseur animé (SVG pur) : la cabine se déplace entre 8 étages,
 * les portes s'ouvrent/se ferment et l'indicateur d'étage suit le trajet.
 * Désactivé si l'utilisateur préfère réduire les animations.
 */

const FLOORS = 8;
const STEP = 288 / (FLOORS - 1); // course totale : 288 unités SVG
const CABIN_BASE_Y = 360; // position de la cabine au rez-de-chaussée

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function ElevatorAnimation() {
  const reduced = usePrefersReducedMotion();
  const [floor, setFloor] = useState(0);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const [travelMs, setTravelMs] = useState(500);

  useEffect(() => {
    if (reduced) {
      setFloor(3);
      setDoorsOpen(true);
      setDir(1);
      return;
    }
    let alive = true;
    let current = 0;

    (async () => {
      await wait(1000);
      while (alive) {
        setDoorsOpen(true);
        await wait(1800);
        if (!alive) return;
        setDoorsOpen(false);
        await wait(650);
        if (!alive) return;
        let next = current;
        while (next === current) next = Math.round(Math.random() * (FLOORS - 1));
        setDir(next > current ? 1 : -1);
        const dist = Math.abs(next - current);
        setTravelMs(450 + dist * 420);
        setFloor(next);
        current = next;
        await wait(650 + dist * 420);
      }
    })();

    return () => {
      alive = false;
    };
  }, [reduced]);

  return (
    <div className="relative">
      <svg
        viewBox="0 0 440 500"
        className="h-auto w-full"
        role="img"
        aria-label="Ascenseur animé montant et descendant dans sa gaine, portes s'ouvrant à chaque étage"
      >
        <defs>
          <linearGradient id="pa-door" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e6eef9" />
            <stop offset="0.5" stopColor="#c3d4e8" />
            <stop offset="1" stopColor="#e6eef9" />
          </linearGradient>
          <linearGradient id="pa-cabin-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fffaf1" />
            <stop offset="1" stopColor="#ffe9cd" />
          </linearGradient>
          <linearGradient id="pa-shaft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0d2547" />
            <stop offset="1" stopColor="#0b1f3a" />
          </linearGradient>
        </defs>

        {/* Immeuble */}
        <rect x="8" y="8" width="424" height="480" rx="22" fill="#fbfdff" stroke="#dbe7f5" strokeWidth="2" />
        <line x1="8" y1="472" x2="432" y2="472" stroke="#dbe7f5" strokeWidth="2" />

        {/* Fenêtres de façade (gauche) */}
        {[0, 1].map((col) =>
          [0, 1, 2, 3, 4, 5].map((row) => (
            <rect
              key={`${col}-${row}`}
              x={30 + col * 40}
              y={72 + row * 52}
              width="26"
              height="30"
              rx="4"
              className={row % 3 === col ? "fill-mist" : "fill-cloud"}
              stroke="#dbe7f5"
            />
          )),
        )}

        {/* Porte d'entrée */}
        <rect x="56" y="408" width="44" height="64" rx="6" fill="#0b1f3a" />
        <line x1="78" y1="418" x2="78" y2="464" stroke="#16305a" strokeWidth="2" />
        <rect x="50" y="398" width="56" height="10" rx="3" fill="#1d6fe8" />

        {/* Local machinerie */}
        <rect x="120" y="26" width="140" height="30" rx="7" fill="#e8f1fe" stroke="#c6daf3" />
        <g className="svg-cb animate-[spin_5s_linear_infinite]" style={{ transformBox: "fill-box" }}>
          <circle cx="246" cy="41" r="8" fill="none" stroke="#0b1f3a" strokeWidth="2.4" />
          <line x1="246" y1="35" x2="246" y2="47" stroke="#0b1f3a" strokeWidth="2" />
          <line x1="240" y1="41" x2="252" y2="41" stroke="#0b1f3a" strokeWidth="2" />
        </g>
        <rect x="132" y="35" width="52" height="3" rx="1.5" fill="#9db4d2" />
        <rect x="132" y="42" width="36" height="3" rx="1.5" fill="#c0d2e8" />

        {/* Gaine d'ascenseur */}
        <rect x="120" y="62" width="140" height="398" rx="10" fill="url(#pa-shaft)" />
        <line x1="132" y1="66" x2="132" y2="456" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
        <line x1="248" y1="66" x2="248" y2="456" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />

        {/* Numéros d'étage (à gauche de la gaine) */}
        {Array.from({ length: FLOORS }).map((_, f) => (
          <text
            key={f}
            x="110"
            y={408 - f * STEP + 4}
            textAnchor="end"
            fontSize="10.5"
            fontWeight={floor === f ? 700 : 500}
            fill={floor === f ? "#1d6fe8" : "#93a3bd"}
            fontFamily="Poppins, sans-serif"
          >
            {f === 0 ? "RDC" : f}
          </text>
        ))}

        {/* Voyants lumineux (à droite de la gaine) */}
        {Array.from({ length: FLOORS }).map((_, f) => (
          <circle
            key={f}
            cx="272"
            cy={408 - f * STEP}
            r="3"
            fill={floor === f ? "#1d6fe8" : "#d8e2f0"}
            className="transition-colors duration-300"
          />
        ))}

        {/* Cabine (groupe mobile) */}
        <g
          className="transition-transform ease-in-out"
          style={{
            transform: `translateY(${-floor * STEP}px)`,
            transitionDuration: `${travelMs}ms`,
          }}
        >
          {/* Câble */}
          <rect x="188.5" y="-6" width="3" height={CABIN_BASE_Y + 6} fill="#26456e" />
          {/* Corps */}
          <rect x="126" y={CABIN_BASE_Y} width="128" height="96" rx="8" fill="#e9f0f9" />
          {/* Intérieur éclairé (visible portes ouvertes) */}
          <rect x={130} y={CABIN_BASE_Y + 4} width="120" height="88" rx="5" fill="url(#pa-cabin-light)" />
          {/* Passager */}
          <circle cx="176" cy={CABIN_BASE_Y + 42} r="9" fill="#8095b5" />
          <rect x="164" y={CABIN_BASE_Y + 53} width="25" height="39" rx="9" fill="#8095b5" />
          {/* Poste de commande */}
          <rect x="231" y={CABIN_BASE_Y + 28} width="10" height="36" rx="2.5" fill="#ccdcee" />
          <circle cx="236" cy={CABIN_BASE_Y + 35} r="1.8" fill="#1d6fe8" />
          <circle cx="236" cy={CABIN_BASE_Y + 46} r="1.8" fill="#1d6fe8" />
          <circle cx="236" cy={CABIN_BASE_Y + 57} r="1.8" fill="#93a3bd" />

          {/* Porte gauche */}
          <g
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: doorsOpen ? "translateX(-56px)" : "translateX(0)" }}
          >
            <rect x="130" y={CABIN_BASE_Y + 4} width="60" height="88" rx="4" fill="url(#pa-door)" />
            <line x1="184" y1={CABIN_BASE_Y + 16} x2="184" y2={CABIN_BASE_Y + 80} stroke="#9db4d2" strokeWidth="2" />
          </g>
          {/* Porte droite */}
          <g
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: doorsOpen ? "translateX(56px)" : "translateX(0)" }}
          >
            <rect x="190" y={CABIN_BASE_Y + 4} width="60" height="88" rx="4" fill="url(#pa-door)" />
            <line x1="196" y1={CABIN_BASE_Y + 16} x2="196" y2={CABIN_BASE_Y + 80} stroke="#9db4d2" strokeWidth="2" />
          </g>

          {/* Contour de la cabine */}
          <rect x="126" y={CABIN_BASE_Y} width="128" height="96" rx="8" fill="none" stroke="#26456e" strokeWidth="2.5" />
        </g>

        {/* Panneau indicateur d'étage */}
        <g>
          <rect x="284" y="78" width="140" height="86" rx="14" fill="#0b1f3a" />
          <rect x="284" y="78" width="140" height="86" rx="14" fill="none" stroke="#26456e" strokeWidth="1.5" />
          <text x="300" y="102" fontSize="10" letterSpacing="3" fill="#7fb0f7" fontFamily="Poppins, sans-serif" fontWeight="600">
            ÉTAGE
          </text>
          <text
            x="300"
            y="148"
            fontSize="46"
            fontWeight="800"
            fill="#ffffff"
            fontFamily="Poppins, sans-serif"
            className="transition-all duration-300"
          >
            {floor}
          </text>
          {/* flèches directionnelles */}
          <polygon points="396,96 406,110 386,110" fill={dir > 0 ? "#5b96f0" : "#26456e"} className="transition-colors duration-300" />
          <polygon points="396,150 406,136 386,136" fill={dir < 0 ? "#5b96f0" : "#26456e"} className="transition-colors duration-300" />
        </g>

        <text x="284" y="184" fontSize="10.5" fill="#8494ab" fontFamily="Inter, sans-serif">
          Cabine n°1 — démonstration
        </text>

        {/* Fenêtres basses droite */}
        {[0, 1, 2].map((row) => (
          <rect
            key={row}
            x="330"
            y={220 + row * 64}
            width="56"
            height="40"
            rx="5"
            className={row === 1 ? "fill-mist" : "fill-cloud"}
            stroke="#dbe7f5"
          />
        ))}

        {/* Petit arbuste décoratif */}
        <circle cx="330" cy="452" r="14" fill="#dbeafe" />
        <circle cx="346" cy="446" r="18" fill="#e8f1fe" stroke="#c6daf3" />
        <rect x="340" y="458" width="12" height="14" rx="2" fill="#c6daf3" />
      </svg>

      {/* Annonce accessible pour lecteurs d'écran */}
      <span className="sr-only" aria-live="polite">
        {`Cabine à l'étage ${floor}, portes ${doorsOpen ? "ouvertes" : "fermées"}`}
      </span>
    </div>
  );
}
