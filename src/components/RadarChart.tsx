import React, { useState } from 'react';

interface RadarAxis {
  label: string;
  value: number; // 0 to 100
  subtext?: string;
}

interface RadarChartProps {
  axes: RadarAxis[];
  size?: number;
  theme?: 'dark' | 'light';
}

export const RadarChart: React.FC<RadarChartProps> = ({ axes, size = 320, theme = 'dark' }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const center = size / 2;
  const radius = (size / 2) - 48; // padding for labels
  const totalAxes = axes.length;
  const angleSlice = (Math.PI * 2) / totalAxes;

  // Concentric polygon levels: 25%, 50%, 75%, 100%
  const levels = [0.25, 0.5, 0.75, 1];

  // Helper to compute (x, y) coordinates
  const getCoordinates = (value: number, index: number, maxVal = 100) => {
    const angle = angleSlice * index - Math.PI / 2;
    const r = (value / maxVal) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Build the patient data polygon points string
  const patientPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(axis.value, i);
      return `${x},${y}`;
    })
    .join(' ');

  // Standard normative healthy baseline (e.g. 20% limit)
  const baselinePoints = axes
    .map((_, i) => {
      const { x, y } = getCoordinates(20, i);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative flex flex-col items-center select-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        aria-label="مخطط راداري للأبعاد السريرية والبيئية"
      >
        <defs>
          <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Concentric Web Grid Polygons */}
        {levels.map((level) => {
          const points = axes
            .map((_, i) => {
              const { x, y } = getCoordinates(level * 100, i);
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <g key={level}>
              <polygon
                points={points}
                fill="none"
                stroke={theme === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}
                strokeWidth="1"
                strokeDasharray={level < 1 ? '3 3' : 'none'}
              />
              {/* Level label */}
              <text
                x={center}
                y={center - level * radius + 10}
                fill={theme === 'dark' ? "rgba(148, 163, 184, 0.5)" : "rgba(100, 116, 139, 0.5)"}
                fontSize="9"
                textAnchor="middle"
                className="font-mono"
              >
                {Math.round(level * 100)}%
              </text>
            </g>
          );
        })}

        {/* Radial Axis Spokes */}
        {axes.map((_, i) => {
          const { x, y } = getCoordinates(100, i);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={theme === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"}
              strokeWidth="1"
            />
          );
        })}

        {/* Normative Healthy Boundary Polygon (20%) */}
        <polygon
          points={baselinePoints}
          fill="rgba(16, 185, 129, 0.04)"
          stroke="rgba(16, 185, 129, 0.35)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Patient Score Polygon */}
        <polygon
          points={patientPoints}
          fill="url(#radarFill)"
          stroke="#a855f7"
          strokeWidth="2.5"
          className="transition-all duration-300"
        />

        {/* Axis Points and Clickable Hover Targets */}
        {axes.map((axis, i) => {
          const { x, y } = getCoordinates(axis.value, i);
          const isHovered = hoveredIdx === i;

          return (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 7 : 5}
                fill="#6366f1"
                stroke="#ffffff"
                strokeWidth={isHovered ? 2.5 : 1.5}
                className="transition-all duration-150"
              />
            </g>
          );
        })}

        {/* Axis Outer Text Labels */}
        {axes.map((axis, i) => {
          const labelDist = radius + 24;
          const angle = angleSlice * i - Math.PI / 2;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          const isHovered = hoveredIdx === i;

          return (
            <g key={i}>
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isHovered ? (theme === 'dark' ? '#f8fafc' : '#0f172a') : (theme === 'dark' ? '#cbd5e1' : '#475569')}
                fontSize="11"
                fontWeight={isHovered ? '700' : '600'}
                className="transition-colors duration-150 select-none"
              >
                {axis.label}
              </text>
              <text
                x={lx}
                y={ly + 13}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isHovered ? '#a855f7' : (theme === 'dark' ? '#94a3b8' : '#64748b')}
                fontSize="10"
                className="font-mono tabular-nums"
              >
                {axis.value}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend below the radar */}
      <div className={`flex items-center gap-5 mt-2 text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-500/80 inline-block"></span>
          <span>درجة الملف المفحوص</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-3 h-0.5 bg-emerald-400 border-b border-dashed border-emerald-400 inline-block`}></span>
          <span>الحد السوي (≤ 20%)</span>
        </div>
      </div>
    </div>
  );
};
