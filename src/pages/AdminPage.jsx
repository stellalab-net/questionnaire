import { useState, useEffect } from "react";
import { getConfig, setConfig } from "../lib/firebase";

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

  useEffect(() => {
    if (!adminAuthed) return;
    setLoading(true);
    getConfig()
      .then(c => setConfigState(c ?? { passwordHash: "", active: true }))
      .finally(() => setLoading(false));
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
          <h2 style={{ fontSize: "16px", fontWeight: "900", letterSpacing: "3px", marginBottom: "32px", color: "#E8E4DC", fontFamily: "'SeoulNotice', sans-serif" }}>관리자 인증</h2>
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
        <h1 style={{ fontSize: "18px", fontWeight: "900", letterSpacing: "2px", marginBottom: "32px", color: "#E8E4DC", fontFamily: "'SeoulNotice', sans-serif" }}>설문 관리</h1>

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
      </div>
    </div>
  );
}
