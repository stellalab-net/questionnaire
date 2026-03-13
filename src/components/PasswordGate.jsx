import { useState, useEffect } from "react";
import { getConfig } from "../lib/firebase";

// 폴백: Firebase 연결 실패 시 사용할 기본 해시 (stellalab2025)
const FALLBACK_HASH = "d1db1c6d3908f6025a02406f0797cefcc4e666ff71e22111999070bf4cef54c5";

async function hashPassword(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, "0")).join("");
}

export default function PasswordGate({ children }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordHash, setPasswordHash] = useState(FALLBACK_HASH);
  const [active, setActive] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    getConfig()
      .then(config => {
        if (config?.passwordHash) setPasswordHash(config.passwordHash);
        if (config?.active === false) setActive(false);
        // 세션 인증 확인
        if (sessionStorage.getItem("stella_auth") === (config?.passwordHash ?? FALLBACK_HASH)) {
          setAuthed(true);
        }
      })
      .catch(() => {
        // Firebase 실패 시 폴백 사용
        if (sessionStorage.getItem("stella_auth") === FALLBACK_HASH) setAuthed(true);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const h = await hashPassword(input);
    if (h === passwordHash) {
      sessionStorage.setItem("stella_auth", h);
      setAuthed(true);
    } else {
      setError(true);
      setInput("");
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100dvh", background: "#0C0C12", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "20px", height: "20px", border: "1px solid rgba(200,169,110,0.3)", borderTopColor: "#C8A96E", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!active) {
    return (
      <div style={{ minHeight: "100dvh", background: "#0C0C12", color: "#E8E4DC", fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "14px", color: "rgba(232,228,220,0.4)", letterSpacing: "2px" }}>현재 설문이 비활성화 상태입니다</p>
      </div>
    );
  }

  if (authed) return children;

  return (
    <div style={{
      minHeight: "100dvh", background: "#0C0C12", color: "#E8E4DC",
      fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        input { -webkit-tap-highlight-color: transparent; outline: none; }
        input::placeholder { color: rgba(232,228,220,0.3); }
        button { touch-action: manipulation; }
        @keyframes fi { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .gate-box { animation: fi 0.8s ease forwards; }
      `}</style>

      <div className="gate-box" style={{ width: "100%", maxWidth: "320px", textAlign: "center" }}>
        <div style={{ fontSize: "10px", letterSpacing: "5px", color: "#C8A96E", marginBottom: "28px", fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif", fontStyle: "italic" }}>
          STELLA LAB
        </div>
        <h2 style={{ fontSize: "18px", fontWeight: "300", letterSpacing: "3px", marginBottom: "8px", color: "#E8E4DC" }}>
          방어기제 검사
        </h2>
        <p style={{ fontSize: "12px", color: "rgba(232,228,220,0.35)", letterSpacing: "1px", marginBottom: "36px" }}>
          비공개 설문입니다
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            placeholder="비밀번호"
            autoFocus
            style={{
              background: "transparent", border: "none",
              borderBottom: `1px solid ${error ? "rgba(255,100,100,0.5)" : "rgba(200,169,110,0.3)"}`,
              padding: "12px 0", fontSize: "15px", color: "#E8E4DC",
              fontFamily: "inherit", textAlign: "center", letterSpacing: "4px",
              width: "100%", transition: "border-color 0.2s",
            }}
          />
          {error && (
            <p style={{ fontSize: "12px", color: "rgba(255,100,100,0.7)", letterSpacing: "1px" }}>
              비밀번호가 올바르지 않습니다
            </p>
          )}
          <button type="submit" style={{
            background: "transparent", border: "1px solid rgba(200,169,110,0.4)",
            color: "#C8A96E", padding: "14px", fontSize: "12px", letterSpacing: "4px",
            cursor: "pointer", fontFamily: "inherit", borderRadius: "2px",
          }}>
            확 인
          </button>
        </form>
      </div>
    </div>
  );
}
