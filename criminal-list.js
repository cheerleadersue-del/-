/* =====================================================================
   형사 세부 분야 목록

   형사 센터의 배너가 이 목록을 씁니다.
   분야를 늘리거나 순서를 바꾸시려면 여기 한 곳만 고치면 됩니다.

   ⚠️ 첫 화면 전담센터 칸의 알약도 같은 여덟 분야를 보여줍니다.
      그쪽은 main.js 의 practices 에 있습니다. 분야를 늘리시면
      두 곳을 함께 고쳐 주십시오.
===================================================================== */

window.CRIMINAL_AREAS = [
  {
    no:   "01",
    name: "마약 사건",
    en:   "DRUG OFFENSE",
    href: "criminal-drug.html",
    line: "압수의 범위와 첫 진술이 이후 절차 전체를 좌우합니다. 조사 전에 정리해야 합니다."
  },
  {
    no:   "02",
    name: "도박 사건",
    en:   "GAMBLING OFFENSE",
    href: "criminal-gambling.html",
    line: "같은 기록이 이용으로도 운영으로도 읽힙니다. 그 갈림길을 먼저 정리합니다."
  },
  {
    no:   "03",
    name: "해외조직범죄",
    en:   "ORGANIZED CRIME",
    href: "criminal-organized.html",
    line: "조직의 크기가 곧 개인의 몫은 아닙니다. 어느 자리에 있었는지를 세웁니다."
  },
  {
    no:   "04",
    name: "금융범죄",
    en:   "FINANCIAL CRIME",
    href: "criminal-finance.html",
    line: "같은 돈거래가 계산 방식에 따라 다르게 읽힙니다. 실제로 오간 돈부터 다시 셉니다."
  },
  {
    no:   "05",
    name: "성범죄",
    en:   "SEXUAL OFFENSE",
    href: "criminal-sex.html",
    line: "형이 전부가 아닙니다. 신상정보 등록과 취업제한이 형보다 오래 남습니다."
  },
  {
    no:   "06",
    name: "코인 OTC · 범죄수익은닉",
    en:   "CRYPTO OTC",
    href: "criminal-crypto.html",
    line: "거래를 했다는 사실이 아니라 그때 무엇을 알았는지가 죄를 가릅니다."
  },
  {
    no:   "07",
    name: "성병감염",
    en:   "SEXUALLY TRANSMITTED INFECTION",
    href: "criminal-std.html",
    line: "검사 결과 한 줄로 끝나지 않습니다. 상대가 언제부터 알고 있었는지에서 갈립니다."
  },
  {
    no:   "08",
    name: "학교폭력 · 교권침해",
    en:   "SCHOOL VIOLENCE & TEACHER RIGHTS",
    href: "criminal-school.html",
    line: "조치 하나가 생활기록부에 남고 진학까지 따라갑니다. 기한이 짧습니다."
  }
];


/* -----------------------------------------------------------------
   배너를 그린다.

   #criminalGrid — 형사 센터 첫 화면의 여덟 칸
   #criminalMore — 세부 페이지 아래의 "다른 분야" (지금 보는 곳은 뺀다)

   교통형사(traffic-list.js)와 같은 모양으로 그린다.
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

  const grid = document.getElementById("criminalGrid");
  if (grid) grid.innerHTML = window.CRIMINAL_AREAS.map(tile).join("");

  const more = document.getElementById("criminalMore");
  if (more) {
    more.innerHTML = window.CRIMINAL_AREAS
      .filter((a) => a.href !== here)
      .map(tile).join("");
  }
})();
