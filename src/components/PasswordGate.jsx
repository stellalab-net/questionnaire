import { useState } from "react";

// 비밀번호 변경: PASSWORD_HASH를 아래 방법으로 생성
// 브라우저 콘솔에서: crypto.subtle.digest('SHA-256', new TextEncoder().encode('새비밀번호'))
//   .then(b => console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
// 현재 비밀번호: stellalab2025
const PASSWORD_HASH = "a4c4da568fe9b8e0f1f5c3be65aa7c620a9e3a9ed58a3c69e76b47cb2aade11b";

async function hashPassword(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, "0")).join("");
}

export default function PasswordGate({ children }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("stella_auth") === PASSWORD_HASH
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const h = await hashPassword(input);
    if (h === PASSWORD_HASH) {
      sessionStorage.setItem("stella_auth", h);
      setAuthed(true);
    } else {
      setError(true);
      setInput("");
    }
  }

  if (authed) return children;

  return (
    <div style={{
      minHeight: "100dvh", background: "#0C0C12", color: "#E8E4DC",
      fontFamily: "'Noto Serif KR', Georgia, serif",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400&family=Cormorant+Garamond:ital,wght@1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        input { -webkit-tap-highlight-color: transparent; outline: none; }
        input::placeholder { color: rgba(232,228,220,0.3); }
        button { touch-action: manipulation; }
        @keyframes fi { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .gate-box { animation: fi 0.8s ease forwards; }
      `}</style>

      <div className="gate-box" style={{ width: "100%", maxWidth: "320px", textAlign: "center" }}>
        <div style={{ fontSize: "10px", letterSpacing: "5px", color: "#C8A96E", marginBottom: "28px", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
          STELLA LAB
        </div>

        <h2 style={{ fontSize: "18px", fontWeight: "300", letterSpacing: "3px", marginBottom: "8px" }}>
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
              background: "transparent",
              border: "none",
              borderBottom: `1px solid ${error ? "rgba(255,100,100,0.5)" : "rgba(200,169,110,0.3)"}`,
              padding: "12px 0",
              fontSize: "15px",
              color: "#E8E4DC",
              fontFamily: "inherit",
              textAlign: "center",
              letterSpacing: "4px",
              width: "100%",
              transition: "border-color 0.2s",
            }}
          />
          {error && (
            <p style={{ fontSize: "12px", color: "rgba(255,100,100,0.7)", letterSpacing: "1px" }}>
              비밀번호가 올바르지 않습니다
            </p>
          )}
          <button type="submit"
            style={{
              background: "transparent",
              border: "1px solid rgba(200,169,110,0.4)",
              color: "#C8A96E",
              padding: "14px",
              fontSize: "12px",
              letterSpacing: "4px",
              cursor: "pointer",
              fontFamily: "inherit",
              borderRadius: "2px",
              transition: "border-color 0.2s",
            }}>
            확 인
          </button>
        </form>
      </div>
    </div>
  );
}
