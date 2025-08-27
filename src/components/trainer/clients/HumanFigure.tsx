export default function HumanFigure({ latest, deltas }: { latest: any; deltas: any }) {
    // Простой силуэт SVG с маркерами зон
    return (
      <div className="grid gap-3">
        <div className="relative mx-auto w-[260px]">
          <svg viewBox="0 0 120 300" className="w-full text-slate-400">
            {/* Силуэт — упрощённая фигура */}
            <path d="M60 10c10 0 18 8 18 18v14c0 6 4 11 9 14l9 6c7 5 11 13 11 22v32c0 10-6 19-15 23l-8 3v25l12 36c3 9-1 19-10 22-8 3-17-2-20-10l-8-22-8 22c-3 8-12 13-20 10-9-3-13-13-10-22l12-36v-25l-8-3c-9-4-15-13-15-23v-32c0-9 4-17 11-22l9-6c5-3 9-8 9-14V28c0-10 8-18 18-18z" fill="currentColor" fillOpacity="0.15" />
  
            {/* Метки: грудь, талия, бёдра, бицепс, бедро, вес */}
            {label(60, 85, `Грудь: ${fmt(latest?.chest)}`, deltas?.chest)}
            {label(60, 115, `Талия: ${fmt(latest?.waist)}`, deltas?.waist)}
            {label(60, 145, `Бёдра: ${fmt(latest?.hips)}`, deltas?.hips)}
            {label(30, 110, `Бицепс: ${fmt(latest?.bicepsR)}`, deltas?.bicepsR)}
            {label(60, 215, `Бедро: ${fmt(latest?.thighR)}`, deltas?.thighR)}
            {label(60, 35, `Вес: ${fmt(latest?.weightKg)} кг`, deltas?.weightKg)}
          </svg>
        </div>
        <div className="text-xs text-slate-500">Серые значения — последние замеры. Зелёным/красным показываем разницу к первым замерам (будет, когда появятся данные).</div>
      </div>
    );
  }
  
  function label(x: number, y: number, text: string, delta?: string | null) {
    const dy = 0;
    const deltaNum = delta != null ? Number(delta) : null;
    const deltaText = deltaNum != null && !Number.isNaN(deltaNum) ? (deltaNum > 0 ? ` (+${deltaNum})` : ` (${deltaNum})`) : "";
    const deltaColor = deltaNum == null ? "#94a3b8" : deltaNum > 0 ? "#ef4444" : "#22c55e"; // +красный, -зелёный
    return (
      <g>
        <circle cx={x} cy={y} r="2" fill="#94a3b8" />
        <text x={x + 6} y={y + dy} fontSize="6" fill="#94a3b8">{text}
          <tspan fill={deltaColor}>{deltaText}</tspan>
        </text>
      </g>
    );
  }
  
  function fmt(v?: number | null) {
    return v != null ? `${v.toFixed(1)} см` : "—";
  }