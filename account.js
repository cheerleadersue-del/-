/* =====================================================================
   계좌 지급정지 랜딩페이지 — 남은 기간 계산기

   main.js 보다 먼저 불러옵니다.

   ⚠️ 이것은 「대략의 기준일」을 보여주는 것입니다.

      법이 못 박고 있는 것은 「최초 공고일부터 2개월」입니다
      (통신사기피해환급법 제9조). 그런데 실제로 며칠이 남았는지는
      초일을 세는지 아닌지, 공고일이 언제로 잡히는지에 따라
      하루 이틀이 달라집니다.

      그래서 화면에는 언제나 「정확한 날짜는 확인이 필요하다」를
      함께 적습니다. 그 문구를 지우지 마십시오.
      숫자만 보고 기다리시다 기간을 넘기는 일이 실제로 있습니다.

   ⚠️ 결과로 무엇을 약속하지 않습니다. 「풀어 드립니다」,
      「해제됩니다」 같은 말을 여기에 넣지 마십시오.
      변호사법 제23조 제2항은 업무수행 결과에 대하여 부당한 기대를
      가지도록 하는 광고를 금지하고 있습니다.
===================================================================== */

(function calculator() {

  const kind = document.getElementById("calcKind");
  const date = document.getElementById("calcDate");
  const go   = document.getElementById("calcGo");
  const out  = document.getElementById("calcOut");
  if (!kind || !date || !go || !out) return;

  /* 오늘 이후 날짜는 고를 수 없게 막아 둔다 */
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.max = iso(today);

  function iso(d) {
    const p = (n) => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  /*
    「2개월 뒤」는 60일 뒤가 아니라 달력으로 두 달 뒤입니다.
    3월 31일의 두 달 뒤는 5월 31일이고, 12월 31일의 두 달 뒤는
    2월 31일이 없으므로 2월의 마지막 날로 봅니다.
  */
  function plusTwoMonths(d) {
    const y = d.getFullYear();
    const m = d.getMonth() + 2;
    const day = d.getDate();
    const last = new Date(y, m + 1, 0).getDate();   /* 그 달의 마지막 날 */
    return new Date(y, m, Math.min(day, last));
  }

  const DAY = 24 * 60 * 60 * 1000;
  const days = (a, b) => Math.round((b - a) / DAY);

  function fmt(d) {
    return d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDate() + "일";
  }

  const CAVEAT =
    '<span class="lp-calc-caveat">초일을 세는지, 공고일이 언제로 잡히는지에 ' +
    '따라 하루 이틀이 달라집니다. <b>안내 문자를 가지고 연락 주시면 ' +
    '정확한 날짜를 확인해 드립니다.</b></span>';

  /*
    caveat 를 false 로 주면 꼬리말을 붙이지 않는다.
    날짜를 아직 안 고르셨을 때처럼, 계산한 것이 없는 자리에는
    「정확한 날짜를 확인해 드립니다」가 붙을 이유가 없다.
  */
  function show(html, tone, caveat) {
    out.innerHTML = html + (caveat === false ? "" : CAVEAT);
    out.className = "lp-calc-out is-" + tone;
    out.hidden = false;
    out.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  go.addEventListener("click", () => {
    if (!date.value) {
      show('<b class="lp-calc-head">날짜를 골라 주십시오.</b>' +
           '<span>은행에서 받으신 안내 문자에 적혀 있습니다.</span>', "wait", false);
      return;
    }

    const picked = new Date(date.value + "T00:00:00");
    if (isNaN(picked)) return;

    if (picked > today) {
      show('<b class="lp-calc-head">오늘 이후 날짜는 넣을 수 없습니다.</b>' +
           '<span>이미 지난 날짜를 골라 주십시오.</span>', "wait", false);
      return;
    }

    /* ── 계좌가 막힌 날만 아시는 경우 ─────────────────────────── */
    if (kind.value === "freeze") {
      const n = days(picked, today);
      show(
        '<b class="lp-calc-head">계좌가 막히신 지 ' + n + '일째입니다.</b>' +
        '<span>남은 기간은 <b>채권소멸절차 개시 공고가 나갔는지</b>에 ' +
        '따라 정해집니다. 공고일부터 2개월이 지나면 그 금액에 대한 ' +
        '예금 채권이 소멸합니다. <b>공고가 나갔는지부터 확인해야 ' +
        '합니다.</b></span>',
        "wait");
      return;
    }

    /* ── 공고일을 아시는 경우 ─────────────────────────────────── */
    const due = plusTwoMonths(picked);
    const left = days(today, due);

    if (left < 0) {
      show(
        '<b class="lp-calc-head">기준일이 ' + (-left) + '일 지났습니다.</b>' +
        '<span>공고일부터 2개월의 기준일은 <b>' + fmt(due) + '</b>입니다. ' +
        '기간이 지났더라도 <b>그것으로 끝은 아닙니다.</b> ' +
        '환급이 이미 이루어졌는지, 다툴 수 있는 부분이 남았는지를 ' +
        '먼저 보아야 합니다.</span>',
        "over");
      return;
    }

    const head = left === 0
      ? '<b class="lp-calc-head">오늘이 기준일입니다.</b>'
      : '<b class="lp-calc-head">남은 기간 <em>D-' + left + '</em></b>';

    if (left <= 14) {
      show(head +
        '<span>공고일부터 2개월의 기준일은 <b>' + fmt(due) + '</b>입니다. ' +
        '소를 내는 것만으로는 절차가 멈추지 않고, ' +
        '<b>소송계속증명원을 받아 은행에 내야</b> 합니다. ' +
        '송달과 서류 발급에 걸리는 날을 계산하면 ' +
        '<b>지금 움직이셔야 하는 기간입니다.</b></span>',
        "urgent");
    } else {
      show(head +
        '<span>공고일부터 2개월의 기준일은 <b>' + fmt(due) + '</b>입니다. ' +
        '소 제기부터 <b>소송계속증명원 제출</b>까지 ' +
        '일정을 잡을 수 있는 기간입니다. ' +
        '받은 원인을 보여주는 자료부터 모아 두십시오.</span>',
        "ok");
    }
  });

  /* 날짜를 고치면 앞의 결과를 지운다 — 옛 숫자가 남아 있으면 안 된다 */
  [kind, date].forEach((el) => el.addEventListener("change", () => {
    out.hidden = true;
  }));

  /* 날짜 칸에서 엔터를 치면 바로 계산한다 */
  date.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); go.click(); }
  });

})();
