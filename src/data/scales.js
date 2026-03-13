export const SCALES = {
  mature: {
    label: "성숙형", color: "#C8A96E", bg: "rgba(200,169,110,0.08)",
    mechanisms: [
      { id: "sublimation", name: "승화", items: [
        { id: "s1", text: "힘든 감정이 생기면 글쓰기, 그림, 운동 등 창의적 활동으로 표현한다." },
        { id: "s2", text: "부정적인 에너지를 사회적으로 의미 있는 방향으로 전환하곤 한다." },
        { id: "s3", text: "갈등이나 불안을 느낄 때 생산적인 일에 몰입하면 마음이 편해진다." },
      ]},
      { id: "humor", name: "유머", items: [
        { id: "h1", text: "불편한 상황에서도 유머로 분위기를 전환할 수 있다." },
        { id: "h2", text: "나 자신의 실수나 약점을 웃음으로 넘길 수 있다." },
        { id: "h3", text: "어려운 현실을 유머로 표현하면 덜 힘들게 느껴진다." },
      ]},
      { id: "suppression", name: "억제", items: [
        { id: "su1", text: "지금 해결할 수 없는 걱정은 나중으로 미루고 현재에 집중한다." },
        { id: "su2", text: "불쾌한 감정이 있어도 적절한 때까지 참고 기다릴 수 있다." },
        { id: "su3", text: "힘든 일이 있어도 지금은 감정을 잠시 미루고 당장의 일에 집중한다." },
      ]},
      { id: "altruism", name: "이타주의", items: [
        { id: "a1", text: "내가 힘들 때 다른 사람을 도우면 마음이 오히려 가벼워진다." },
        { id: "a2", text: "어려움을 겪을 때 봉사나 나눔 활동이 나를 위로해준다." },
      ]},
      { id: "anticipation", name: "예견", items: [
        { id: "an1", text: "어려운 일이 생길 것 같으면 미리 대비책을 세워둔다." },
        { id: "an2", text: "불편한 상황을 미리 떠올리며 어떻게 대처할지 생각해둔다." },
      ]},
    ],
  },
  neurotic: {
    label: "신경증형", color: "#7E9EBF", bg: "rgba(126,158,191,0.08)",
    mechanisms: [
      { id: "rationalization", name: "합리화", items: [
        { id: "r1", text: "일이 잘못되면 그럴 수밖에 없었던 이유를 자연스럽게 찾게 된다." },
        { id: "r2", text: "내가 한 행동에는 사실 충분한 이유가 있다고 생각하는 편이다." },
        { id: "r3", text: "원하는 것을 얻지 못하면 '사실 별로 중요하지 않다'고 생각한다." },
      ]},
      { id: "intellectualization", name: "지성화", items: [
        { id: "i1", text: "감정적으로 힘든 일도 논리적·분석적으로 생각하면 덜 힘들다." },
        { id: "i2", text: "감정보다 사실과 정보를 분석하는 방식으로 문제를 다룬다." },
        { id: "i3", text: "개인적인 문제도 마치 남의 일처럼 객관적으로 바라보려 한다." },
      ]},
      { id: "reaction_formation", name: "반동형성", items: [
        { id: "rf1", text: "싫어하는 사람에게 오히려 더 친절하게 대하곤 한다." },
        { id: "rf2", text: "강한 부정적 감정이 들면 반대로 행동하려고 노력한다." },
        { id: "rf3", text: "불편한 감정을 느낄 때 정반대의 감정인 것처럼 행동할 때가 있다." },
      ]},
      { id: "repression", name: "억압", items: [
        { id: "re1", text: "불쾌했던 일들을 나중에 생각하려 해도 잘 기억나지 않는다." },
        { id: "re2", text: "과거의 힘든 기억이 어느 순간 자연스럽게 떠오르지 않게 된다." },
      ]},
      { id: "isolation", name: "격리", items: [
        { id: "is1", text: "힘든 일을 생각할 때 감정보다는 사실만 떠오를 때가 있다." },
        { id: "is2", text: "나쁜 일을 당해도 별로 감정이 느껴지지 않는 때가 있다." },
      ]},
    ],
  },
  immature: {
    label: "미성숙형", color: "#A07BBF", bg: "rgba(160,123,191,0.08)",
    mechanisms: [
      { id: "projection", name: "투사", items: [
        { id: "p1", text: "내가 화가 나 있을 때 상대방도 나에게 화가 난 것 같다고 느낀다." },
        { id: "p2", text: "다른 사람들이 나를 비판하거나 탓하려 한다는 느낌이 자주 든다." },
        { id: "p3", text: "내가 느끼는 감정을 상대방도 똑같이 느끼고 있다고 생각하는 편이다." },
      ]},
      { id: "passive_aggression", name: "수동적 공격", items: [
        { id: "pa1", text: "화가 나도 직접 말하기보다는 소극적이거나 비협조적인 행동으로 표현하는 편이다." },
        { id: "pa2", text: "불만이 있을 때 말로 하지 않고 늑장을 부리거나 잊어버리곤 한다." },
        { id: "pa3", text: "부탁을 거절하기 어려울 때 겉으로는 수락하지만 일을 소극적으로 하는 편이다." },
      ]},
      { id: "acting_out", name: "행동화", items: [
        { id: "ao1", text: "감정이 격해지면 충동적으로 행동하고 나중에 후회한다." },
        { id: "ao2", text: "스트레스를 받으면 음주, 쇼핑, 게임 등으로 즉각적으로 해소하려 한다." },
      ]},
      { id: "denial", name: "부정", items: [
        { id: "d1", text: "나쁜 소식을 들어도 실감이 나지 않아 실제가 아닌 것처럼 느껴진다." },
        { id: "d2", text: "문제가 있다고 느껴도 '괜찮아질 것'이라며 그냥 넘어간다." },
        { id: "d3", text: "힘든 현실을 인정하기보다 없는 것처럼 생각하려 한다." },
      ]},
      { id: "regression", name: "퇴행", items: [
        { id: "rg1", text: "매우 힘들거나 스트레스를 받으면 아이처럼 행동하게 된다." },
        { id: "rg2", text: "위기 상황이 되면 평소보다 더 의존적이 되거나 어린아이처럼 반응하는 편이다." },
      ]},
      { id: "somatization", name: "신체화", items: [
        { id: "so1", text: "스트레스나 갈등이 생기면 두통, 복통 등 신체 증상이 나타난다." },
        { id: "so2", text: "정서적으로 힘들 때 신체 증상으로 표현될 때가 많다." },
      ]},
      { id: "fantasy", name: "공상", items: [
        { id: "f1", text: "현실이 힘들 때 상상 속 세계로 도피하곤 한다." },
        { id: "f2", text: "이상적인 상황을 자주 상상하며 위안을 얻는다." },
      ]},
      { id: "splitting", name: "분열", items: [
        { id: "sp1", text: "사람이나 상황을 완전히 좋거나 완전히 나쁘다고 생각하는 경향이 있다." },
      ]},
    ],
  },
};

export const LIKERT = [
  { value: 1, label: "전혀\n아니다" },
  { value: 2, label: "아니다" },
  { value: 3, label: "보통" },
  { value: 4, label: "그렇다" },
  { value: 5, label: "매우\n그렇다" },
];

export const PAGE_SIZE = 7;
