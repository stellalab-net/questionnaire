export default function IntroPage({ name, setName, age, setAge, gender, setGender, total, onStart }) {
  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "48px 24px 64px", textAlign: "center", position: "relative" }}>

      {/* 배경 방사형 글로우 */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "400px", height: "400px", background: "radial-gradient(circle at center, rgba(200,169,110,0.07) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

      {/* 히어로 영역 */}
      <div className="fi" style={{ animationDelay: "0s", marginBottom: "44px", position: "relative", zIndex: 1 }}>

        {/* 브랜드 레이블 */}
        <div style={{ fontSize: "9px", letterSpacing: "8px", color: "rgba(200,169,110,0.55)", marginBottom: "32px", fontFamily: "'Pretendard', sans-serif", textTransform: "uppercase" }}>
          STELLA LAB
        </div>

        {/* 대형 오비탈 SVG */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: "32px" }}>
          {/* 외부 글로우 레이어 */}
          <div style={{ position: "absolute", inset: "-20px", background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="64" fill="none" stroke="rgba(200,169,110,0.08)" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="70" cy="70" r="52" fill="none" stroke="rgba(200,169,110,0.18)" strokeWidth="0.8" />
            <circle cx="70" cy="70" r="36" fill="none" stroke="rgba(200,169,110,0.32)" strokeWidth="0.8" />
            <circle cx="70" cy="70" r="22" fill="none" stroke="rgba(200,169,110,0.5)" strokeWidth="0.8" />
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              return <circle key={i} cx={70 + 52 * Math.sin(rad)} cy={70 - 52 * Math.cos(rad)} r="1.5" fill="rgba(200,169,110,0.35)" />;
            })}
            {[45, 135, 225, 315].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              return <circle key={i} cx={70 + 36 * Math.sin(rad)} cy={70 - 36 * Math.cos(rad)} r="1.2" fill="rgba(200,169,110,0.4)" />;
            })}
            <line x1="70" y1="34" x2="70" y2="106" stroke="rgba(200,169,110,0.06)" strokeWidth="0.5" />
            <line x1="34" y1="70" x2="106" y2="70" stroke="rgba(200,169,110,0.06)" strokeWidth="0.5" />
            <g className="orb" style={{ transformOrigin: "70px 70px" }}>
              <circle cx="70" cy="18" r="3.5" fill="#C8A96E" />
              <circle cx="70" cy="18" r="6" fill="rgba(200,169,110,0.15)" />
            </g>
            <g style={{ animation: "orb 32s linear infinite reverse", transformOrigin: "70px 70px" }}>
              <circle cx="106" cy="70" r="2.5" fill="rgba(200,169,110,0.7)" />
            </g>
            <circle cx="70" cy="70" r="5" fill="#C8A96E" opacity="0.9" />
            <circle cx="70" cy="70" r="10" fill="rgba(200,169,110,0.12)" />
          </svg>
        </div>

        {/* 타이틀 */}
        <h1 style={{ fontSize: "30px", fontWeight: "900", letterSpacing: "1px", lineHeight: 1.3, marginBottom: "10px", color: "#E8E4DC", fontFamily: "'SeoulNotice', sans-serif" }}>
          방어기제 검사
        </h1>
        <div style={{ fontSize: "11px", color: "rgba(200,169,110,0.55)", letterSpacing: "4px", fontFamily: "'Pretendard', sans-serif", marginBottom: "20px" }}>
          Defense Mechanism Questionnaire
        </div>

        {/* 장식 구분선 */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
          <div style={{ width: "48px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.4))" }} />
          <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#C8A96E", opacity: 0.7 }} />
          <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#C8A96E", opacity: 0.4 }} />
          <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#C8A96E", opacity: 0.7 }} />
          <div style={{ width: "48px", height: "1px", background: "linear-gradient(270deg, transparent, rgba(200,169,110,0.4))" }} />
        </div>
      </div>

      {/* 설명 카드 */}
      <div className="fi" style={{ animationDelay: "0.25s", background: "rgba(200,169,110,0.04)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: "8px", padding: "24px 22px", marginBottom: "16px", textAlign: "left", position: "relative", overflow: "hidden" }}>
        {/* 카드 상단 장식 */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent)" }} />
        <p style={{ fontSize: "14px", lineHeight: 2, color: "rgba(232,228,220,0.75)" }}>
          우리가 일상에서 무의식적으로 사용하는{" "}
          <span style={{ color: "#C8A96E", fontWeight: 600 }}>심리적 방어기제</span>의 패턴을 파악하기 위한 도구입니다.
        </p>
        <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontSize: "11px", color: "rgba(200,169,110,0.5)", letterSpacing: "1px", whiteSpace: "nowrap" }}>
            총 {total}문항 · 무작위 순서
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
        </div>
        <p style={{ marginTop: "16px", fontSize: "13px", lineHeight: 1.9, color: "rgba(232,228,220,0.55)" }}>
          정답은 없습니다. 떠오르는 대로 솔직하게 응답해 주세요.
        </p>
      </div>

      {/* 기본 정보 */}
      <div className="fi" style={{ animationDelay: "0.35s", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
        <p style={{ fontSize: "10px", color: "rgba(232,228,220,0.35)", marginBottom: "18px", letterSpacing: "2px", textTransform: "uppercase" }}>기본 정보 (선택)</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="이름"
            style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(200,169,110,0.2)", padding: "10px 0", fontSize: "14px", color: "#E8E4DC", fontFamily: "inherit", width: "100%" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <input value={age} onChange={e => setAge(e.target.value)} placeholder="나이" type="number"
              style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(200,169,110,0.2)", padding: "10px 0", fontSize: "14px", color: "#E8E4DC", fontFamily: "inherit", width: "100%" }} />
            <select value={gender} onChange={e => setGender(e.target.value)}
              style={{ background: "#0C0C12", border: "none", borderBottom: "1px solid rgba(200,169,110,0.2)", padding: "10px 0", fontSize: "14px", color: gender ? "#E8E4DC" : "rgba(232,228,220,0.3)", fontFamily: "inherit", width: "100%", cursor: "pointer" }}>
              <option value="" disabled>성별</option>
              <option value="남">남</option>
              <option value="여">여</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>
      </div>

      {/* 시작 버튼 */}
      <div className="fi" style={{ animationDelay: "0.6s" }}>
        <button onClick={onStart}
          style={{ width: "100%", background: "linear-gradient(135deg, rgba(200,169,110,0.12) 0%, rgba(200,169,110,0.06) 100%)", border: "1px solid rgba(200,169,110,0.6)", color: "#C8A96E", padding: "18px", fontSize: "13px", letterSpacing: "6px", cursor: "pointer", fontFamily: "'Pretendard', sans-serif", fontWeight: 500, borderRadius: "4px", transition: "all 0.25s", position: "relative", overflow: "hidden" }}
          onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(200,169,110,0.2) 0%, rgba(200,169,110,0.1) 100%)"; e.currentTarget.style.borderColor = "#C8A96E"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(200,169,110,0.12) 0%, rgba(200,169,110,0.06) 100%)"; e.currentTarget.style.borderColor = "rgba(200,169,110,0.6)"; }}
          onTouchStart={e => { e.currentTarget.style.background = "rgba(200,169,110,0.18)"; }}
          onTouchEnd={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(200,169,110,0.12) 0%, rgba(200,169,110,0.06) 100%)"; }}>
          검 사 시 작
        </button>
        <p style={{ marginTop: "16px", fontSize: "10px", color: "rgba(232,228,220,0.2)", letterSpacing: "0.5px" }}>
          모든 응답은 익명으로 처리되며 연구 목적으로만 활용됩니다
        </p>
      </div>

      {/* 저작권 고지 */}
      <div className="fi" style={{ animationDelay: "0.7s", marginTop: "8px", textAlign: "center" }}>
        <p style={{ fontSize: "10px", color: "rgba(200,169,110,0.3)", letterSpacing: "1px", lineHeight: 1.8 }}>
          본 설문지는{" "}
          <a href="https://stellalab.net/" target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(200,169,110,0.5)", textDecoration: "underline", textUnderlineOffset: "3px", textDecorationColor: "rgba(200,169,110,0.3)" }}>
            STELLA LAB
          </a>
          의 독자적 자산으로,<br />
          무단 복제·배포·상업적 이용을 금합니다.
        </p>
        <p style={{ marginTop: "6px", fontSize: "9px", color: "rgba(232,228,220,0.15)", letterSpacing: "2px" }}>
          © STELLA LAB · All Rights Reserved
        </p>
      </div>
    </div>
  );
}
