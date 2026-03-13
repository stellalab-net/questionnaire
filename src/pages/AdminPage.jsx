import { useState, useEffect } from "react";
import { getConfig, setConfig, getResponses } from "../lib/firebase";

// 관리자 접근 비밀번호 (이 값은 코드 변경으로만 수정 가능)
const ADMIN_PASSWORD = "prota123";

async function hashPassword(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, "0")).join("");
}

const btn = (color = "#C8A96E") => ({
  background: "transparent",
  border: `1px solid ${color}`,
  color,
  padding: "13px",
  fontSize: "12px",
  letterSpacing: "3px",
  cursor: "pointer",
  fontFamily: "inherit",
  borderRadius: "2px",
  width: "100%",
  transition: "opacity 0.2s",
});

const input = (borderColor = "rgba(200,169,110,0.3)") => ({
  background: "transparent", border: "none",
  borderBottom: `1px solid ${borderColor}`,
  padding: "10px 0", fontSize: "14px", color: "#E8E4DC",
  fontFamily: "inherit", width: "100%",
});

export default function AdminPage() {
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [adminError, setAdminError] = useState(false);

  const [config, setConfigState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [saved, setSaved] = useState("");
  const [responses, setResponses] = useState([]);
  const [responsesLoading, setResponsesLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    document.title = "관리자 · STELLA LAB";
    return () => { document.title = "방어기제 검사 · STELLA LAB"; };
  }, []);

  useEffect(() => {
    if (!adminAuthed) return;
    setLoading(true);
    getConfig()
      .then(c => setConfigState(c ?? { passwordHash: "", active: true }))
      .finally(() => setLoading(false));
    setResponsesLoading(true);
    getResponses()
      .then(setResponses)
      .finally(() => setResponsesLoading(false));
  }, [adminAuthed]);

  function handleAdminLogin(e) {
    e.preventDefault();
    if (adminInput === ADMIN_PASSWORD) {
      setAdminAuthed(true);
    } else {
      setAdminError(true);
      setAdminInput("");
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPwError("");
    if (!newPw) { setPwError("새 비밀번호를 입력해주세요"); return; }
    if (newPw !== confirmPw) { setPwError("비밀번호가 일치하지 않습니다"); return; }
    if (newPw.length < 4) { setPwError("4자 이상 입력해주세요"); return; }

    setLoading(true);
    const hash = await hashPassword(newPw);
    const next = { ...config, passwordHash: hash };
    await setConfig(next);
    setConfigState(next);
    setNewPw("");
    setConfirmPw("");
    setSaved("비밀번호가 변경되었습니다");
    setLoading(false);
    setTimeout(() => setSaved(""), 3000);
  }

  async function toggleActive() {
    setLoading(true);
    const next = { ...config, active: !config.active };
    await setConfig(next);
    setConfigState(next);
    setSaved(next.active ? "설문이 활성화되었습니다" : "설문이 비활성화되었습니다");
    setLoading(false);
    setTimeout(() => setSaved(""), 3000);
  }

  const base = {
    minHeight: "100dvh", background: "#0C0C12", color: "#E8E4DC",
    fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "24px",
  };

  const css = `
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
    @font-face { font-family: 'SeoulNotice'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2505-1@1.0/SeoulAlrimTTF-Bold.woff2') format('woff2'); font-weight: 700; font-display: swap; }
    @font-face { font-family: 'SeoulNotice'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2505-1@1.0/SeoulAlrimTTF-Heavy.woff2') format('woff2'); font-weight: 900; font-display: swap; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    input { -webkit-tap-highlight-color: transparent; outline: none; }
    input::placeholder { color: rgba(232,228,220,0.3); }
    button { touch-action: manipulation; }
    @keyframes fi { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
    .admin-box { animation: fi 0.6s ease forwards; }
  `;

  // ── 관리자 로그인 ───────────────────────────────────
  if (!adminAuthed) {
    return (
      <div style={base}>
        <style>{css}</style>
        <div className="admin-box" style={{ width: "100%", maxWidth: "320px", textAlign: "center" }}>
          <div style={{ fontSize: "10px", letterSpacing: "5px", color: "#C8A96E", marginBottom: "28px", fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif", fontStyle: "italic" }}>
            STELLA LAB · ADMIN
          </div>
          <h2 style={{ fontSize: "16px", fontWeight: "900", letterSpacing: "1px", marginBottom: "32px", color: "#E8E4DC", fontFamily: "'SeoulNotice', sans-serif" }}>관리자 인증</h2>
          <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="password" value={adminInput}
              onChange={e => { setAdminInput(e.target.value); setAdminError(false); }}
              placeholder="관리자 비밀번호" autoFocus
              style={{ ...input(adminError ? "rgba(255,100,100,0.5)" : "rgba(200,169,110,0.3)"), textAlign: "center", letterSpacing: "3px" }}
            />
            {adminError && <p style={{ fontSize: "12px", color: "rgba(255,100,100,0.7)" }}>비밀번호가 올바르지 않습니다</p>}
            <button type="submit" style={btn()}>로 그 인</button>
          </form>
        </div>
      </div>
    );
  }

  // ── 관리 패널 ───────────────────────────────────────
  return (
    <div style={{ ...base, alignItems: "flex-start" }}>
      <style>{css}</style>
      <div className="admin-box" style={{ width: "100%", maxWidth: "400px", margin: "0 auto", paddingTop: "40px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "5px", color: "#C8A96E", marginBottom: "8px", fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif", fontStyle: "italic" }}>
          STELLA LAB · ADMIN
        </div>
        <h1 style={{ fontSize: "18px", fontWeight: "900", letterSpacing: "1px", marginBottom: "32px", color: "#E8E4DC", fontFamily: "'SeoulNotice', sans-serif" }}>설문 관리</h1>

        {saved && (
          <div style={{ background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: "4px", padding: "12px", marginBottom: "20px", fontSize: "13px", color: "#C8A96E", textAlign: "center" }}>
            {saved}
          </div>
        )}

        {/* 설문 ON/OFF */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px", padding: "20px", marginBottom: "16px" }}>
          <p style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(232,228,220,0.4)", marginBottom: "12px" }}>설문 상태</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ fontSize: "14px" }}>
              현재 상태:{" "}
              <span style={{ color: config?.active ? "#C8A96E" : "rgba(255,100,100,0.7)" }}>
                {config?.active ? "활성화" : "비활성화"}
              </span>
            </span>
          </div>
          <button onClick={toggleActive} disabled={loading} style={btn(config?.active ? "rgba(255,100,100,0.5)" : "#C8A96E")}>
            {config?.active ? "설문 비활성화" : "설문 활성화"}
          </button>
        </div>

        {/* 비밀번호 변경 */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px", padding: "20px" }}>
          <p style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(232,228,220,0.4)", marginBottom: "20px" }}>비밀번호 변경</p>
          <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <input
              type="password" value={newPw}
              onChange={e => { setNewPw(e.target.value); setPwError(""); }}
              placeholder="새 비밀번호"
              style={input()}
            />
            <input
              type="password" value={confirmPw}
              onChange={e => { setConfirmPw(e.target.value); setPwError(""); }}
              placeholder="새 비밀번호 확인"
              style={input()}
            />
            {pwError && <p style={{ fontSize: "12px", color: "rgba(255,100,100,0.7)" }}>{pwError}</p>}
            <button type="submit" disabled={loading} style={btn()}>
              {loading ? "저장 중..." : "비밀번호 변경"}
            </button>
          </form>
        </div>

        <p style={{ marginTop: "24px", fontSize: "10px", color: "rgba(232,228,220,0.2)", textAlign: "center", letterSpacing: "1px" }}>
          변경 사항은 즉시 반영됩니다 · 재배포 불필요
        </p>

        {/* 응답 목록 */}
        <div style={{ marginTop: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(232,228,220,0.4)" }}>응답 목록</p>
            <span style={{ fontSize: "10px", color: "rgba(200,169,110,0.5)" }}>{responses.length}건</span>
          </div>

          {responsesLoading ? (
            <div style={{ textAlign: "center", padding: "24px", color: "rgba(232,228,220,0.2)", fontSize: "12px" }}>불러오는 중...</div>
          ) : responses.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px", color: "rgba(232,228,220,0.2)", fontSize: "12px" }}>응답 데이터가 없습니다</div>
          ) : responses.map(r => {
            const isOpen = expandedId === r.id;
            const typeColor = r.dominantType === "성숙형" ? "#C8A96E" : r.dominantType === "신경증형" ? "#7E9EBF" : "#A07BBF";
            const date = new Date(r.submittedAt);
            const dateStr = `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,"0")}.${String(date.getDate()).padStart(2,"0")} ${String(date.getHours()).padStart(2,"0")}:${String(date.getMinutes()).padStart(2,"0")}`;
            return (
              <div key={r.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px", marginBottom: "8px", overflow: "hidden" }}>
                {/* 행 헤더 */}
                <div onClick={() => setExpandedId(isOpen ? null : r.id)}
                  style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "14px", color: "#E8E4DC", fontFamily: "'SeoulNotice', sans-serif", fontWeight: 900 }}>
                        {r.name || "익명"}
                      </span>
                      {(r.age || r.gender) && (
                        <span style={{ fontSize: "11px", color: "rgba(232,228,220,0.35)" }}>
                          {r.age}{r.age && r.gender ? " · " : ""}{r.gender}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "10px", color: "rgba(232,228,220,0.25)", letterSpacing: "0.5px" }}>{dateStr}</div>
                  </div>
                  <span style={{ fontSize: "12px", color: typeColor, letterSpacing: "1px", whiteSpace: "nowrap" }}>{r.dominantType}</span>
                  <span style={{ fontSize: "10px", color: "rgba(232,228,220,0.25)", marginLeft: "4px" }}>{isOpen ? "▲" : "▼"}</span>
                </div>

                {/* 펼치기 */}
                {isOpen && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "16px" }}>
                    {/* 유형별 점수 */}
                    <p style={{ fontSize: "9px", letterSpacing: "3px", color: "rgba(232,228,220,0.3)", marginBottom: "10px" }}>유형별 점수</p>
                    {[
                      { label: "성숙형", key: "mature", color: "#C8A96E" },
                      { label: "신경증형", key: "neurotic", color: "#7E9EBF" },
                      { label: "미성숙형", key: "immature", color: "#A07BBF" },
                    ].map(t => (
                      <div key={t.key} style={{ marginBottom: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ fontSize: "11px", color: t.color }}>{t.label}</span>
                          <span style={{ fontSize: "11px", color: "rgba(232,228,220,0.4)", fontFamily: "'Pretendard', sans-serif" }}>{r.scores?.[t.key]?.pct ?? "-"}%</span>
                        </div>
                        <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                          <div style={{ width: `${r.scores?.[t.key]?.pct ?? 0}%`, height: "100%", background: t.color, borderRadius: "2px" }} />
                        </div>
                      </div>
                    ))}

                    {/* 메커니즘별 점수 */}
                    {r.mechanisms && (
                      <>
                        <p style={{ fontSize: "9px", letterSpacing: "3px", color: "rgba(232,228,220,0.3)", marginTop: "16px", marginBottom: "10px" }}>메커니즘별 점수</p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                          {Object.values(r.mechanisms).map(m => (
                            <div key={m.name} style={{ background: "rgba(255,255,255,0.02)", borderRadius: "3px", padding: "8px 10px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <span style={{ fontSize: "11px", color: "rgba(232,228,220,0.6)" }}>{m.name}</span>
                                <span style={{ fontSize: "10px", color: "rgba(232,228,220,0.35)", fontFamily: "'Pretendard', sans-serif" }}>{m.score}/{m.max}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
