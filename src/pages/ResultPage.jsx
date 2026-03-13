import { SCALES } from "../data/scales";
import ResultBar from "../components/ResultBar";

function computeResults(answers) {
  const res = {};
  for (const sk of Object.keys(SCALES)) {
    const scale = SCALES[sk];
    res[sk] = { total: 0, max: 0, mechanisms: {} };
    for (const m of scale.mechanisms) {
      const scores = m.items.map(i => answers[i.id] || 0);
      const sum = scores.reduce((a, b) => a + b, 0);
      const max = m.items.length * 5;
      res[sk].mechanisms[m.id] = { score: sum, max, name: m.name, pct: Math.round((sum / max) * 100) };
      res[sk].total += sum;
      res[sk].max += max;
    }
  }
  return res;
}

export default function ResultPage({ answers, name, age, gender, onRetry }) {
  const results = computeResults(answers);
  const sectionKeys = Object.keys(SCALES);

  const maturePct   = Math.round((results.mature.total   / results.mature.max)   * 100);
  const neuroticPct = Math.round((results.neurotic.total / results.neurotic.max) * 100);
  const immaturePct = Math.round((results.immature.total / results.immature.max) * 100);

  const dominantType  = maturePct >= neuroticPct && maturePct >= immaturePct ? "성숙형" : neuroticPct >= immaturePct ? "신경증형" : "미성숙형";
  const dominantColor = dominantType === "성숙형" ? "#C8A96E" : dominantType === "신경증형" ? "#7E9EBF" : "#A07BBF";

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "44px 16px 72px" }}>
      {/* Header */}
      <div className="rc" style={{ animationDelay: "0s", textAlign: "center", marginBottom: "36px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#C8A96E", marginBottom: "14px" }}>STELLA LAB · 방어기제 검사 결과</div>
        {name && (
          <div style={{ fontSize: "17px", marginBottom: "6px", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
            {name}{age ? ` (${age})` : ""}{gender ? ` · ${gender}` : ""}
          </div>
        )}
        <p style={{ fontSize: "12px", fontWeight: 300, color: "rgba(232,228,220,0.4)", letterSpacing: "2px", marginBottom: "8px" }}>우세 유형</p>
        <div style={{ fontSize: "36px", fontWeight: "300", color: dominantColor, letterSpacing: "4px" }}>{dominantType}</div>
      </div>

      {/* Overview bars */}
      <div className="rc" style={{ animationDelay: "0.12s", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", padding: "22px 20px", marginBottom: "16px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(232,228,220,0.35)", marginBottom: "18px" }}>전체 구조</p>
        {[
          { label: "성숙형", pct: maturePct, color: "#C8A96E" },
          { label: "신경증형", pct: neuroticPct, color: "#7E9EBF" },
          { label: "미성숙형", pct: immaturePct, color: "#A07BBF" },
        ].map(t => (
          <div key={t.label} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "13px", color: t.color, letterSpacing: "1px" }}>{t.label}</span>
              <span style={{ fontSize: "13px", fontFamily: "Cormorant Garamond, serif", color: "rgba(232,228,220,0.55)" }}>{t.pct}%</span>
            </div>
            <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: `${t.pct}%`, height: "100%", background: t.color, borderRadius: "2px", transition: "width 1.2s ease" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Detail cards */}
      {sectionKeys.map((sk, si) => {
        const scale = SCALES[sk];
        const res = results[sk];
        return (
          <div key={sk} className="rc" style={{ animationDelay: `${0.18 + si * 0.08}s`, background: scale.bg, border: `1px solid ${scale.color}22`, borderRadius: "6px", padding: "20px", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "13px", color: scale.color, letterSpacing: "2px" }}>{scale.label}</span>
              <span style={{ fontSize: "11px", color: "rgba(232,228,220,0.3)" }}>{Math.round((res.total / res.max) * 100)}%</span>
            </div>
            {Object.values(res.mechanisms).map(m => (
              <div key={m.name} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "13px", color: "rgba(232,228,220,0.75)" }}>{m.name}</span>
                  <span style={{ fontSize: "11px", fontFamily: "Cormorant Garamond, serif", color: "rgba(232,228,220,0.4)" }}>{m.score}/{m.max}</span>
                </div>
                <ResultBar value={m.score} max={m.max} color={scale.color} />
              </div>
            ))}
          </div>
        );
      })}

      {/* Interpretation */}
      <div className="rc" style={{ animationDelay: "0.45s", padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "6px", marginTop: "4px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "3px", color: "#C8A96E", marginBottom: "12px" }}>해석 안내</p>
        <p style={{ fontSize: "13px", lineHeight: 1.95, color: "rgba(232,228,220,0.5)" }}>
          성숙형 방어기제(승화·유머·억제 등)는 갈등을 건강하게 전환하는 기제이며, 신경증형(합리화·지성화·반동형성 등)은 중간 수준의 심리적 비용을 치르는 기제입니다. 미성숙형(투사·행동화·부정 등)은 왜곡 수준이 높아 대인관계와 심리적 적응에 어려움을 줄 수 있습니다. 이 결과는 상담 전문가와의 심층 해석을 권장합니다.
        </p>
      </div>

      {/* Retry */}
      <div style={{ textAlign: "center", marginTop: "36px" }}>
        <button onClick={onRetry}
          style={{ width: "100%", padding: "15px", background: "transparent", border: "1px solid rgba(200,169,110,0.25)", color: "rgba(200,169,110,0.55)", fontSize: "12px", letterSpacing: "3px", cursor: "pointer", fontFamily: "inherit", borderRadius: "2px" }}>
          다시 검사하기
        </button>
        <div style={{ marginTop: "20px", fontSize: "10px", letterSpacing: "2px", color: "rgba(232,228,220,0.18)" }}>STELLA LAB · 명리 × 심리</div>
      </div>
    </div>
  );
}
