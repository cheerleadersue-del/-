/* =====================================================================
   교통사고 세부 분야 목록

   배너와 "다른 교통사고 분야" 칸이 이 목록을 함께 씁니다.
   분야를 늘리거나 순서를 바꾸시려면 여기 한 곳만 고치면 됩니다.
===================================================================== */

window.TRAFFIC_AREAS = [
  {
    no:   "01",
    name: "형사합의 · 공탁",
    en:   "SETTLEMENT & COURT DEPOSIT",
    href: "traffic-settlement.html",
    line: "합의가 되면 사건의 결론이 달라집니다. 안 되면 공탁의 시점과 금액이 남습니다."
  },
  {
    no:   "02",
    name: "12대 중과실 · 교통사고처리특례법",
    en:   "TWELVE GRAVE NEGLIGENCES",
    href: "traffic-negligence.html",
    line: "보험에 들어 있어도 이 열두 가지에 걸리면 형사처벌을 피할 수 없습니다."
  },
  {
    no:   "03",
    name: "무보험 (책임보험)",
    en:   "UNINSURED DRIVING",
    href: "traffic-uninsured.html",
    line: "종합보험이 없으면 가벼운 부상도 형사처벌 대상이 됩니다. 초과 손해도 그대로 남습니다."
  },
  {
    no:   "04",
    name: "뺑소니 (도주치상 · 도주치사)",
    en:   "HIT AND RUN",
    href: "traffic-hitrun.html",
    line: "몰랐다는 말로는 부족합니다. 도주의 고의가 없었음을 자료로 세워야 합니다."
  },
  {
    no:   "05",
    name: "사망사고",
    en:   "FATAL TRAFFIC ACCIDENT",
    href: "traffic-fatal.html",
    line: "합의 여부로 실형과 집행유예가 갈립니다. 조문이 무엇인지가 그 앞에 있습니다."
  },
  {
    no:   "06",
    name: "중상해사고",
    en:   "SERIOUS INJURY",
    href: "traffic-serious.html",
    line: "12대 중과실이 아니라면 합의로 공소기각까지 갑니다. 누가 합의하느냐가 갈림길입니다."
  },
  {
    no:   "07",
    name: "스쿨존 (민식이법)",
    en:   "SCHOOL ZONE",
    href: "traffic-schoolzone.html",
    line: "세 가지 요건이 모두 갖춰져야 특가법이 적용됩니다. 하나라도 빠지면 달라집니다."
  },
  {
    no:   "08",
    name: "무면허운전",
    en:   "DRIVING WITHOUT A LICENSE",
    href: "traffic-unlicensed.html",
    line: "취소 통지 전이었는지, 면허 종별이 맞는지 — 무면허가 아닌 경우가 있습니다."
  },
  {
    no:   "09",
    name: "음주운전 (윤창호법)",
    en:   "DRIVING UNDER THE INFLUENCE",
    href: "traffic-dui.html",
    line: "수치와 절차를 먼저 봅니다. 측정이 적법했는지가 사건을 바꾸기도 합니다."
  },
  {
    no:   "10",
    name: "음주측정거부",
    en:   "REFUSAL OF BREATH TEST",
    href: "traffic-refusal.html",
    line: "거부로 인정되면 수치와 무관하게 무겁게 처벌됩니다. 요구가 적법했는지를 봅니다."
  },
  {
    no:   "11",
    name: "난폭운전 · 보복운전",
    en:   "RECKLESS & RETALIATORY DRIVING",
    href: "traffic-roadrage.html",
    line: "난폭은 도로교통법, 보복은 형법입니다. 어느 쪽이냐로 사건의 크기가 달라집니다."
  },
  {
    no:   "12",
    name: "보험사기",
    en:   "INSURANCE FRAUD",
    href: "traffic-fraud.html",
    line: "과장 청구와 사기의 경계에서 다툽니다. 이득액에 따라 형이 크게 달라집니다."
  }
];


/* -----------------------------------------------------------------
   배너를 그린다.

   #trafficGrid  — 교통사고 첫 화면의 12칸
   #trafficMore  — 세부 페이지 아래의 "다른 분야" (지금 보는 곳은 뺀다)
------------------------------------------------------------------ */
(function () {
  const here = location.pathname.split("/").pop();

  function tile(a) {
    return `<li class="tile">
        <a href="${a.href}">
          <span class="tile-no">${a.no}</span>
          <span class="tile-en">${a.en}</span>
          <strong class="tile-name">${a.name}</strong>
          <span class="tile-line">${a.line}</span>
          <span class="tile-go" aria-hidden="true"></span>
        </a>
      </li>`;
  }

  const grid = document.getElementById("trafficGrid");
  if (grid) grid.innerHTML = window.TRAFFIC_AREAS.map(tile).join("");

  const more = document.getElementById("trafficMore");
  if (more) {
    more.innerHTML = window.TRAFFIC_AREAS
      .filter((a) => a.href !== here)
      .map(tile).join("");
  }
})();
