/* =====================================================================
   가사 센터 세부 분야 목록

   가사 센터의 배너가 이 목록을 씁니다.
   분야를 늘리거나 순서를 바꾸시려면 여기 한 곳만 고치면 됩니다.

   ⚠️ 첫 화면 전담센터 칸의 알약도 같은 분야를 보여줍니다.
      그쪽은 main.js 의 practices 에 있습니다. 분야를 늘리시면
      두 곳을 함께 고쳐 주십시오.
===================================================================== */

window.FAMILY_AREAS = [
  {
    no:   "01",
    name: "이혼",
    en:   "DIVORCE",
    href: "family-divorce.html",
    line: "헤어지기로 마음먹는 일과 정리하는 일은 다릅니다. 감정과 분리해 다룹니다."
  },
  {
    no:   "02",
    name: "재산분할",
    en:   "DIVISION OF PROPERTY",
    href: "family-property.html",
    line: "혼인 중에 함께 만든 것이면 나눕니다. 문제는 그것을 찾아내는 일입니다."
  },
  {
    no:   "03",
    name: "양육권",
    en:   "CHILD CUSTODY",
    href: "family-custody.html",
    line: "누가 더 억울한지가 아니라 아이에게 무엇이 나은지로 정합니다."
  },
  {
    no:   "04",
    name: "상속",
    en:   "INHERITANCE",
    href: "family-inheritance.html",
    line: "기한이 짧습니다. 빚이 있는 경우에는 놓치면 그대로 물려받습니다."
  }
];


/* -----------------------------------------------------------------
   배너를 그린다. 교통형사(traffic-list.js)와 같은 모양이다.

   #familyGrid — 센터 대문의 배너
   #familyMore — 세부 페이지 아래의 "다른 분야" (지금 보는 곳은 뺀다)
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

  const grid = document.getElementById("familyGrid");
  if (grid) grid.innerHTML = window.FAMILY_AREAS.map(tile).join("");

  const more = document.getElementById("familyMore");
  if (more) {
    more.innerHTML = window.FAMILY_AREAS
      .filter((a) => a.href !== here)
      .map(tile).join("");
  }
})();
