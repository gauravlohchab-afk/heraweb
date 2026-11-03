// Original line-art decorations (botanical, stone, water), drawn in code.
// All geometry is deterministic so server and client render identically.
// Decorations are aria-hidden, stroke with currentColor and inherit the
// colour/opacity set by .decor modifiers in decor.css. Paths with
// pathLength="1" and class "draw" animate in when the SVG scrolls into view.

const r = (n) => Math.round(n * 10) / 10;

// Almond leaf from (0,0) to (len,0), with midrib.
function leafPath(len, width = 0.3) {
  const w = len * width;
  return {
    outline: `M0 0C${r(len * 0.28)} ${r(-w)} ${r(len * 0.72)} ${r(-w)} ${r(len)} 0C${r(len * 0.72)} ${r(w)} ${r(len * 0.28)} ${r(w)} 0 0Z`,
    rib: `M0 0L${r(len * 0.86)} 0`,
  };
}

function Leaf({ x, y, angle, len, width }) {
  const { outline, rib } = leafPath(len, width);
  return (
    <g transform={`translate(${r(x)} ${r(y)}) rotate(${r(angle)})`}>
      <path className="draw" pathLength="1" d={outline} />
      <path className="draw draw--late" pathLength="1" d={rib} />
    </g>
  );
}

function Svg({ viewBox, className = '', children, ...rest }) {
  return (
    <svg className={`decor ${className}`} viewBox={viewBox} aria-hidden="true" focusable="false" fill="none" {...rest}>
      {children}
    </svg>
  );
}

/* ---------- Botanical branch ---------- */

// Point on a cubic bezier
const bez = (t, p0, p1, p2, p3) => {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
};

const STEM = { x: [60, 30, 120, 92], y: [400, 300, 150, 18] };
const branchLeaves = Array.from({ length: 9 }, (_, i) => {
  const t = 0.14 + i * 0.095;
  const x = bez(t, ...STEM.x);
  const y = bez(t, ...STEM.y);
  const side = i % 2 === 0 ? -1 : 1;
  const len = 58 - i * 3.6;
  return { x, y, angle: side < 0 ? 200 + i * 4 : -20 - i * 4, len, width: 0.3 };
});

export function Branch({ className = '', ...rest }) {
  return (
    <Svg viewBox="0 0 180 410" className={`decor--branch ${className}`} {...rest}>
      <path className="draw" pathLength="1" d={`M${STEM.x[0]} ${STEM.y[0]}C${STEM.x[1]} ${STEM.y[1]} ${STEM.x[2]} ${STEM.y[2]} ${STEM.x[3]} ${STEM.y[3]}`} />
      {branchLeaves.map((l, i) => (
        <Leaf key={i} {...l} />
      ))}
      <Leaf x={92} y={18} angle={-78} len={30} width={0.32} />
    </Svg>
  );
}

/* ---------- Wellness tree ---------- */

// Fixed-parameter fractal tree: trunk, three levels of branches, leaves at tips.
function buildTree() {
  const branches = [];
  const leaves = [];
  const grow = (x, y, angle, len, depth) => {
    const rad = (angle * Math.PI) / 180;
    const x2 = x + Math.cos(rad) * len;
    const y2 = y + Math.sin(rad) * len;
    const bend = depth % 2 === 0 ? 6 : -6;
    const cx = (x + x2) / 2 + Math.cos(rad + Math.PI / 2) * bend;
    const cy = (y + y2) / 2 + Math.sin(rad + Math.PI / 2) * bend;
    branches.push({ d: `M${r(x)} ${r(y)}Q${r(cx)} ${r(cy)} ${r(x2)} ${r(y2)}`, depth });
    if (depth === 0) {
      leaves.push({ x: x2, y: y2, angle: angle - 25, len: 16, width: 0.34 });
      leaves.push({ x: x2, y: y2, angle: angle + 30, len: 13, width: 0.34 });
      return;
    }
    const spread = [-32, 0, 30];
    spread.forEach((s, i) => {
      if (depth === 3 && i === 1) return; // open crown above the trunk
      grow(x2, y2, angle + s + (i === 1 ? 4 : 0), len * (i === 1 ? 0.74 : 0.68), depth - 1);
    });
  };
  grow(160, 330, -90, 92, 3);
  return { branches, leaves };
}

const tree = buildTree();

export function Tree({ className = '', ...rest }) {
  return (
    <Svg viewBox="0 0 320 360" className={`decor--tree ${className}`} {...rest}>
      {/* roots */}
      <path className="draw" pathLength="1" d="M160 330C150 340 132 346 112 348M160 330C170 341 190 346 210 347M160 330C158 342 154 350 146 356M160 330C164 343 168 350 178 355" />
      {/* ground line */}
      <path className="draw" pathLength="1" d="M40 352C110 344 210 344 280 352" />
      {tree.branches.map((b, i) => (
        <path key={i} className={`draw${b.depth < 2 ? ' draw--late' : ''}`} pathLength="1" d={b.d} strokeWidth={0.6 + b.depth * 0.45} />
      ))}
      {tree.leaves.map((l, i) => (
        <Leaf key={i} {...l} />
      ))}
    </Svg>
  );
}

/* ---------- Stacked stones (cairn) on water ---------- */

const pebble = (cx, cy, w, h, tilt = 0) => {
  const top = h * 1.1;
  const bot = h * 0.8;
  return `M${r(cx - w)} ${r(cy + tilt)}C${r(cx - w)} ${r(cy - top + tilt)} ${r(cx + w)} ${r(cy - top - tilt)} ${r(cx + w)} ${r(cy - tilt)}C${r(cx + w)} ${r(cy + bot - tilt)} ${r(cx - w)} ${r(cy + bot + tilt)} ${r(cx - w)} ${r(cy + tilt)}Z`;
};

const STONES = [
  { cx: 150, cy: 262, w: 86, h: 30, tilt: 2 },
  { cx: 146, cy: 206, w: 66, h: 24, tilt: -2 },
  { cx: 152, cy: 160, w: 50, h: 20, tilt: 2 },
  { cx: 148, cy: 124, w: 36, h: 15, tilt: -1 },
  { cx: 150, cy: 97, w: 22, h: 11, tilt: 1 },
];

export function Stones({ className = '', filled = false, ...rest }) {
  return (
    <Svg viewBox="0 0 300 330" className={`decor--stones ${className}`} {...rest}>
      {STONES.map((s, i) => (
        <path key={i} className={filled ? 'decor-fill' : 'draw'} pathLength="1" d={pebble(s.cx, s.cy, s.w, s.h, s.tilt)} />
      ))}
      <path className="draw draw--late" pathLength="1" d="M30 300C80 294 220 294 270 300" />
      <path className="draw draw--late" pathLength="1" d="M70 314C110 310 190 310 230 314" />
      <path className="draw draw--late" pathLength="1" d="M110 326C130 324 170 324 190 326" />
    </Svg>
  );
}

/* ---------- Water ripples ---------- */

export function Ripples({ className = '', rings = 6, ...rest }) {
  return (
    <Svg viewBox="0 0 400 400" className={`decor--ripples ${className}`} {...rest}>
      {Array.from({ length: rings }, (_, i) => {
        const rad = 30 + i * (170 / rings);
        return <ellipse key={i} className="draw" pathLength="1" cx="200" cy="200" rx={r(rad)} ry={r(rad * 0.94)} style={{ '--i': i }} />;
      })}
    </Svg>
  );
}

/* ---------- Organic pebble shapes (filled, very soft) ---------- */

const BLOBS = [
  'M182 34C247 28 300 72 306 138S270 262 196 270 46 236 36 166 104 40 182 34Z',
  'M150 20C226 8 296 60 294 140S232 280 150 276 10 214 18 132 84 30 150 20Z',
];

export function Pebble({ variant = 0, className = '', ...rest }) {
  return (
    <Svg viewBox="0 0 340 300" className={`decor--pebble ${className}`} {...rest}>
      <path className="decor-fill" d={BLOBS[variant % BLOBS.length]} />
    </Svg>
  );
}

/* ---------- Divider: hairline with a single leaf ---------- */

export function LeafDivider({ className = '' }) {
  return (
    <div className={`leaf-divider ${className}`} aria-hidden="true">
      <span />
      <svg viewBox="0 0 60 24" className="decor" fill="none">
        <Leaf x={8} y={14} angle={-22} len={26} width={0.32} />
        <Leaf x={52} y={14} angle={202} len={26} width={0.32} />
      </svg>
      <span />
    </div>
  );
}

/* ---------- Small sprig: three leaves on a curved stem ---------- */

export function Sprig({ className = '', ...rest }) {
  return (
    <Svg viewBox="0 0 120 160" className={`decor--sprig ${className}`} {...rest}>
      <path className="draw" pathLength="1" d="M20 150C40 110 58 70 100 14" />
      <Leaf x={36} y={118} angle={-150} len={34} width={0.32} />
      <Leaf x={52} y={88} angle={-20} len={36} width={0.32} />
      <Leaf x={70} y={58} angle={-160} len={30} width={0.32} />
      <Leaf x={100} y={14} angle={-50} len={22} width={0.34} />
    </Svg>
  );
}
