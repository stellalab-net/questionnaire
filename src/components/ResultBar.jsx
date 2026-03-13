export default function ResultBar({ value, max, color }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ flex: 1, height: "5px", background: "rgba(255,255,255,0.07)", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: "3px", transition: "width 1s ease" }} />
      </div>
      <span style={{ fontSize: "11px", color: "#999", minWidth: "32px", textAlign: "right" }}>{value}/{max}</span>
    </div>
  );
}
