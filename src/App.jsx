import { useState, useMemo } from "react";
import { SCALES, PAGE_SIZE } from "./data/scales";
import { shuffle } from "./utils/shuffle";
import IntroPage from "./pages/IntroPage";
import SurveyPage from "./pages/SurveyPage";
import ResultPage from "./pages/ResultPage";
import AdminPage from "./pages/AdminPage";
import PasswordGate from "./components/PasswordGate";

const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-text-size-adjust: 100%; }
  body { overscroll-behavior-y: contain; }
  ::selection { background: rgba(200,169,110,0.3); }
  input, select, button { -webkit-tap-highlight-color: transparent; outline: none; }
  input::placeholder { color: rgba(232,228,220,0.3); }
  button { touch-action: manipulation; }
  .fi { animation: fi 1s ease forwards; opacity: 0; }
  @keyframes fi { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  .orb { animation: orb 20s linear infinite; transform-origin: center; }
  @keyframes orb { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
  .icard { transition: background 0.15s; }
  .icard:active { background: rgba(255,255,255,0.03); }
  .lbtn { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .rc { animation: su 0.5s ease forwards; opacity: 0; }
  @keyframes su { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
`;

const base = {
  minHeight: "100dvh",
  background: "#0C0C12",
  color: "#E8E4DC",
  fontFamily: "'Noto Serif KR', Georgia, serif",
  WebkitFontSmoothing: "antialiased",
};

// #admin 해시로 접근 시 관리자 페이지 표시
const isAdminRoute = window.location.hash === "#admin";

export default function App() {
  const [answers, setAnswers] = useState({});
  const [page, setPage] = useState("intro");
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const allItems = useMemo(() => {
    const flat = [];
    for (const sk of Object.keys(SCALES)) {
      for (const m of SCALES[sk].mechanisms) {
        for (const item of m.items) {
          flat.push({ ...item, mechId: m.id, scaleKey: sk });
        }
      }
    }
    return shuffle(flat);
  }, []);

  const pages = [];
  for (let i = 0; i < allItems.length; i += PAGE_SIZE) pages.push(allItems.slice(i, i + PAGE_SIZE));

  function setAnswer(id, val) {
    setAnswers(prev => ({ ...prev, [id]: val }));
  }

  function handleRetry() {
    setAnswers({});
    setCurrentPage(0);
    setPage("intro");
  }

  if (isAdminRoute) {
    return <AdminPage />;
  }

  return (
    <PasswordGate>
      <div style={base}>
        <style>{globalCss}</style>
        {page === "intro" && (
          <IntroPage
            name={name} setName={setName}
            age={age} setAge={setAge}
            gender={gender} setGender={setGender}
            total={allItems.length}
            onStart={() => setPage("survey")}
          />
        )}
        {page === "survey" && (
          <SurveyPage
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            answers={answers}
            setAnswer={setAnswer}
            totalAnswered={Object.keys(answers).length}
            total={allItems.length}
            onFinish={() => setPage("result")}
          />
        )}
        {page === "result" && (
          <ResultPage
            answers={answers}
            name={name} age={age} gender={gender}
            onRetry={handleRetry}
          />
        )}
      </div>
    </PasswordGate>
  );
}
