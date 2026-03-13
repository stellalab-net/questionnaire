import { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { SCALES } from "../data/scales";
import ResultBar from "../components/ResultBar";
import { saveResponse } from "../lib/firebase";

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
  const captureRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const results = computeResults(answers);
  const sectionKeys = Object.keys(SCALES);

  const maturePct   = Math.round((results.mature.total   / results.mature.max)   * 100);
  const neuroticPct = Math.round((results.neurotic.total / results.neurotic.max) * 100);
  const immaturePct = Math.round((results.immature.total / results.immature.max) * 100);

  const dominantType  = maturePct >= neuroticPct && maturePct >= immaturePct ? "성숙형" : neuroticPct >= immaturePct ? "신경증형" : "미성숙형";
  const dominantColor = dominantType === "성숙형" ? "#C8A96E" : dominantType === "신경증형" ? "#7E9EBF" : "#A07BBF";

  const savedRef = useRef(false);
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;
    const mechanisms = {};
    for (const sk of Object.keys(results)) {
      for (const [mk, mv] of Object.entries(results[sk].mechanisms)) {
        mechanisms[mk] = { name: mv.name, score: mv.score, max: mv.max, pct: mv.pct };
      }
    }
    saveResponse({
      name: name || "",
      age: age || "",
      gender: gender || "",
      dominantType,
      scores: {
        mature:   { pct: maturePct },
        neurotic: { pct: neuroticPct },
        immature: { pct: immaturePct },
      },
      mechanisms,
    }).catch(e => console.error("[saveResponse]", e));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSaveImage() {
    if (!captureRef.current) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(captureRef.current, {
        backgroundColor: "#0C0C12",
        pixelRatio: 2,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `방어기제검사_${name || "결과"}.png`;
      a.click();
      setShowShare(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "44px 16px 72px" }}>
    <div ref={captureRef} style={{ padding: "32px 16px", background: "#0C0C12" }}>
      {/* Header */}
      <div className="rc" style={{ animationDelay: "0s", textAlign: "center", marginBottom: "36px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#C8A96E", marginBottom: "14px" }}>STELLA LAB · 방어기제 검사 결과</div>
        {name && (
          <div style={{ fontSize: "17px", marginBottom: "6px", fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif", fontStyle: "italic" }}>
            {name}{age ? ` (${age})` : ""}{gender ? ` · ${gender}` : ""}
          </div>
        )}
        <p style={{ fontSize: "12px", fontWeight: 300, color: "rgba(232,228,220,0.4)", letterSpacing: "2px", marginBottom: "8px" }}>우세 유형</p>
        <div style={{ fontSize: "36px", fontWeight: "900", color: dominantColor, letterSpacing: "1px", fontFamily: "'SeoulNotice', sans-serif" }}>{dominantType}</div>
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
              <span style={{ fontSize: "13px", fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif", color: "rgba(232,228,220,0.55)" }}>{t.pct}%</span>
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
                  <span style={{ fontSize: "11px", fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif", color: "rgba(232,228,220,0.4)" }}>{m.score}/{m.max}</span>
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
        {name && (
          <p style={{ fontSize: "15px", fontWeight: "900", color: "#E8E4DC", letterSpacing: "0.5px", marginBottom: "12px", fontFamily: "'SeoulNotice', sans-serif" }}>
            {name}님의 우세 유형은 <span style={{ color: dominantColor }}>{dominantType}</span>입니다.
          </p>
        )}
        <p style={{ fontSize: "13px", lineHeight: 1.95, color: "rgba(232,228,220,0.5)" }}>
          성숙형 방어기제(승화·유머·억제 등)는 갈등을 건강하게 전환하는 기제이며, 신경증형(합리화·지성화·반동형성 등)은 중간 수준의 심리적 비용을 치르는 기제입니다. 미성숙형(투사·행동화·부정 등)은 왜곡 수준이 높아 대인관계와 심리적 적응에 어려움을 줄 수 있습니다. 이 결과는 상담 전문가와의 심층 해석을 권장합니다.
        </p>
      </div>

      {/* Footer inside capture */}
      <div style={{ marginTop: "28px", padding: "16px 0 4px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <div style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(200,169,110,0.4)", marginBottom: "8px" }}>STELLA LAB · 명리 × 심리</div>
        <div style={{ fontSize: "10px", color: "rgba(232,228,220,0.3)", letterSpacing: "0.5px" }}>
          이 결과는 상담 전문가와의 심층 해석을 권장합니다
        </div>
        <div style={{ marginTop: "6px", fontSize: "9px", color: "rgba(200,169,110,0.3)", letterSpacing: "1px" }}>
          Instagram @stellalab.i &nbsp;·&nbsp; Naver stlab_i
        </div>
      </div>
    </div>

      {/* Buttons outside capture */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "24px" }}>
        <button onClick={handleSaveImage} disabled={saving}
          style={{ width: "100%", padding: "15px", background: "transparent", border: "1px solid rgba(200,169,110,0.4)", color: "#C8A96E", fontSize: "12px", letterSpacing: "3px", cursor: "pointer", fontFamily: "inherit", borderRadius: "2px" }}>
          {saving ? "저장 중..." : "이미지로 저장"}
        </button>
        <button onClick={onRetry}
          style={{ width: "100%", padding: "15px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(232,228,220,0.35)", fontSize: "12px", letterSpacing: "3px", cursor: "pointer", fontFamily: "inherit", borderRadius: "2px" }}>
          다시 검사하기
        </button>
      </div>

      {/* Save complete modal */}
      {showShare && (
        <div onClick={() => setShowShare(false)} style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(12,12,18,0.85)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px", animation: "fadeIn 0.25s ease",
        }}>
          <style>{`@keyframes fadeIn { from { opacity:0; } to { opacity:1; } } @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
          <div onClick={e => e.stopPropagation()} style={{
            width: "100%", maxWidth: "320px", background: "#13131A",
            border: "1px solid rgba(200,169,110,0.2)", borderRadius: "8px",
            padding: "36px 28px 28px", textAlign: "center",
            animation: "slideUp 0.3s ease",
          }}>
            <div style={{ fontSize: "9px", letterSpacing: "4px", color: "rgba(200,169,110,0.5)", marginBottom: "20px" }}>STELLA LAB</div>
            <div style={{ fontSize: "22px", marginBottom: "8px" }}>✓</div>
            <p style={{ fontSize: "14px", color: "#E8E4DC", letterSpacing: "1px", marginBottom: "6px" }}>이미지가 저장되었습니다</p>
            <p style={{ fontSize: "12px", color: "rgba(232,228,220,0.35)", marginBottom: "32px", lineHeight: 1.7 }}>
              상담 전문가와 함께 심층 해석을<br />받아보세요
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              <a href="https://www.instagram.com/stellalab.i/" target="_blank" rel="noopener noreferrer"
                style={{ display: "block", padding: "13px", border: "1px solid rgba(200,169,110,0.35)", borderRadius: "2px", color: "#C8A96E", fontSize: "12px", letterSpacing: "2px", textDecoration: "none" }}>
                Instagram &nbsp;@stellalab.i
              </a>
              <a href="mailto:stlab_i@naver.com"
                style={{ display: "block", padding: "13px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px", color: "rgba(232,228,220,0.5)", fontSize: "12px", letterSpacing: "2px", textDecoration: "none" }}>
                Naver 메일 &nbsp;stlab_i
              </a>
            </div>

            <button onClick={() => setShowShare(false)}
              style={{ background: "transparent", border: "none", color: "rgba(232,228,220,0.25)", fontSize: "11px", letterSpacing: "2px", cursor: "pointer", fontFamily: "inherit" }}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
