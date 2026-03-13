import { LIKERT, PAGE_SIZE } from "../data/scales";

export default function SurveyPage({ pages, currentPage, setCurrentPage, answers, setAnswer, totalAnswered, total, onFinish }) {
  const totalPages = pages.length;
  const pageItems = pages[currentPage] || [];
  const answeredOnPage = pageItems.filter(i => answers[i.id] !== undefined).length;
  const canProceed = answeredOnPage === pageItems.length;
  const isLast = currentPage === totalPages - 1;
  const progress = Math.round((totalAnswered / total) * 100);

  return (
    <div>
      {/* Sticky top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "#0C0C12", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "10px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "10px", color: "#C8A96E", letterSpacing: "3px", whiteSpace: "nowrap" }}>스텔라랩</span>
        <div style={{ flex: 1, height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "1px" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#C8A96E,#A07BBF)", transition: "width 0.4s ease", borderRadius: "1px" }} />
        </div>
        <span style={{ fontSize: "10px", color: "rgba(232,228,220,0.35)", whiteSpace: "nowrap" }}>{totalAnswered}/{total}</span>
      </div>

      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "28px 16px 100px" }}>
        {/* Page indicator */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "4px", color: "rgba(200,169,110,0.45)", marginBottom: "6px" }}>
            {currentPage + 1} / {totalPages}
          </div>
          <p style={{ fontSize: "12px", color: "rgba(232,228,220,0.3)" }}>
            평소 나의 모습과 얼마나 일치하는지 응답해 주세요.
          </p>
        </div>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {pageItems.map((item, idx) => {
            const sel = answers[item.id];
            return (
              <div key={item.id} className="icard" style={{ background: sel ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.02)", border: `1px solid ${sel ? "rgba(200,169,110,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: "6px", padding: "16px 16px 14px", transition: "border-color 0.2s, background 0.2s" }}>
                <p style={{ fontSize: "14px", lineHeight: 1.8, color: "rgba(232,228,220,0.88)", marginBottom: "14px", fontFamily: "'SeoulNotice', sans-serif", fontWeight: "800" }}>
                  <span style={{ color: "rgba(200,169,110,0.35)", fontSize: "10px", marginRight: "6px", fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif" }}>
                    {currentPage * PAGE_SIZE + idx + 1}.
                  </span>
                  {item.text}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "6px" }}>
                  {LIKERT.map(l => {
                    const isSelected = sel === l.value;
                    return (
                      <button key={l.value} className="lbtn"
                        onClick={() => setAnswer(item.id, l.value)}
                        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", background: "transparent", border: "none", cursor: "pointer", padding: "4px 0" }}>
                        <div style={{
                          width: "38px", height: "38px", borderRadius: "50%",
                          border: `1.5px solid ${isSelected ? "#C8A96E" : "rgba(255,255,255,0.15)"}`,
                          background: isSelected ? "rgba(200,169,110,0.18)" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.15s",
                        }}>
                          {isSelected && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#C8A96E" }} />}
                        </div>
                        <span style={{ fontSize: "9px", color: isSelected ? "rgba(200,169,110,0.8)" : "rgba(232,228,220,0.28)", whiteSpace: "pre-wrap", textAlign: "center", lineHeight: 1.3, letterSpacing: "0px" }}>
                          {l.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {!canProceed && (
            <p style={{ textAlign: "center", fontSize: "12px", color: "rgba(232,228,220,0.3)" }}>
              {pageItems.length - answeredOnPage}개 문항을 더 응답해 주세요
            </p>
          )}
          <button
            onClick={() => {
              if (!canProceed) return;
              if (isLast) onFinish();
              else { setCurrentPage(p => p + 1); window.scrollTo(0, 0); }
            }}
            style={{ width: "100%", padding: "17px", background: "transparent", border: `1px solid ${canProceed ? "#C8A96E" : "rgba(255,255,255,0.08)"}`, color: canProceed ? "#C8A96E" : "rgba(232,228,220,0.2)", fontSize: "14px", letterSpacing: "4px", cursor: canProceed ? "pointer" : "not-allowed", fontFamily: "inherit", borderRadius: "2px", transition: "all 0.2s" }}>
            {isLast ? "결과 보기" : "다 음"}
          </button>
          {currentPage > 0 && (
            <button onClick={() => { setCurrentPage(p => p - 1); window.scrollTo(0, 0); }}
              style={{ width: "100%", padding: "14px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(232,228,220,0.35)", fontSize: "13px", letterSpacing: "2px", cursor: "pointer", fontFamily: "inherit", borderRadius: "2px" }}>
              이전
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
