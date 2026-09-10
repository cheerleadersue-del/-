/* =====================================================================
   민사 센터 세부 분야 목록

   민사 센터의 배너가 이 목록을 씁니다.
   분야를 늘리거나 순서를 바꾸시려면 여기 한 곳만 고치면 됩니다.

   ⚠️ 첫 화면 전담센터 칸의 알약도 같은 분야를 보여줍니다.
      그쪽은 main.js 의 practices 에 있습니다. 분야를 늘리시면
      두 곳을 함께 고쳐 주십시오.
===================================================================== */

window.CIVIL_AREAS = [
  {
    no:   "01",
    name: "의료사고 손해배상",
    en:   "MEDICAL MALPRACTICE",
    href: "civil-medical.html",
    line: "입증 책임이 환자 쪽에 있습니다. 그래서 기록을 모으는 일이 무엇보다 먼저입니다."
  },
  {
    no:   "02",
    name: "부동산",
    en:   "REAL ESTATE",
    href: "civil-realestate.html",
    line: "등기부에 적힌 것과 실제가 어긋나는 지점 — 다툼은 거의 언제나 거기서 시작됩니다."
  },
  {
    no:   "03",
    name: "대여금",
    en:   "MONEY LENT",
    href: "civil-loan.html",
    line: "차용증이 없어도 받을 수 있습니다. 다만 받아낼 수 있는지부터 계산합니다."
  },
  {
    no:   "04",
    name: "계약분쟁",
    en:   "CONTRACT DISPUTE",
    href: "civil-contract.html",
    line: "계약서에 적힌 것보다 적히지 않은 것이 문제되는 일이 더 많습니다."
  },
  {
    no:   "05",
    name: "전세사기",
    en:   "DEPOSIT FRAUD",
    href: "civil-jeonse.html",
    line: "그냥 이사부터 가시면 안 됩니다. 순서를 지키는 것만으로 결과가 달라집니다."
  },
  {
    no:   "06",
    name: "손해배상",
    en:   "DAMAGES",
    href: "civil-damages.html",
    line: "항목을 하나씩 더해서 만들어집니다. 하나라도 빠뜨리면 그만큼 못 받습니다."
  }
];


/* -----------------------------------------------------------------
   배너를 그린다. 교통형사(traffic-list.js)와 같은 모양이다.

   #civilGrid — 센터 대문의 배너
   #civilMore — 세부 페이지 아래의 "다른 분야" (지금 보는 곳은 뺀다)
------------------------------------------------------------------ */
(function () {
  const here = location.pathname.split("/").pop();

  function tile(a) {
    /* 바깥 사이트로 나가는 것은 새 탭에서 연다 */
    const out = /^https?:/i.test(a.href);
    return `<li class="tile">
        <a href="${a.href}"${out ? ` target="_blank" rel="noopener noreferrer"` : ""}>
          <span class="tile-no">${a.no}</span>
          <span class="tile-en">${a.en}</span>
          <strong class="tile-name">${a.name}${
            out ? `<span class="sr-only">(새 창)</span>` : ""
          }</strong>
          <span class="tile-line">${a.line}</span>
          <span class="tile-go" aria-hidden="true"></span>
        </a>
      </li>`;
  }

  const grid = document.getElementById("civilGrid");
  if (grid) grid.innerHTML = window.CIVIL_AREAS.map(tile).join("");

  const more = document.getElementById("civilMore");
  if (more) {
    more.innerHTML = window.CIVIL_AREAS
      .filter((a) => a.href !== here)
      .map(tile).join("");
  }
})();
