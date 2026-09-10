/* =====================================================================
   회생 센터 세부 분야 목록

   회생 센터의 배너가 이 목록을 씁니다.
   분야를 늘리거나 순서를 바꾸시려면 여기 한 곳만 고치면 됩니다.

   ⚠️ 첫 화면 전담센터 칸의 알약도 같은 분야를 보여줍니다.
      그쪽은 main.js 의 practices 에 있습니다. 분야를 늘리시면
      두 곳을 함께 고쳐 주십시오.
===================================================================== */

window.REHAB_AREAS = [
  {
    no:   "01",
    name: "법인회생",
    en:   "CORPORATE REHABILITATION",
    href: "rehab-corporate.html",
    line: "회사를 살리면서 빚을 조정합니다. 남길 것이 있을 때 쓰는 제도입니다."
  },
  {
    no:   "02",
    name: "개인회생",
    en:   "PERSONAL REHABILITATION",
    href: "rehab-personal.html",
    line: "일을 계속하면서 갚을 수 있는 만큼만 갚고 나머지를 정리합니다."
  },
  {
    no:   "03",
    name: "파산",
    en:   "BANKRUPTCY",
    href: "rehab-bankruptcy.html",
    line: "끝내는 절차가 아니라 다시 시작하는 절차입니다. 면책이 막히는 사유가 있습니다."
  },
  {
    no:   "04",
    name: "복권 · 면책",
    en:   "DISCHARGE & RESTORATION",
    href: "rehab-discharge.html",
    line: "자격을 되찾고 남은 기록을 정리합니다. 면책 뒤에 할 일이 따로 있습니다."
  }
];


/* -----------------------------------------------------------------
   배너를 그린다. 교통형사(traffic-list.js)와 같은 모양이다.

   #rehabGrid — 센터 대문의 배너
   #rehabMore — 세부 페이지 아래의 "다른 분야" (지금 보는 곳은 뺀다)
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

  const grid = document.getElementById("rehabGrid");
  if (grid) grid.innerHTML = window.REHAB_AREAS.map(tile).join("");

  const more = document.getElementById("rehabMore");
  if (more) {
    more.innerHTML = window.REHAB_AREAS
      .filter((a) => a.href !== here)
      .map(tile).join("");
  }
})();
