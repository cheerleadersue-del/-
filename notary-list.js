/* =====================================================================
   공증 · 등기 센터 세부 분야 목록

   공증 · 등기 센터의 배너가 이 목록을 씁니다.
   분야를 늘리거나 순서를 바꾸시려면 여기 한 곳만 고치면 됩니다.

   ⚠️ 첫 화면 전담센터 칸의 알약도 같은 분야를 보여줍니다.
      그쪽은 main.js 의 practices 에 있습니다. 분야를 늘리시면
      두 곳을 함께 고쳐 주십시오.
===================================================================== */

window.NOTARY_AREAS = [
  {
    no:   "01",
    name: "공증",
    en:   "NOTARY",
    href: "notary-deed.html",
    line: "재판을 거치지 않고 바로 집행할 수 있는 문서입니다. 다투기 전에 만들어 둡니다."
  },
  {
    no:   "02",
    name: "법인 · 부동산 등기",
    en:   "CORPORATE & PROPERTY REGISTRATION",
    href: "https://moadg.com/",
    line: "설립 · 변경 · 소유권 이전. 등기 업무는 전문 사이트에서 이어서 보십니다."
  },
  {
    no:   "03",
    name: "계약검토",
    en:   "CONTRACT REVIEW",
    href: "notary-review.html",
    line: "다투게 된 뒤에 고칠 수 있는 문구는 없습니다. 서명 전에 한 번 봅니다."
  },
  {
    no:   "04",
    name: "내용증명",
    en:   "CERTIFIED MAIL",
    href: "notary-content.html",
    line: "그 자체에는 강제력이 없습니다. 그래도 보내야 하는 이유가 따로 있습니다."
  },
  {
    no:   "05",
    name: "임차권등기명령",
    en:   "LEASE REGISTRATION ORDER",
    href: "notary-lease.html",
    line: "집이든 가게든 비우고 나가도 순위를 지킵니다. 나가는 시점이 갈림길입니다."
  }
];


/* -----------------------------------------------------------------
   배너를 그린다. 교통형사(traffic-list.js)와 같은 모양이다.

   #notaryGrid — 센터 대문의 배너
   #notaryMore — 세부 페이지 아래의 "다른 분야" (지금 보는 곳은 뺀다)
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

  const grid = document.getElementById("notaryGrid");
  if (grid) grid.innerHTML = window.NOTARY_AREAS.map(tile).join("");

  const more = document.getElementById("notaryMore");
  if (more) {
    more.innerHTML = window.NOTARY_AREAS
      .filter((a) => a.href !== here)
      .map(tile).join("");
  }
})();
