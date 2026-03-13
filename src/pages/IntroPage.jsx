export default function IntroPage({ name, setName, age, setAge, gender, setGender, total, onStart }) {
  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "52px 24px 64px", textAlign: "center" }}>
      {/* Logo area */}
      <div className="fi" style={{ animationDelay: "0s", marginBottom: "36px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "6px", color: "#C8A96E", marginBottom: "18px", fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif", fontStyle: "italic" }}>
          STELLA LAB · 스텔라랩
        </div>
        <svg width="44" height="44" viewBox="0 0 48 48" style={{ marginBottom: "18px" }}>
          <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(200,169,110,0.25)" strokeWidth="0.5" />
          <circle cx="24" cy="24" r="12" fill="none" stroke="rgba(200,169,110,0.45)" strokeWidth="0.5" />
          <g className="orb"><circle cx="24" cy="4" r="2" fill="#C8A96E" /></g>
          <circle cx="24" cy="24" r="3" fill="#C8A96E" />
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return <circle key={i} cx={24 + 20 * Math.sin(rad)} cy={24 - 20 * Math.cos(rad)} r="1" fill="rgba(200,169,110,0.45)" />;
          })}
        </svg>
        <h1 style={{ fontSize: "26px", fontWeight: "900", letterSpacing: "3px", lineHeight: 1.4, marginBottom: "6px", color: "#E8E4DC", fontFamily: "'SeoulNotice', sans-serif" }}>
          방어기제 검사
        </h1>
        <div style={{ fontSize: "12px", color: "rgba(200,169,110,0.75)", letterSpacing: "2px", fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif" }}>
          Defense Mechanism Questionnaire
        </div>
      </div>

      {/* Description */}
      <div className="fi" style={{ animationDelay: "0.25s", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(200,169,110,0.18)", borderRadius: "4px", padding: "24px 20px", marginBottom: "20px", textAlign: "left" }}>
        <p style={{ fontSize: "14px", lineHeight: 1.9, color: "rgba(232,228,220,0.78)" }}>
          우리가 일상에서 무의식적으로 사용하는{" "}
          <span style={{ color: "#C8A96E" }}>심리적 방어기제</span>의 패턴을 파악하기 위한 도구입니다.
        </p>
        <p style={{ marginTop: "12px", fontSize: "14px", lineHeight: 1.9, color: "rgba(232,228,220,0.78)" }}>
          총 <strong style={{ color: "#E8E4DC", fontWeight: 600 }}>{total}문항</strong>이 무작위 순서로 제시됩니다. 정답은 없으며 떠오르는 대로 솔직하게 응답해 주세요.
        </p>
      </div>

      {/* Info fields */}
      <div className="fi" style={{ animationDelay: "0.4s", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px", padding: "20px", marginBottom: "28px" }}>
        <p style={{ fontSize: "11px", color: "rgba(232,228,220,0.4)", marginBottom: "16px", letterSpacing: "1px" }}>기본 정보 (선택)</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="이름"
            style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(200,169,110,0.25)", padding: "10px 0", fontSize: "15px", color: "#E8E4DC", fontFamily: "inherit", width: "100%" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <input value={age} onChange={e => setAge(e.target.value)} placeholder="나이" type="number"
              style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(200,169,110,0.25)", padding: "10px 0", fontSize: "15px", color: "#E8E4DC", fontFamily: "inherit", width: "100%" }} />
            <select value={gender} onChange={e => setGender(e.target.value)}
              style={{ background: "#0C0C12", border: "none", borderBottom: "1px solid rgba(200,169,110,0.25)", padding: "10px 0", fontSize: "15px", color: gender ? "#E8E4DC" : "rgba(232,228,220,0.3)", fontFamily: "inherit", width: "100%", cursor: "pointer" }}>
              <option value="" disabled>성별</option>
              <option value="남">남</option>
              <option value="여">여</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>
      </div>

      {/* Start button */}
      <div className="fi" style={{ animationDelay: "0.55s" }}>
        <button onClick={onStart}
          style={{ width: "100%", background: "transparent", border: "1px solid #C8A96E", color: "#C8A96E", padding: "17px", fontSize: "14px", letterSpacing: "5px", cursor: "pointer", fontFamily: "inherit", borderRadius: "2px", transition: "background 0.2s" }}
          onTouchStart={e => { e.currentTarget.style.background = "rgba(200,169,110,0.1)"; }}
          onTouchEnd={e => { e.currentTarget.style.background = "transparent"; }}>
          검 사 시 작
        </button>
        <p style={{ marginTop: "14px", fontSize: "11px", color: "rgba(232,228,220,0.25)", letterSpacing: "0.5px" }}>
          모든 응답은 익명으로 처리되며 연구 목적으로만 활용됩니다
        </p>
      </div>
    </div>
  );
}
